import React, {createContext, Dispatch, useReducer, useContext, useEffect} from 'react';
import {IContact} from '~/typings/db';
import useLocalStorage from '~/common/hook/useLocalStorage';

export type ContactsState = {contacts: IContact[]; isOnlyFavorites: boolean};

const ContactsStateContext = createContext<ContactsState | undefined>(undefined);

type Action =
  | {type: 'INIT'; contacts: IContact[]; isOnlyFavorites: boolean}
  | {type: 'CREATE'; contact: IContact}
  | {type: 'UPDATE'; contact: IContact}
  | {type: 'DELETE'; id: string}
  | {type: 'TOGGLE_FAVORITE'; id: string}
  | {type: 'TOGGLE_IS_ONLY_FAVORITES'};

type ContactsDispatch = Dispatch<Action>;
const ContactsDispatchContext = createContext<ContactsDispatch | undefined>(undefined);

function contactsReducer(state: ContactsState, action: Action): ContactsState {
  switch (action.type) {
    case 'INIT':
      return {contacts: action.contacts, isOnlyFavorites: action.isOnlyFavorites};
    case 'CREATE':
      return {...state, contacts: state.contacts.concat(action.contact)};
    case 'UPDATE':
      const foundIndex = state.contacts.findIndex(contact => contact.id === action.contact.id);
      if (foundIndex === -1) {
        return state;
      }
      return {
        ...state,
        contacts: state.contacts
          .slice(0, foundIndex)
          .concat({
            id: state.contacts[foundIndex].id,
            name: action.contact.name,
            email: action.contact.email,
            phone: action.contact.phone,
            isFavorite: state.contacts[foundIndex].isFavorite,
          })
          .concat(state.contacts.slice(foundIndex + 1)),
      };
    case 'DELETE':
      return {...state, contacts: state.contacts.filter(contact => contact.id !== action.id)};
    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.id ? {...contact, isFavorite: !contact.isFavorite} : contact,
        ),
      };
    case 'TOGGLE_IS_ONLY_FAVORITES':
      return {
        ...state,
        isOnlyFavorites: !state.isOnlyFavorites,
      };
    default:
      throw new Error('Unhandled action');
  }
}

export function ContactsContextProvider({children}: {children: React.ReactNode}) {
  const [contactsState, dispatch] = useReducer(contactsReducer, {
    contacts: [],
    isOnlyFavorites: false,
  });
  const [storedValue, setValue] = useLocalStorage('contactsforcontextapi', contactsState);

  useEffect(() => {
    dispatch({
      type: 'INIT',
      contacts: storedValue?.contacts ?? [],
      isOnlyFavorites: storedValue?.isOnlyFavorites ?? false,
    });
  }, []);

  useEffect(() => {
    setValue(contactsState);
  }, [contactsState, setValue]);

  return (
    <ContactsDispatchContext.Provider value={dispatch}>
      <ContactsStateContext.Provider value={contactsState}>
        {children}
      </ContactsStateContext.Provider>
    </ContactsDispatchContext.Provider>
  );
}

export function useContactsState() {
  const state = useContext(ContactsStateContext);
  if (!state) throw new Error('ContactsProvider not found');
  return state;
}

export function useContactsDispatch() {
  const dispatch = useContext(ContactsDispatchContext);
  if (!dispatch) throw new Error('ContactsProvider not found');
  return dispatch;
}

export function selectIsOnlyFavorites(contactsState: ContactsState | undefined) {
  if (!contactsState) return false;
  return contactsState.isOnlyFavorites;
}

export function selectAllOrFavorites(contactsState: ContactsState | undefined) {
  if (!contactsState) return [];
  if (contactsState.isOnlyFavorites) {
    return contactsState.contacts.filter(contact => contact.isFavorite);
  } else {
    return contactsState.contacts;
  }
}

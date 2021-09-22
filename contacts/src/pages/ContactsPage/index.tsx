import React from 'react';
import {ContactsContextProvider} from '~/common/context/ContactsContext';
import ContactsPageApp from '~/pages/ContactsPage/ContactsPageApp';
import {RouteComponentProps} from 'react-router-dom';

type Props = RouteComponentProps;
function ContactsPage(props: Props) {
  return (
    <ContactsContextProvider>
      <ContactsPageApp {...props} />
    </ContactsContextProvider>
  );
}

export default React.memo(ContactsPage);

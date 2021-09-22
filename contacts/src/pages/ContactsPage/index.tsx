import React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import styles from '~/pages/ContactsPage/ContactsPage.module.scss';

type Props = RouteComponentProps;
function ContactsPage({}: Props) {
  return <div className={styles.pageWrap}>ContactsPage</div>;
}

export default React.memo(ContactsPage);

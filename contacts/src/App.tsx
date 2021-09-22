import React from 'react';
import '~/App.scss';
import {Redirect, Route, Switch} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import {theme} from '~/common/theme';
import Header from '~/common/component/Header';
import Footer from '~/common/component/Footer';
import ContactsPage from '~/pages/ContactsPage';
import PreviewComponentsPage from '~/pages/PreviewComponentsPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Switch>
        <Route path="/ContactsPage" component={ContactsPage} />
        <Route path="/PreviewComponentsPage" component={PreviewComponentsPage} />
        <Redirect to="/ContactsPage" />
      </Switch>
      <Footer />
    </ThemeProvider>
  );
}

export default App;

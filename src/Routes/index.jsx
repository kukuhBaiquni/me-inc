import React from 'react';
import { Redirect } from 'react-router-dom';
import Authorization from '../../Helpers/Authorization';

import Header from '../Common/Header';
import Footer from '../Common/Footer';

/**
 * If we have a logged-in user, redirect to the home page. Otherwise, display the component.
 */
const Routes = ({
  component: Component,
  private: isPrivate,
  path,
  ...rest
}) => {
  const isLoggedIn = Authorization.isLoggedIn();
  try {
    if (isPrivate) {
      return (
        <>
          {isLoggedIn ? (
            <>
              {isLoggedIn ? <Header /> : null}
              <Component path={'/'} {...rest} />
              {isLoggedIn ? <Footer /> : null}
            </>
          ) : (
            <>
              {isLoggedIn ? <Header /> : null}
              <Redirect to={'/'} noThrow {...rest} />
              {isLoggedIn ? <Footer /> : null}
            </>
          )}
        </>
      );
    } else {
      return (
        <>
          {isLoggedIn ? (
            <>
              {isLoggedIn ? <Header /> : null}
              <Redirect to={'/'} noThrow {...rest} />
              {isLoggedIn ? <Footer /> : null}
            </>
          ) : (
            <>
              {isLoggedIn ? <Header /> : null}
              <Component path={path} {...rest} />
              {isLoggedIn ? <Footer /> : null}
            </>
          )}
        </>
      );
    }
  } catch (error) {
    console.log('Error', error);
  }
};

export default Routes;

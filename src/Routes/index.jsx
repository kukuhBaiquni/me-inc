import React from 'react';
import { Redirect } from 'react-router-dom';
import Authorization from '../helpers/Authorization';

import Header from '../components/layout/Header';

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
            </>
          ) : (
            <>
              {isLoggedIn ? <Header /> : null}
              <Redirect to={'/'} noThrow {...rest} />
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
            </>
          ) : (
            <>
              {isLoggedIn ? <Header /> : null}
              <Component path={path} {...rest} />
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

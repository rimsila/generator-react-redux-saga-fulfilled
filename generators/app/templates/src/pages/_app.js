import App, { Container } from 'next/app';

import { CustomErrorBoundary } from 'components';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
// pages/_app.js
import React from 'react';
import { configureStore } from '@/redux-store/createStore';

const { store, persistor } = configureStore();

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <CustomErrorBoundary>
              <Component {...pageProps} />
            </CustomErrorBoundary>
          </PersistGate>
        </Provider>
      </Container>
    );
  }
}

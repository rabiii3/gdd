import React from 'react';
import '@babel/polyfill';
import { path } from 'ramda';
import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import frLocaleData from 'react-intl/locale-data/fr';
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import { pdfjs } from 'react-pdf';
import ReactDOM from 'react-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { StylesProvider, createGenerateClassName, jssPreset } from '@material-ui/styles';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import DateFnsUtils from '@date-io/date-fns';
import { create } from 'jss';
import { RoutesContextProvider } from './components/RoutesContext';
import LanguageProvider from './components/LanguageProvider';
import ErrorBoundary from './components/ErrorBoundary';
import routes from './routes';
import { COUNTRIES } from './countries';
import appTheme from './theme';
import createApp from './appFactory';
// import * as serviceWorker from './serviceWorker';

DateFnsUtils.prototype.getStartOfMonth = DateFnsUtils.prototype.startOfMonth;
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

addLocaleData(enLocaleData);
addLocaleData(frLocaleData);

// const parentContext = () => {
//   const queryParams = new URLSearchParams(window.location.search.slice(1));
//   const PARENT_PARAM = '_p';
//   if(queryParams.has(PARENT_PARAM)){
//     try {
//       return { ...JSON.parse(atob(queryParams.get(PARENT_PARAM))) };
//     } catch(e) {
//       console.error(e); // eslint-disable-line no-console
//       return {};
//     }
//   }
//   return { mode: MODE.APP };
// }

const initialState = {
  language: { locale: window.CONFIG.locale },
  config: {
    ...window.CONFIG,
    // ...parentContext(),
    allowcountries: COUNTRIES,
    country: 'FR',
  },
};

const { config: { mode } } = initialState;

const firebaseConfig = { messagingSenderId: path(['config', 'firebase', 'messagingSenderId'], initialState) };
firebase.initializeApp(firebaseConfig);

const theme = createMuiTheme(appTheme);
const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  insertionPoint: 'jss-insertion-point',
});

const { configureStore, App, launchApp } = createApp(mode);

const history = createBrowserHistory();
const store = configureStore(initialState, history);

const ROOT = (
  <StylesProvider jss={jss} generateClassName={generateClassName}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <RoutesContextProvider value={routes}>
        <Provider store={store}>
          <LanguageProvider messages={window.I18N}>
            <MuiThemeProvider theme={theme}>
              <CssBaseline />
              <ConnectedRouter history={history}>
                <ErrorBoundary>
                  <App />
                </ErrorBoundary>
              </ConnectedRouter>
            </MuiThemeProvider>
          </LanguageProvider>
        </Provider>
      </RoutesContextProvider>
    </MuiPickersUtilsProvider>
  </StylesProvider>
);

const render = () => {
  ReactDOM.render(ROOT, document.getElementById('root'), () => {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  });
};

// serviceWorker.unregister();

launchApp(render, store ).then(() => { 
  console.log(`Koopt app mounted in ${mode} mode.`); // eslint-disable-line no-console
});


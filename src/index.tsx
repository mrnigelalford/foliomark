import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Tezos } from './State/Tezos';

// let grapqhlEndpoint = 'https://us-central1-foliomark.cloudfunctions.net/web';
let grapqhlEndpoint = 'http://localhost:4000/';
const { getLocalStorage } = Tezos();

// if (
//   process.env.REACT_APP_ENV === 'develop' &&
//   process.env.REACT_APP_LOCAL_GRAPHQL
// ) {
//   grapqhlEndpoint = process.env.REACT_APP_LOCAL_GRAPHQL;
// }

const client = new ApolloClient({
  uri: grapqhlEndpoint,
  cache: new InMemoryCache(),
});

getLocalStorage();

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop />
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

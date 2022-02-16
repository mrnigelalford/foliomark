import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

let grapqhlEndpoint = 'https://us-central1-foliomark.cloudfunctions.net/web';

if (process.env.NODE_ENV !== 'production') {
  grapqhlEndpoint = 'http://localhost:4000';
}

const client = new ApolloClient({
  uri: grapqhlEndpoint,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop />
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

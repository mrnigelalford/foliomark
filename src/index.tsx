import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

let grapqhlEndpoint = process.env.REACT_APP_PROD_GRAPHQL;

if (process.env.REACT_APP_ENV === 'develop') {
  grapqhlEndpoint = process.env.REACT_APP_LOCAL_GRAPHQL;
}

console.log('grapqhlEndpoint', grapqhlEndpoint);

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

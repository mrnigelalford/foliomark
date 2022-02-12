import { Route, Routes } from 'react-router-dom';
import './App.css';
import routes from './pages/index';
// add the scrollTo fix for react-router

const App = () => {
  return (
    <Routes>
      {routes.map((data, index) => (
        <Route path={data.path} element={data.component} key={index} />
      ))}
    </Routes>
  );
};

export default App;

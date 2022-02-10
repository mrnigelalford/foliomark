import { Route, Routes } from 'react-router-dom';
import './App.css';
import ExplorePage from './pages/Explore';
import LiveAuctions from './pages/LiveAuctions';
import ItemDetailsPage from './pages/ItemDetails';
import ActivityPage from './pages/Activity';
import BlogDetails from './pages/BlogDetails';
import HelpCenter from './pages/HelpCenter';
import AuthorsPage from './pages/Authors';
import CreateItem from './pages/CreateItem';
import EditProfile from './pages/EditProfile';
import Ranking from './pages/Ranking';
import NoResult from './pages/NoResult';
import FAQ from './pages/FAQ';
import ContactPage from './pages/Contact';
import Home from './pages/Home';

require('dotenv').config();

const App = () => {
  return (
    <Routes>
      <Route path="/" element={Home} />
      <Route path="/explore" element={ExplorePage} />
      <Route path="/live-auctions" element={LiveAuctions} />
      <Route path="/item-details" element={ItemDetailsPage} />
      <Route path="/activity" element={ActivityPage} />
      <Route path="/blog-details" element={BlogDetails} />
      <Route path="/help-center" element={HelpCenter} />
      <Route path="/authors" element={AuthorsPage} />
      <Route path="/create-item" element={CreateItem} />
      <Route path="/edit-profile" element={EditProfile} />
      <Route path="/ranking" element={Ranking} />
      <Route path="/no-result" element={NoResult} />
      <Route path="/faq" element={FAQ} />
      <Route path="/contact" element={ContactPage} />
    </Routes>
  );
};

export default App;

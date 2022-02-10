import Home from './Home';
import ExplorePage from './Explore';
import LiveAuctions from './LiveAuctions';
import ItemDetailsPage from './ItemDetails';
import ActivityPage from './Activity';
import BlogDetails from './BlogDetails';
import HelpCenter from './HelpCenter';
import AuthorsPage from './Authors';
import CreateItem from './CreateItem';
import EditProfile from './EditProfile';
import Ranking from './Ranking';
import NoResult from './NoResult';
import FAQ from './FAQ';
import ContactPage from './Contact';

const routes = [
  { path: '/', component: <Home /> },
  { path: '/explore', component: <ExplorePage /> },
  { path: '/live-auctions', component: <LiveAuctions /> },
  { path: '/item-details', component: <ItemDetailsPage /> },
  { path: '/activity', component: <ActivityPage /> },
  { path: '/blog-details', component: <BlogDetails /> },
  { path: '/help-center', component: <HelpCenter /> },
  { path: '/authors', component: <AuthorsPage /> },
  { path: '/create-item', component: <CreateItem /> },
  { path: '/edit-profile', component: <EditProfile /> },
  { path: '/ranking', component: <Ranking /> },
  { path: '/no-result', component: <NoResult /> },
  { path: '/faq', component: <FAQ /> },
  { path: '/contact', component: <ContactPage /> },
];

export default routes;

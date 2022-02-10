import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import heroSliderData from '../assets/fake-data/data-slider';
import Slider from '../components/slider/Slider';
import liveAuctionData from '../assets/fake-data/data-live-auction';
import LiveAuction from '../components/layouts/LiveAuction';
import TopSeller from '../components/layouts/TopSeller';
import topSellerData from '../assets/fake-data/data-top-seller';
import TodayPicks from '../components/layouts/TodayPicks';
import todayPickData from '../assets/fake-data/data-today-pick';
import PopularCollection from '../components/layouts/PopularCollection';
import popularCollectionData from '../assets/fake-data/data-popular-collection';
import Create from '../components/layouts/Create';
import { gql, useQuery } from '@apollo/client';

const getTestData = gql`
  query TestQuery {
    testMessage
  }
`;
const Home01 = () => {
  const { loading, error, data } = useQuery(getTestData);

  return (
    <div className="home-1">
      <Header />
      <Slider data={heroSliderData} />
      <h2>{data.testMessage}</h2>
      <LiveAuction data={liveAuctionData} />
      <TopSeller data={topSellerData} />
      <TodayPicks data={todayPickData} />
      <PopularCollection data={popularCollectionData} />
      <Create />
      <Footer />
    </div>
  );
};

export default Home01;

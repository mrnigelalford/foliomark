import React, { useEffect } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import popularCollectionData from '../assets/fake-data/data-popular-collection';
import heroSliderData from '../assets/fake-data/data-slider-2';
import Create from '../components/layouts/home-2/Create';
import LiveAuction from '../components/layouts/home-2/LiveAuction';
import TopSeller from '../components/layouts/home-2/TopSeller';
import PopularCollection from '../components/layouts/home-2/PopularCollection';
import SliderStyle1 from '../components/slider/SliderStyle1';
import topSellerData from '../assets/fake-data/data-top-seller';
import TodayPicks from '../components/layouts/home-2/TodayPicks';
import todayPickData from '../assets/fake-data/data-today-pick';

import { useQuery } from '@apollo/client';
import { GET_AUCTIONS } from '../graphql/auctions';

const Home = () => {
  const { data } = useQuery(GET_AUCTIONS);
  const [auctions, setAuctions] = React.useState([]);

  useEffect(() => {
    if (data) {
      setAuctions(data.auctions);
    }
  }, [data]);

  return (
    <div className="home-2">
      <Header />
      <SliderStyle1 data={heroSliderData} />
      <Create />
      {auctions.length && <LiveAuction data={auctions} />}
      <PopularCollection data={popularCollectionData} />
      <TopSeller data={topSellerData} />
      <TodayPicks data={todayPickData} />
      <Footer />
    </div>
  );
};

export default Home;

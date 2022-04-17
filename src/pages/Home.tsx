import React, { useEffect } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import heroSliderData from '../assets/fake-data/data-slider-2';
import Create from '../components/layouts/home-2/Create';
import TopSeller from '../components/layouts/home-2/TopSeller';
import PopularCollection from '../components/layouts/home-2/PopularCollection';
import SliderStyle1 from '../components/slider/SliderStyle1';
import TodayPicks from '../components/layouts/home-2/TodayPicks';
import Operations from '../State/Operations';
import { MintData } from '../types/Mint.types';

type props = {
  TezosState: any;
};

const Home = ({ TezosState }: props) => {
  const operations = new Operations();
  const latestOperations = operations.getOperations();
  const [NFTs, setNFTs] = React.useState<MintData[]>([]);

  const getLatestMints = async () => {
    const mints = await latestOperations;
    console.log('lm: ', mints);
    setNFTs(mints);
  };

  useEffect(() => {
    getLatestMints();
  }, []);

  return (
    <div className="home-2">
      <Header TezosState={TezosState} />
      <SliderStyle1 data={heroSliderData} />
      <Create />
      {/* <PopularCollection collections={NFTs} /> */}
      <TodayPicks collections={NFTs} />
      {/* <TopSeller /> */}
      <Footer />
    </div>
  );
};

export default Home;

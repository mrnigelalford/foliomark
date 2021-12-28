import React from 'react';
import Particle from '../components/Particle';
import SliderMainParticle from '../components/SliderMainParticle';
import FeatureBox from '../components/FeatureBox';
import CarouselCollection from '../components/CarouselCollection';
import ListItems from '../components/ListItems';
import AuthorList from '../components/authorList';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { mockAuthor, mockCollection, mockItems } from '../../data/mockData';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: #fff;
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;

const Home = () => (
  <div>
    <GlobalStyles />
    <section
      className="jumbotron no-bg"
      style={{ backgroundImage: `url(${'./img/background/2.jpg'})` }}
    >
      <Particle />
      <SliderMainParticle />
    </section>

    <section className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center">
            <h2>Popular Items</h2>
            <div className="small-border"></div>
          </div>
        </div>
      </div>

      <ListItems items={mockItems} />
    </section>

    <section className="container-fluid bg-gray">
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center">
            <h2>Hot Collections</h2>
            <div className="small-border"></div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <CarouselCollection collection={mockCollection} />
          </div>
        </div>
      </div>
    </section>

    <section className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center">
            <h2>Top Sellers</h2>
            <div className="small-border"></div>
          </div>
        </div>
        <div className="col-lg-12">
          <AuthorList author={mockAuthor} />
        </div>
      </div>
    </section>

    <section className="container-fluid bg-gray">
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center">
            <h2>Create and sell your NFTs</h2>
            <div className="small-border"></div>
          </div>
        </div>
      </div>
      <div className="container">
        <FeatureBox />
      </div>
    </section>

    <Footer />
  </div>
);
export default Home;

import React from 'react';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import ListItems from '../components/ListItems';
import { mockAuthor, mockCollection, mockItems } from '../../data/mockData';
import { useParams } from '@reach/router';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #111;
    }
    .item-dropdown .dropdown a{
      color: #111 !important;
    }
  }
`;

const getWalletId = (id) =>
  mockAuthor.filter((a) => a.id === id)[0].wallet_address;

const Collection = () => {
  const { id } = useParams();
  const collection = mockCollection.filter((data) => data.id === id)[0];

  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    document.getElementById('Mainbtn').classList.add('active');
    document.getElementById('Mainbtn1').classList.remove('active');
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu(false);
    document.getElementById('Mainbtn1').classList.add('active');
    document.getElementById('Mainbtn').classList.remove('active');
  };

  return (
    <div>
      <GlobalStyles />

      <section
        id="profile_banner"
        className="jumbotron breadcumb no-bg"
        style={{ backgroundImage: `url(${collection.collectionImg})` }}
      >
        <div className="mainbreadcumb"></div>
      </section>

      <section className="container d_coll no-top no-bottom">
        <div className="row">
          <div className="col-md-12">
            <div className="d_profile">
              <div className="profile_avatar">
                <div className="d_profile_img">
                  <img src={collection.authorImg} alt="" />
                  {collection.isVerified && <i className="fa fa-check"></i>}
                </div>

                <div className="profile_name">
                  <h4>
                    {collection.title}
                    <div className="clearfix"></div>
                    <span id="wallet" className="profile_wallet">
                      {getWalletId(collection.authorId)}
                    </span>
                    <button id="btn_copy" title="Copy Text">
                      Copy
                    </button>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container no-top">
        <div className="row">
          <div className="col-lg-12">
            <div className="items_filter">
              <ul className="de_nav">
                <li id="Mainbtn" className="active">
                  <span onClick={handleBtnClick}>On Sale</span>
                </li>
                <li id="Mainbtn1" className="">
                  <span onClick={handleBtnClick1}>Owned</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {openMenu && (
          <div id="zero1" className="onStep fadeIn">
            <ListItems items={[mockItems[0]]} />
          </div>
        )}
        {openMenu1 && (
          <div id="zero2" className="onStep fadeIn">
            <ListItems items={mockItems} />
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};
export default Collection;

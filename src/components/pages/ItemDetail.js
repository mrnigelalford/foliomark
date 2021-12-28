import React from 'react';
import Clock from '../components/Clock';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { useParams } from '@reach/router';
import { mockItems } from '../../data/mockData';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff;
    border-bottom: solid 1px #dddddd;
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

const ItemDetail = () => {
  const { id } = useParams();
  const item = mockItems.filter((data) => data.id === id)[0];

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
      <section className="container">
        <div className="row mt-md-5 pt-md-4">
          <div className="col-md-6 text-center">
            <img
              src={item.fullImg}
              className="img-fluid img-rounded mb-sm-30"
              alt=""
            />
          </div>
          <div className="col-md-6">
            <div className="item_info">
              Auctions ends in
              <div className="de_countdown">
                <Clock deadline={item.deadline} />
              </div>
              <h2>{item.title}</h2>
              <div className="item_info_counts">
                <div className="item_info_type">
                  <i className="fa fa-image"></i>
                  {item.type}
                </div>
                <div className="item_info_views">
                  <i className="fa fa-eye"></i>
                  {item.views}
                </div>
                <div className="item_info_like">
                  <i className="fa fa-heart"></i>
                  {item.likes}
                </div>
              </div>
              <p> {item.description} </p>
              <h6>Creator</h6>
              <div className="item_author">
                <div className="author_list_pp">
                  <span>
                    <img className="lazy" src={item.authorImg} alt="" />
                    <i className="fa fa-check"></i>
                  </span>
                </div>
                <div className="author_list_info">
                  <span>{item.authorName}</span>
                </div>
              </div>
              <div className="spacer-40"></div>
              <div className="de_tab">
                <ul className="de_nav">
                  <li id="Mainbtn" className="active">
                    <span onClick={handleBtnClick}>Bids</span>
                  </li>
                  <li id="Mainbtn1" className="">
                    <span onClick={handleBtnClick1}>History</span>
                  </li>
                </ul>

                <div className="de_tab_content">
                  {openMenu && item.bids.length > 0 && (
                    <div className="tab-1 onStep fadeIn">
                      {item.bids.map((bid, index) => (
                        <div key={index} className="p_list">
                          <div className="p_list_pp">
                            <span>
                              <img
                                className="lazy"
                                src={bid.authorImg}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </span>
                          </div>
                          <div className="p_list_info">
                            Bid accepted{' '}
                            <b>
                              {bid.bid} {bid.token}
                            </b>
                            <span>
                              by <b>{bid.authorName}</b> at {bid.bidDate}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {openMenu1 && (
                    <div className="tab-2 onStep fadeIn">
                      {item.bids.map((bid, index) => (
                        <div key={index} className="p_list">
                          <div className="p_list_pp">
                            <span>
                              <img
                                className="lazy"
                                src={bid.authorImg}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </span>
                          </div>
                          <div className="p_list_info">
                            <b>
                              Bought for {bid.bid} {bid.token}
                            </b>
                            <span>
                              by <b>{bid.authorName}</b> at {bid.bidDate}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ItemDetail;

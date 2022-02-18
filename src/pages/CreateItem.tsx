import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Countdown from 'react-countdown';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const img1 =
  'https://backend.kukai.network/file/yews2a5buw36aphwqw5b6kbv54fje7_raw.png';
const avt =
  'https://backend.kukai.network/file/6vbjqvhb5plxaoi7jrdmghykuwloba_raw.png';

const CreateItem = () => {
  const [title, setTitle] = React.useState('Item Name');
  const [price, setPrice] = React.useState(0);
  const [category, setCategory] = React.useState('Art');

  const categories = [
    'Art',
    'Website',
    'Mobile',
    'Game',
    'Print',
    'illustration',
    'study',
    'Template',
    'Product',
    'Design',
    'Typography',
  ];

  return (
    <div className="create-item">
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Create Item</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="#">Pages</Link>
                  </li>
                  <li>Create Item</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="tf-create-item tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-xl-3 col-lg-6 col-md-6 col-12">
              <form action="#">
                <h4 className="title-create-item">Upload file</h4>
                <label
                  className="uploadFile"
                  style={{ padding: '0 25px', lineHeight: '7em' }}
                >
                  <span className="filename">
                    PNG, JPG, GIF, WEBP or MP4. Max 200mb.
                  </span>
                  <input
                    type="file"
                    className="inputfile form-control"
                    name="file"
                    style={{ position: 'relative', top: 'auto', right: 'auto' }}
                  />
                </label>
              </form>
              <h4 className="title-create-item">Preview item</h4>
              <div className="sc-card-product">
                <div className="card-media">
                  <Link to="/item-details-01">
                    <img src={img1} alt="Axies" />
                  </Link>
                  <Link to="/login" className="wishlist-button heart">
                    <span className="number-like"> 100</span>
                  </Link>
                  <div
                    style={{ display: 'none' }}
                    className="featured-countdown"
                  >
                    <span className="slogan"></span>
                    <Countdown date={Date.now() + 500000000}>
                      <span>You are good to go!</span>
                    </Countdown>
                  </div>
                </div>
                <div className="card-title">
                  <h5>{title}</h5>
                  <p>{category}</p>
                </div>
                <div className="meta-info">
                  <div className="author">
                    <div className="avatar">
                      <img src={avt} alt="Axies" />
                    </div>
                    <div className="info">
                      <span>Owned By</span>
                      <h6>
                        {' '}
                        <Link to="/author-02">Freddie Carpenter</Link>
                      </h6>
                    </div>
                  </div>
                  <div className="price">
                    <span>Current Bid</span>
                    <h5>{price}</h5>
                  </div>
                </div>
                <div className="card-bottom">
                  <Link
                    to="/wallet-connect"
                    className="sc-button style bag fl-button pri-3"
                  >
                    <span>Place Bid</span>
                  </Link>
                  <Link to="/activity-01" className="view-history reload">
                    View History
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-6 col-md-12 col-12">
              <div className="form-create-item">
                <div className="flat-tabs tab-create-item">
                  <Tabs>
                    <TabPanel>
                      <form action="#">
                        <h4 className="title-create-item">Title</h4>
                        <input
                          type="text"
                          placeholder={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />

                        <h4 className="title-create-item">Price</h4>
                        <input
                          type="number"
                          placeholder={price.toString()}
                          onChange={(e) => setPrice(Number(e.target.value))}
                          step="0.01"
                        />

                        <h4 className="title-create-item">Description</h4>
                        <textarea placeholder="e.g. “This is very limited item”"></textarea>

                        <div className="row-form style-3">
                          <div className="inner-row-form">
                            <h4 className="title-create-item">Royalties</h4>
                            <input type="text" placeholder="5%" />
                          </div>
                          <div className="inner-row-form">
                            <h4 className="title-create-item">Size</h4>
                            <input type="text" placeholder="e.g. “size”" />
                          </div>
                          <div className="inner-row-form style-2">
                            <h4 className="title-create-item">Category</h4>
                            <div
                              className="seclect-box"
                              style={{ paddingTop: 0 }}
                            >
                              <div id="item-create" className="dropdown">
                                <Link to="#" className="btn-selector nolink">
                                  Categories
                                </Link>
                                <ul>
                                  {categories.map((cat, i) => (
                                    <li
                                      key={cat + i}
                                      onClick={() => {
                                        console.log('set', cat);
                                        setCategory(cat);
                                      }}
                                    >
                                      <span>{cat}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </TabPanel>
                    <TabPanel>
                      <form action="#">
                        <h4 className="title-create-item">Minimum bid</h4>
                        <input type="text" placeholder="enter minimum bid" />
                        <div className="row">
                          <div className="col-md-6">
                            <h5 className="title-create-item">Starting date</h5>
                            <input
                              type="date"
                              name="bid_starting_date"
                              id="bid_starting_date"
                              className="form-control"
                              min="1997-01-01"
                            />
                          </div>
                          <div className="col-md-6">
                            <h4 className="title-create-item">
                              Expiration date
                            </h4>
                            <input
                              type="date"
                              name="bid_expiration_date"
                              id="bid_expiration_date"
                              className="form-control"
                            />
                          </div>
                        </div>

                        <h4 className="title-create-item">Title</h4>
                        <input
                          type="text"
                          placeholder={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />

                        <h4 className="title-create-item">Description</h4>
                        <textarea placeholder="e.g. “This is very limited item”"></textarea>
                      </form>
                    </TabPanel>
                    <TabPanel>
                      <form action="#">
                        <h4 className="title-create-item">Price</h4>
                        <input
                          type="text"
                          placeholder="Enter price for one item (ETH)"
                        />

                        <h4 className="title-create-item">Minimum bid</h4>
                        <input type="text" placeholder="enter minimum bid" />

                        <div className="row">
                          <div className="col-md-6">
                            <h5 className="title-create-item">Starting date</h5>
                            <input
                              type="date"
                              name="bid_starting_date"
                              id="bid_starting_date2"
                              className="form-control"
                              min="1997-01-01"
                            />
                          </div>
                          <div className="col-md-6">
                            <h4 className="title-create-item">
                              Expiration date
                            </h4>
                            <input
                              type="date"
                              name="bid_expiration_date"
                              id="bid_expiration_date2"
                              className="form-control"
                            />
                          </div>
                        </div>

                        <h4 className="title-create-item">Title</h4>
                        <input type="text" placeholder="Item Name" />

                        <h4 className="title-create-item">Description</h4>
                        <textarea placeholder="e.g. “This is very limited item”"></textarea>
                      </form>
                    </TabPanel>

                    <h4
                      style={{ marginTop: '20px' }}
                      className="title-create-item"
                    >
                      Select method
                    </h4>
                    <TabList>
                      <Tab>
                        <span className="icon-fl-tag"></span>Fixed Price
                      </Tab>
                      <Tab>
                        <span className="icon-fl-clock"></span>Time Auctions
                      </Tab>
                      <Tab>
                        <span className="icon-fl-icon-22"></span>Open For Bids
                      </Tab>
                    </TabList>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateItem;

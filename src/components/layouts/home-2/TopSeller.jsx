import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { GET_AUTHORS } from '../../../graphql/authors';

const TopSeller = (props) => {
  const { data } = useQuery(GET_AUTHORS);
  const [authors, setAuthors] = React.useState([]);

  useEffect(() => {
    if (data) {
      setAuthors(data.authors);
      console.log('data: ', data);
    }
  }, [data]);

  return (
    <section className="tf-section top-seller">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-md-12">
            <div className="heading-live-auctions">
              <h2 className="tf-title mb-25">Top Seller</h2>
            </div>
          </div>
          <div className="col-md-12">
            <div className="tf-box">
              {authors?.slice(0, 10).map((item, index) => (
                <TopSellerItem key={index} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TopSellerItem = ({ item }) => {
  return (
    <div className={`box-item ${item.classPadding}`}>
      <div className="sc-author-box style-3 pd-0">
        <div className="author-avatar">
          <Link to="/authors-02">
            <img src={item.img} alt="axies" className="avatar" />
          </Link>
          <div className="badge">
            <i className="ripple"></i>
          </div>
        </div>
        <div className="author-infor">
          <h5 className="fs-16">
            <Link to="/authors">{item.name}</Link>
          </h5>
          <span className="price">{item.sales}</span>
          <span className="price"> xtz</span>
        </div>
      </div>
    </div>
  );
};

export default TopSeller;

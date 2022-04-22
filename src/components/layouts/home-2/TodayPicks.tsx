import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MintData } from '../../../types/Mint.types';

interface CollectionProps {
  collections: MintData[];
}

const TodayPicks = ({ collections }: CollectionProps) => {
  const [visible, setVisible] = useState(8);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 4);
  };

  return (
    <section className="tf-section today-pick">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-md-12">
            <div className="heading-live-auctions mg-bt-21">
              <h2 className="tf-title pb-18">Latest Mints</h2>
              <Link to="/explore-03" className="exp style2">
                EXPLORE MORE
              </Link>
            </div>
          </div>
          {collections.slice(0, visible).map((item, index) => (
            <TodayPicksItem key={index} item={item} />
          ))}
          {visible < collections.length && (
            <div className="col-md-12 wrap-inner load-more text-center">
              <Link
                to="#"
                id="load-more"
                className="sc-button loadmore fl-button pri-3"
                onClick={showMoreItems}
              >
                <span>Load More</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const TodayPicksItem = ({ item }) => {
  if (!item.itokenMetadata) return <></>;
  const imgURL = item.itokenMetadata?.ipfs?.replace(
    'ipfs://',
    'https://ipfs.io/ipfs/'
  );

  return (
    <div className="fl-item col-xl-3 col-lg-4 col-md-6 col-sm-6">
      <div
        className={`sc-card-product explode style2 mg-bt ${
          item.feature ? 'comingsoon' : ''
        } `}
      >
        <div className="card-media">
          <Link to="/item-details-01">
            <img src={imgURL} alt="Axies" />
          </Link>
          <div className="button-place-bid">
            <Link
              to="/wallet-connect"
              className="sc-button style-place-bid style bag fl-button pri-3"
            >
              <span>Place Bid</span>
            </Link>
          </div>
          <Link to="/login" className="wishlist-button heart">
            <span className="number-like">{item.wishlist}</span>
          </Link>
          <div className="coming-soon">{item.feature || true}</div>
        </div>
        <div className="card-title">
          <h5>
            <Link to="/item-details-01">"{item.itokenMetadata.title}"</Link>
          </h5>
        </div>
        <div className="meta-info">
          <div className="author">
            <div className="avatar">
              <img src={item?.author?.img || ''} alt="Axies" />
            </div>
            <div className="info">
              <span>Creator</span>
              <h6>
                {' '}
                <Link to="/authors-02">{item?.author?.bioLink || ''}</Link>{' '}
              </h6>
            </div>
          </div>
          <div className="tags">{item.tags || ''}</div>
        </div>
        <div className="card-bottom style-explode">
          <div className="price">
            <span>Current Bid</span>
            <div className="price-details">
              <h5>{item.itokenMetadata.price}</h5>
              <span>= {item.priceChange}</span>
            </div>
          </div>
          <Link to="/activity-01" className="view-history reload">
            View History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TodayPicks;
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, A11y } from 'swiper';
import { MintData } from '../../../types/Mint.types';

interface CollectionProps {
  collections: MintData[];
}

const PopularCollection = ({ collections }: CollectionProps) => {
  return (
    <section className="tf-section popular-collection">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-md-12">
            <div className="heading-live-auctions">
              <h2 className="tf-title pb-22 text-left">Popular Collection</h2>
              <Link to="/explore-03" className="exp style2">
                EXPLORE MORE
              </Link>
            </div>
          </div>
          <div className="col-md-12">
            <div className="collection">
              <Swiper
                modules={[Navigation, Scrollbar, A11y]}
                spaceBetween={30}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  767: {
                    slidesPerView: 2,
                  },
                  991: {
                    slidesPerView: 3,
                  },
                }}
                scrollbar={{ draggable: true }}
              >
                {collections.map((item, index) => (
                  <SwiperSlide key={index}>
                    <PopularCollectionItem item={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PopularCollectionItem = ({ item }) => {
  if (!item.itokenMetadata) return <></>;
  const imgURL = item.itokenMetadata?.ipfs?.replace(
    'ipfs://',
    'https://ipfs.io/ipfs/'
  );
  return (
    <div className="swiper-container show-shadow carousel4 button-arow-style">
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <div className="slider-item">
            <div className="sc-card-collection style-3">
              <Link to="/authors-02">
                <div className="media-images-box">
                  <div className="top-media">
                    <img src={imgURL} alt={item.itokenMetadata.title} />
                  </div>
                </div>
              </Link>
              <div className="card-bottom">
                <div className="author">
                  <div className="sc-author-box style-2">
                    <div className="author-avatar">
                      {/* <img src={item.img} alt="" className="avatar" /> */}
                      <div className="badge">
                        <i className="ripple"></i>
                      </div>
                    </div>
                  </div>
                  <div className="content">
                    <h4>
                      <Link to="/authors-01">{item?.itokenMetadata.title}</Link>
                    </h4>
                    <div className="infor">
                      <span>Created by</span>
                      <span className="name">
                        <Link to="/authors-02">{item?.iowner}</Link>
                      </span>
                    </div>
                  </div>
                </div>
                <Link to="/login" className="wishlist-button public heart">
                  <span className="number-like">
                    {item?.itokenMetadata.wishlist}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularCollection;

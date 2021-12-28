import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class CustomSlide extends Component {
  render() {
    const { index, ...props } = this.props;
    return <div {...props}></div>;
  }
}

const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1900,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
      },
    },
  ],
};

export default class Responsive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: props.collection.slice(0, 4),
    };
  }
  render() {
    return (
      <div className="nft">
        <Slider {...settings}>
          {this.state.collection.map((coll, index) => (
            <CustomSlide className="itm" index={index}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <span>
                    <img
                      src={coll.collectionImg}
                      className="lazy img-fluid"
                      alt=""
                    />
                  </span>
                </div>
                <div className="nft_coll_pp">
                  <span onClick={() => window.open('/home', '_self')}>
                    <img className="lazy" src={coll.authorImg} alt="" />
                  </span>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <span onClick={() => window.open('/home', '_self')}>
                    <h4>{coll.title}</h4>
                  </span>
                  <span>{coll.description}</span>
                </div>
              </div>
            </CustomSlide>
          ))}
        </Slider>
      </div>
    );
  }
}

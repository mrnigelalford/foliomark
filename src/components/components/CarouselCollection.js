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

export default class Responsive extends Component {
  dummyData = [
    {
      collectionImg: './img/collections/coll-1.jpg',
      authorImg: './img/author/author-1.jpg',
      title: 'Abstractions',
      description: 'ERC-192',
    },
    {
      collectionImg: './img/collections/coll-2.jpg',
      authorImg: './img/author/author-2.jpg',
      title: 'Patternlicious',
      description: 'ERC-61',
    },
    {
      collectionImg: './img/collections/coll-3.jpg',
      authorImg: './img/author/author-3.jpg',
      title: 'Skecthify',
      description: 'ERC-126',
    },
    {
      collectionImg: './img/collections/coll-4.jpg',
      authorImg: './img/author/author-4.jpg',
      title: 'Cartoonism',
      description: 'ERC-73',
    },
  ];
  constructor(props) {
    super(props);
    this.state = {
      collection: this.dummyData.slice(0, 4),
    };
  }
  render() {
    var settings = {
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

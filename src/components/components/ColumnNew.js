import React, { Component } from 'react';
import styled from 'styled-components';
import Clock from './Clock';

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

export default class Responsive extends Component {
  dummyData = [
    {
      deadline: 'December, 30, 2021',
      authorLink: '#',
      nftLink: '#',
      bidLink: '#',
      authorImg: './img/author/author-1.jpg',
      previewImg: './img/items/static-1.jpg',
      title: 'Pinky Ocean',
      price: '0.08 ETH',
      bid: '1/20',
      likes: 50,
    },

    {
      deadline: '',
      authorLink: '#',
      nftLink: '#',
      bidLink: '#',
      authorImg: './img/author/author-10.jpg',
      previewImg: './img/items/static-2.jpg',
      title: 'Deep Sea Phantasy',
      price: '0.06 ETH',
      bid: '1/22',
      likes: 80,
    },
    {
      deadline: '',
      authorLink: '#',
      nftLink: '#',
      bidLink: '#',
      authorImg: './img/author/author-11.jpg',
      previewImg: './img/items/static-3.jpg',
      title: 'Rainbow Style',
      price: '0.05 ETH',
      bid: '1/11',
      likes: 97,
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      nfts: this.dummyData.slice(0, 8),
      height: 0,
    };
    this.onImgLoad = this.onImgLoad.bind(this);
  }

  loadMore = () => {
    let nftState = this.state.nfts;
    let start = nftState.length;
    let end = nftState.length + 4;
    this.setState({
      nfts: [...nftState, ...this.dummyData.slice(start, end)],
    });
  };

  onImgLoad({ target: img }) {
    let currentHeight = this.state.height;
    if (currentHeight < img.offsetHeight) {
      this.setState({
        height: img.offsetHeight,
      });
    }
  }

  render() {
    return (
      <div className="row">
        {this.state.nfts.map((nft, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
          >
            <div className="nft__item m-0">
              {nft.deadline && (
                <div className="de_countdown">
                  <Clock deadline={nft.deadline} />
                </div>
              )}
              <div className="author_list_pp">
                <span onClick={() => window.open(nft.authorLink, '_self')}>
                  <img className="lazy" src={nft.authorImg} alt="" />
                  <i className="fa fa-check"></i>
                </span>
              </div>
              <div
                className="nft__item_wrap"
                style={{ height: `${this.state.height}px` }}
              >
                <Outer>
                  <span>
                    <img
                      onLoad={this.onImgLoad}
                      src={nft.previewImg}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </span>
                </Outer>
              </div>
              <div className="nft__item_info">
                <span onClick={() => window.open(nft.nftLink, '_self')}>
                  <h4>{nft.title}</h4>
                </span>
                <div className="nft__item_price">
                  {nft.price}
                  <span>{nft.bid}</span>
                </div>
                <div className="nft__item_action">
                  <span onClick={() => window.open(nft.bidLink, '_self')}>
                    Place a bid
                  </span>
                </div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{nft.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {this.state.nfts.length !== this.dummyData.length && (
          <div className="col-lg-12">
            <div className="spacer-single"></div>
            <span
              onClick={() => this.loadMore()}
              className="btn-main lead m-auto"
            >
              Load More
            </span>
          </div>
        )}
      </div>
    );
  }
}

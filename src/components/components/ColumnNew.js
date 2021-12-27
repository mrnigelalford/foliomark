import { Link } from '@reach/router';
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

export const dummyData = [
  {
    deadline: 'December, 30, 2021',
    authorLink: '#',
    nftLink: '#',
    bidLink: '#',
    authorImg:
      'https://github.com/mrnigelalford/foliomark/blob/38baee707d6f50b321de110f67ea1e850e977b7c/public/img/author/author-1.jpg?raw=true',
    previewImg:
      'https://github.com/mrnigelalford/foliomark/blob/38baee707d6f50b321de110f67ea1e850e977b7c/public/img/items/static-1.jpg?raw=true',
    fullImg:
      'https://github.com/mrnigelalford/foliomark/blob/38baee707d6f50b321de110f67ea1e850e977b7c/public/img/items/big-2.jpg?raw=true',
    title: 'Pinky Ocean',
    price: '0.08 ETH',
    bid: '1/20',
    likes: 50,
    id: '1234abc',
    type: 'Art',
    views: 250,
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit </br> voluptatem </br> accusantium doloremque laudantium, totam rem aperiam, eaque ipsa </br> quae ab </br>illo inventore veritatis et quasi architecto beatae </br> vitae dicta sunt </br> explicabo.',
    authorName: 'Monica Lucas',
    bids: [
      {
        authorImg:
          'https://github.com/mrnigelalford/foliomark/blob/38baee707d6f50b321de110f67ea1e850e977b7c/public/img/author/author-2.jpg?raw=true',
        authorName: 'Steve Smith',
        bidDate: new Date().toString(),
        bid: 100,
        token: 'xtz',
      },
      {
        authorImg:
          'https://github.com/mrnigelalford/foliomark/blob/38baee707d6f50b321de110f67ea1e850e977b7c/public/img/author/author-3.jpg?raw=true',
        authorName: 'Shoebly Jubly',
        bidDate: new Date().toString(),
        bid: 200,
        token: 'xtz',
      },
    ],
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

export default class Responsive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nfts: dummyData.slice(0, 8),
      height: 0,
    };
    this.onImgLoad = this.onImgLoad.bind(this);
  }

  loadMore = () => {
    let nftState = this.state.nfts;
    let start = nftState.length;
    let end = nftState.length + 4;
    this.setState({
      nfts: [...nftState, ...dummyData.slice(start, end)],
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
                <h4 onClick={() => console.log('ding')}>
                  <Link to={`/ItemDetail/${nft.id}`}>{nft.title}</Link>
                </h4>
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
        {this.state.nfts.length !== dummyData.length && (
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

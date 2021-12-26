import React from 'react';
import { Component } from 'react';

export default class authorlist extends Component {
  dummyData = [
    {
      img: './img/author/author-1.jpg',
      name: 'Monica Lucas',
      revenue: 100,
      token: 'xtz',
    },
    {
      img: './img/author/author-2.jpg',
      name: 'Mamie Barnett',
      revenue: 100,
      token: 'xtz',
    },
    {
      img: './img/author/author-3.jpg',
      name: 'Nicholas Daniels',
      revenue: 100,
      token: 'xtz',
    },
    {
      img: './img/author/author-4.jpg',
      name: 'Lori Hart',
      revenue: 100,
      token: 'xtz',
    },
    {
      img: './img/author/author-5.jpg',
      name: 'Jimmy Wright',
      revenue: 100,
      token: 'xtz',
    },
    {
      img: './img/author/author-6.jpg',
      name: 'Karla Sharp',
      revenue: 100,
      token: 'xtz',
    },
    {
      img: './img/author/author-7.jpg',
      name: 'Gayle Hicks',
      revenue: 100,
      token: 'xtz',
    },
    {
      img: './img/author/author-8.jpg',
      name: 'Claude Banks',
      revenue: 100,
      token: 'xtz',
    },
    {
      img: './img/author/author-9.jpg',
      name: 'Franklin Greer',
      revenue: 100,
      token: 'xtz',
    },
    {
      img: './img/author/author-10.jpg',
      name: 'Stacy Long',
      revenue: 100,
      token: 'xtz',
    },
    {
      img: './img/author/author-11.jpg',
      name: 'Ida Chapman',
      revenue: 100,
      token: 'xtz',
    },
    {
      img: './img/author/author-12.jpg',
      name: 'Fred Ryan',
      revenue: 100,
      token: 'xtz',
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      authors: this.dummyData.slice(0, 12),
      height: 0,
    };
  }
  render() {
    return (
      <div>
        <ol className="author_list">
          {this.state.authors.map((author, index) => (
            <li>
              <div key={index} className="author_list_pp">
                <span onClick={() => window.open('', '_self')}>
                  <img className="lazy" src={author.img} alt="" />
                  <i className="fa fa-check"></i>
                </span>
              </div>
              <div className="author_list_info">
                <span onClick={() => window.open('', '_self')}>
                  {author.name}
                </span>
                <span className="bot">
                  {author.revenue}
                  {author.token}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

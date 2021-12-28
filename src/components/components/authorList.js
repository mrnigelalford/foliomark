import React from 'react';
import { Component } from 'react';

export default class authorlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: props.author.sort((a, b) => b.revenue - a.revenue).slice(0, 12),
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

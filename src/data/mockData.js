const mockRevenue = 100;
const imgUrl =
  'https://github.com/mrnigelalford/foliomark/blob/38baee707d6f50b321de110f67ea1e850e977b7c/public/img';

const bidsArray = [
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
];

export const mockItems = [
  {
    id: '1234abc',
    deadline: 'December, 30, 2021',
    authorLink: '#',
    nftLink: '#',
    bidLink: '#',
    authorImg: `${imgUrl}/author/author-1.jpg?raw=true`,
    previewImg: `${imgUrl}/items/static-1.jpg?raw=true`,
    fullImg: `${imgUrl}items/big-1.jpg?raw=true`,
    title: 'Pinky Ocean',
    price: '0.08',
    token: 'xtz',
    bid: '1/20',
    likes: 50,
    type: 'Art',
    views: 250,
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit </br> voluptatem </br> accusantium doloremque laudantium, totam rem aperiam, eaque ipsa </br> quae ab </br>illo inventore veritatis et quasi architecto beatae </br> vitae dicta sunt </br> explicabo.',
    authorName: 'Monica Lucas',
    bids: bidsArray,
  },
  {
    id: '1235abc',
    deadline: 'January, 1, 2022',
    authorLink: '#',
    nftLink: '#',
    bidLink: '#',
    authorImg: `${imgUrl}/author/author-10.jpg?raw=true`,
    previewImg: `${imgUrl}/items/static-2.jpg?raw=true`,
    fullImg: `${imgUrl}items/big-2.jpg?raw=true`,
    title: 'Deep Sea Phantasy',
    price: '0.06',
    token: 'xtz',
    bid: '1/22',
    likes: 80,
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit </br> voluptatem </br> accusantium doloremque laudantium, totam rem aperiam, eaque ipsa </br> quae ab </br>illo inventore veritatis et quasi architecto beatae </br> vitae dicta sunt </br> explicabo.',
    authorName: 'Sue Stevens',
    bids: bidsArray,
  },
  {
    id: '1236abc',
    deadline: 'December, 20, 2021',
    authorLink: '#',
    nftLink: '#',
    bidLink: '#',
    authorImg: `${imgUrl}/author/author-11.jpg?raw=true`,
    previewImg: `${imgUrl}/items/static-3.jpg?raw=true`,
    fullImg: `${imgUrl}items/big-1.jpg?raw=true`,
    title: 'Rainbow Style',
    price: '0.05 ETH',
    bid: '1/11',
    likes: 97,
    type: 'Art',
    views: 250,
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit </br> voluptatem </br> accusantium doloremque laudantium, totam rem aperiam, eaque ipsa </br> quae ab </br>illo inventore veritatis et quasi architecto beatae </br> vitae dicta sunt </br> explicabo.',
    authorName: 'Jeremy Irons',
    bids: bidsArray,
  },
];

export const mockCollection = [
  {
    collectionImg: `${imgUrl}/collections/coll-1.jpg?raw=true`,
    authorImg: `${imgUrl}/author/author-1.jpg?raw=true`,
    title: 'Abstractions',
    description: 'ERC-192',
  },
  {
    collectionImg: `${imgUrl}/collections/coll-2.jpg?raw=true`,
    authorImg: `${imgUrl}/author/author-2.jpg?raw=true`,
    title: 'Patternlicious',
    description: 'ERC-61',
  },
  {
    collectionImg: `${imgUrl}/collections/coll-3.jpg?raw=true`,
    authorImg: `${imgUrl}/author/author-3.jpg?raw=true`,
    title: 'Skecthify',
    description: 'ERC-126',
  },
  {
    collectionImg: `${imgUrl}/collections/coll-4.jpg?raw=true`,
    authorImg: `${imgUrl}/author/author-4.jpg?raw=true`,
    title: 'Cartoonism',
    description: 'ERC-73',
  },
];

export const mockAuthor = [
  {
    img: './img/author/author-1.jpg',
    name: 'Monica Lucas',
    revenue: mockRevenue,
    token: 'xtz',
  },
  {
    img: './img/author/author-2.jpg',
    name: 'Mamie Barnett',
    revenue: mockRevenue * 2,
    token: 'xtz',
  },
  {
    img: './img/author/author-3.jpg',
    name: 'Nicholas Daniels',
    revenue: mockRevenue * 3,
    token: 'xtz',
  },
  {
    img: './img/author/author-4.jpg',
    name: 'Lori Hart',
    revenue: mockRevenue * 4,
    token: 'xtz',
  },
  {
    img: './img/author/author-5.jpg',
    name: 'Jimmy Wright',
    revenue: mockRevenue - 10,
    token: 'xtz',
  },
  {
    img: './img/author/author-6.jpg',
    name: 'Karla Sharp',
    revenue: mockRevenue - 20,
    token: 'xtz',
  },
  {
    img: './img/author/author-7.jpg',
    name: 'Gayle Hicks',
    revenue: mockRevenue - 30,
    token: 'xtz',
  },
  {
    img: './img/author/author-8.jpg',
    name: 'Claude Banks',
    revenue: mockRevenue - 40,
    token: 'xtz',
  },
  {
    img: './img/author/author-9.jpg',
    name: 'Franklin Greer',
    revenue: mockRevenue,
    token: 'xtz',
  },
  {
    img: './img/author/author-10.jpg',
    name: 'Stacy Long',
    revenue: mockRevenue,
    token: 'xtz',
  },
  {
    img: './img/author/author-11.jpg',
    name: 'Ida Chapman',
    revenue: mockRevenue,
    token: 'xtz',
  },
  {
    img: './img/author/author-12.jpg',
    name: 'Fred Ryan',
    revenue: mockRevenue,
    token: 'xtz',
  },
];

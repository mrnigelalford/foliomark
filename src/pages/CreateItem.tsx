import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Countdown from 'react-countdown';
import 'react-tabs/style/react-tabs.css';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { Slider } from 'primereact/slider';
import { Token } from '../types/Auction.types';
import { TezosState } from '../State/Tezos';

const avt =
  'https://backend.kukai.network/file/6vbjqvhb5plxaoi7jrdmghykuwloba_raw.png';
const sampleDescription = 'e.g. “This is very limited item”';

const photoDescription =
  'Types supported: gif, jpeg, png, svg, mp4, webm, glb, mp3, wav, flac, pdf, zip (interactive), Max file size is 100MB';

const License = {
  CC0: 'CC0 (Public Domain)',
  CC_BY: 'CC BY',
  CC_BY_SA: 'CC BY-SA',
};

const categories = [
  'Art',
  'Website',
  'Mobile',
  'Game',
  'Print',
  'illustration',
  'study',
  'Template',
  'Product',
  'Design',
  'Typography',
];
const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

const uploadServerURL = process.env.uploadServer;

const getBucketImageAddress = (
  files: Array<File>
): Promise<{ message: string; data: string }> => {
  return new Promise((resolve, reject) => {
    var formData: any = new FormData();
    var xhr = new XMLHttpRequest();
    formData.append('file', files[0]);

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200) {
          console.log('upload success: ', xhr.responseText);
          resolve(JSON.parse(xhr.response));
        } else {
          reject(xhr.response);
        }
      }
    };
    xhr.open(
      'POST',
      'https://upload-server-dot-foliomark.uc.r.appspot.com/uploads',
      true
    );
    xhr.send(formData);
  });
};

const CreateItem = () => {
  const [title, setTitle] = React.useState('Item Name');
  const [price, setPrice] = React.useState(0);
  const [category, setCategory] = React.useState('Art');
  const [description, setDescription] = React.useState(sampleDescription);
  const [quantity, setQuantity] = React.useState(1);
  const [license, setLicense] = React.useState(License.CC0);
  const [royaltyAddress, setRoyaltyAddress] = React.useState('');
  const [royaltyPercent, setRoyaltyPercent] = React.useState(0);
  const [img, setImg] = React.useState<string>();
  const [rawImg, setRawImg] = React.useState<File[]>();
  const [address, setAddress] = React.useState<string>();

  const { setOriginate, walletAddress, setMint } = TezosState();

  walletAddress.subscribe({
    next: (a) => setAddress(a),
  });

  const onFileInputChange = (e) => {
    if (e) {
      setRawImg(e.target.files);
      getBase64(e.target.files[0]).then((data) => {
        if (data && typeof data === 'string') setImg(data);
      });
    }
  };

  const nft = {
    title,
    price,
    category,
    description,
    royalties: royaltyPercent,
    quantity,
    license,
    fullImg: img,
    token: Token.XTZ,
    rawImg,
  };

  return (
    <div className="create-item">
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Create Item</h1>
              </div>
              <div style={{ display: 'none' }} className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="#">Pages</Link>
                  </li>
                  <li>Create Item</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="tf-create-item tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-xl-3 col-lg-6 col-md-6 col-12">
              <h4 className="title-create-item">Preview item</h4>
              <div className="sc-card-product">
                <div className="card-media">
                  {img ? (
                    <img src={img} alt="background" />
                  ) : (
                    <div
                      style={{
                        height: '30em',
                        backgroundColor: 'rgb(98 98 122)',
                      }}
                    ></div>
                  )}
                  <div
                    style={{ display: 'none' }}
                    className="featured-countdown"
                  >
                    <span className="slogan"></span>
                    <Countdown date={Date.now() + 500000000}>
                      <span>You are good to go!</span>
                    </Countdown>
                  </div>
                </div>
                <div className="card-title">
                  <h5>{title}</h5>
                  <p>{category}</p>
                </div>
                <div className="meta-info">
                  <div className="author">
                    <div className="avatar">
                      <img src={avt} alt="Axies" />
                    </div>
                    <div className="info">
                      <span>Creator</span>
                      <h6>
                        {' '}
                        <Link to="/author-02">Freddie Carpenter</Link>
                      </h6>
                    </div>
                  </div>
                  <div style={{ display: 'none' }} className="price">
                    <span>Value</span>
                    <h5>{price} xtz</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-6 col-md-12 col-12">
              <form action="#">
                <h4 className="title-create-item">Upload File</h4>
                <div
                  className="uploadFile"
                  style={{ padding: '25px', lineHeight: '7em' }}
                >
                  <p style={{ fontSize: '1em' }} className="sub-heading">
                    {photoDescription}
                  </p>
                  <input
                    type="file"
                    className="inputfile form-control"
                    name="file"
                    onChange={onFileInputChange}
                    style={{
                      position: 'inherit',
                      top: 'inherit',
                      width: 'inherit',
                      height: 'inherit',
                      transform: 'inherit',
                      marginTop: '2%',
                      left: '0.1em',
                    }}
                  />
                </div>
              </form>
              <div className="form-create-item">
                <div className="flat-tabs tab-create-item">
                  <form action="#">
                    <h4 className="title-create-item">Title</h4>
                    <input
                      type="text"
                      placeholder={title}
                      onBlur={(e) => setTitle(e.target.value)}
                    />

                    <h4 className="title-create-item">Description</h4>
                    <textarea
                      placeholder={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>

                    <div className="row-form style-3">
                      <div
                        style={{ display: 'none' }}
                        className="inner-row-form"
                      >
                        <h4 className="title-create-item">Price</h4>
                        <input
                          type="number"
                          placeholder={price.toString()}
                          onChange={(e) => setPrice(Number(e.target.value))}
                          step="0.01"
                        />
                      </div>

                      <div style={{ width: '10%' }}>
                        <h4 className="title-create-item">Quantity</h4>
                        <input
                          type="number"
                          placeholder={quantity.toString()}
                          onBlur={(e) =>
                            setQuantity(Number(e.target.textContent))
                          }
                          style={{ marginTop: '1.25em' }}
                        />
                      </div>

                      <div style={{ width: '70%', marginBottom: '4em' }}>
                        <h4
                          style={{ marginBottom: '0' }}
                          className="title-create-item"
                        >
                          Royalties
                        </h4>
                        <p style={{ marginBottom: '.5em' }}>
                          set royalty % with slider and target address if
                          differnt than user.
                        </p>
                        <div
                          style={{
                            display: 'flex',
                            flexFlow: 'row wrap',
                            justifyContent: 'space-between',
                          }}
                        >
                          <input
                            type="number"
                            value={royaltyPercent}
                            style={{ width: '14%' }}
                            onChange={(e) =>
                              setRoyaltyPercent(Number(e.target.value))
                            }
                          />
                          <input
                            type="text"
                            value={royaltyAddress}
                            placeholder="abcd1234...."
                            onChange={(e) => setRoyaltyAddress(e.target.value)}
                            style={{ width: '83%' }}
                          />
                          <Slider
                            value={royaltyPercent}
                            onChange={(e) => setRoyaltyPercent(Number(e.value))}
                            min={1}
                            max={12}
                            style={{ width: '60%', top: '2em', left: '1.2em' }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row-form style-3">
                      <div>
                        <h4 className="title-create-item">License</h4>
                        <DropdownButton
                          variant="primary"
                          menuVariant="dark"
                          title={license}
                          className="create-category-dropdown"
                        >
                          {Object.entries(License).map((license, i) => (
                            <Dropdown.Item
                              key={license[1] + i}
                              onClick={() => setLicense(license[1])}
                              style={{
                                width: '16em',
                                borderRadius: '.3em',
                                fontSize: '2em',
                                lineHeight: '1.7em',
                              }}
                            >
                              {license[1]}
                            </Dropdown.Item>
                          ))}
                        </DropdownButton>
                      </div>
                      <div>
                        <h4 className="title-create-item">Category</h4>
                        <DropdownButton
                          variant="primary"
                          menuVariant="dark"
                          title={category}
                          className="create-category-dropdown"
                        >
                          {categories.map((cat, i) => (
                            <Dropdown.Item
                              key={cat + i}
                              onClick={() => setCategory(cat)}
                              style={{
                                width: '16em',
                                borderRadius: '.3em',
                                fontSize: '2em',
                                lineHeight: '1.7em',
                              }}
                            >
                              {cat}
                            </Dropdown.Item>
                          ))}
                        </DropdownButton>
                      </div>
                    </div>
                  </form>

                  <h4
                    style={{ marginTop: '20px' }}
                    className="title-create-item"
                  >
                    Ship It!
                  </h4>
                  <Button
                    disabled
                    style={{
                      width: '20%',
                      fontSize: '1.4em',
                      borderRadius: '.3em',
                      fontWeight: 'bold',
                      lineHeight: '2.5em',
                    }}
                    onClick={setOriginate}
                  >
                    Originate
                  </Button>
                  <Button
                    style={{
                      width: '20%',
                      fontSize: '1.4em',
                      borderRadius: '.3em',
                      fontWeight: 'bold',
                      lineHeight: '2.5em',
                    }}
                    onClick={setMint}
                  >
                    Mint It!
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateItem;

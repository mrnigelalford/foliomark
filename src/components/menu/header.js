import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setDefaultBreakpoints } from 'react-socks';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from '@reach/router';
import {
  faTez,
  getWalletInfo,
  hasTezAccountInfo,
} from '../../wallet/certifier';

setDefaultBreakpoints([{ xs: 0 }, { l: 1199 }, { xl: 1200 }]);

const NavLink = (props) => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: isCurrent ? 'active' : 'non-active',
      };
    }}
  />
);

const Header = function () {
  const [tezAccountInfo, setTezAccountInfo] = useState(0);

  const getAddressInfo = async (tezAccountInfo) => {
    const walletinfo = await getWalletInfo(tezAccountInfo);
    setTezAccountInfo(walletinfo);
  };

  useEffect(() => {
    const header = document.getElementById('myHeader');
    const totop = document.getElementById('scroll-to-top');
    const scrollCallBack = window.addEventListener('scroll', () => {
      if (window.pageYOffset > header.offsetTop) {
        header.classList.add('sticky');
        totop.classList.add('show');
      } else {
        header.classList.remove('sticky');
        totop.classList.remove('show');
      }
    });

    hasTezAccountInfo().then((info) => {
      setTezAccountInfo(info);
    });

    return () => {
      window.removeEventListener('scroll', scrollCallBack);
    };
  }, []);

  const WalletButton = () => {
    if (tezAccountInfo) {
      console.log('tai: ', tezAccountInfo);
      return (
        <Button
          variant="secondary"
          className="btn-main"
          onClick={() => getAddressInfo(tezAccountInfo)}
        >
          {tezAccountInfo.address}
          <FontAwesomeIcon style={{ 'margin-left': '0.5em' }} icon={faTez} />
        </Button>
      );
    }
    return (
      <Button
        variant="primary"
        className="btn-main"
        onClick={() => getAddressInfo()}
      >
        Connect Wallet
      </Button>
    );
  };

  return (
    <header id="myHeader" className="navbar white">
      <Container className="container" fluid>
        <Row
          style={{
            flex: '0 0 100%',
            'justify-content': 'center',
            'align-items': 'center',
          }}
        >
          <Col xs lg="2" className="logo">
            <NavLink to="/">
              <img
                src="https://github.com/mrnigelalford/foliomark/blob/38baee707d6f50b321de110f67ea1e850e977b7c/public/img/logo-2-light.png?raw=true"
                className="img-fluid"
                alt="#"
              />
            </NavLink>
          </Col>

          <Col xs lg="8">
            <div className="search">
              <input
                id="quick_search"
                className="xs-hide"
                name="quick_search"
                placeholder="search item here..."
                type="text"
              />
            </div>
          </Col>

          <Col xs lg="2">
            <WalletButton />
          </Col>
        </Row>
      </Container>
    </header>
  );
};
export default Header;

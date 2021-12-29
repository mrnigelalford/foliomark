import React, { useEffect, useState } from 'react';
import { setDefaultBreakpoints } from 'react-socks';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from '@reach/router';
import { getWalletInfo } from '../../wallet/certifier';
import { tezAddress } from '../components/wallet';

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
  const [openMenu, setOpenMenu] = React.useState(false);
  const closeMenu = () => {
    setOpenMenu(false);
  };
  const [showmenu, btn_icon] = useState(false);
  useEffect(() => {
    const header = document.getElementById('myHeader');
    const totop = document.getElementById('scroll-to-top');
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener('scroll', () => {
      btn_icon(false);
      if (window.pageYOffset > sticky) {
        header.classList.add('sticky');
        totop.classList.add('show');
      } else {
        header.classList.remove('sticky');
        totop.classList.remove('show');
      }
      if (window.pageYOffset > sticky) {
        closeMenu();
      }
    });
    return () => {
      window.removeEventListener('scroll', scrollCallBack);
    };
  }, []);
  return (
    <header id="myHeader" className="navbar white">
      <Container fluid>
        <Row style={{ flex: '0 0 100%' }}>
          <Col className="logo px-0 navbar-title navbar-item">
            <NavLink to="/">
              <img
                src="https://github.com/mrnigelalford/foliomark/blob/38baee707d6f50b321de110f67ea1e850e977b7c/public/img/logo-2-light.png?raw=true"
                className="img-fluid d-none"
                alt="#"
              />
            </NavLink>
          </Col>

          <Col xs={6}>
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

          <Col>
            <div className="btn-main" onClick={() => getWalletInfo(tezAddress)}>
              Connect Wallet
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};
export default Header;

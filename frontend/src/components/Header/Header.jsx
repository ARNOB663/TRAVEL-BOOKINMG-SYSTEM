import React, { useRef, useEffect, useContext } from 'react';
import { Container, Row, Button } from 'reactstrap'; // importing reactstrap components
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import adminPanel from '../../pages/adminPanel';
import './header.css';
import { AuthContext } from '../../context/AuthContext';

const navLinks = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/about',
    display: 'About'
  },
  {
    path: '/tours',
    display: 'Tours'
  }
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  const stickyHeaderFunc = () => {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      headerRef.current.classList.add('sticky_header');
    } else {
      headerRef.current.classList.remove('sticky_header');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', stickyHeaderFunc);

    return () => {
      window.removeEventListener('scroll', stickyHeaderFunc);
    };
  }, []); // empty dependency array ensures it runs once

  const toggleMenu = () => menuRef.current.classList.toggle('show_menu');

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper d-flex align-items-center justify-content-between">
            {/* ========== logo ============ */}
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="Logo" />
              </Link>
            </div>
            {/* ========== logo end ============ */}

            {/* ========== menu start ============ */}
            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <ul className="menu d-flex align-items-center gap-5">
                {navLinks.map((item, index) => (
                  <li className="nav_item" key={index}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => (isActive ? 'active_link' : '')}
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
                {/* Conditionally render the Admin Panel link */}
                {user && user.role === 'admin' && (
  <li className="nav_item">
    <NavLink to="/adminPanel" className="active_link">
      Admin Panel
    </NavLink>
  </li>
)}

              </ul>
            </div>
            {/* ========== menu end ============ */}

            <div className="nav_right d-flex align-items-center gap-4">
              <div className="nav_btns d-flex align-items-center gap-4">
                {user ? (
                  <>
                    <h5 className="mb-0">{user.username}</h5>
                    <Button className="btn btn-dark" onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="btn secondary_btn">
                      <Link to="/login">Login</Link>
                    </Button>

                    <Button className="btn primary_btn">
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>

              <span className="mobile_menu" onClick={toggleMenu}>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;

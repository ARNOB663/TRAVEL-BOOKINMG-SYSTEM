import React from 'react'
import './footer.css'
import { Container,Row, Col,ListGroup ,ListGroupItem} from 'reactstrap'
import { Link } from 'react-router-dom'
import logo from "../../assets/images/logo.png";

const quick__links  = [

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
  },
  
  ]

  const quick__links2  = [

    {
    path: '/gallery',
    display: 'Gallery'
    
    },
    {
      path: '/login',
      display: 'Login'
    },
    {
      path: '/register',
      display: 'Register'
    },
    
    ]
const Footer = () => {

  const year = new Date().getFullYear()
  return (
    <footer className="footer">
     <Container>
      <Row>
        <Col lg="3">
        <div className="logo">
          <img src={logo} alt="" />
          <p>Explore the world with ease and confidence. Your journey, our commitment to excellence</p>
          <div className="social_links d-flex align-items-center gap-4">
            <span>
            <Link to='#'><i class="ri-youtube-line"></i></Link>
            </span>
            <span>
            <Link to='#'><i class="ri-github-line"></i></Link>
            </span>
            <span>
            <Link to='#'><i class="ri-facebook-line"></i></Link>
            </span>
            <span>
            <Link to='#'><i class="ri-instagram-line"></i></Link>
            </span>
            
          </div>
        </div>
        </Col>
        <Col lg='3'>

        <h5 className="footer_link-title">Discover</h5>
        <ListGroup className="footer_quick-links">
  {quick__links.map((item, index) => (
    <ListGroupItem key={index} className="ps-0 border-0">
      <Link to={item.path}>{item.display}</Link>
    </ListGroupItem>
  ))}
</ListGroup>

        </Col>
        <Col lg='3'>
        <h5 className="footer_link-title">Quick Links</h5>
        <ListGroup className="footer_quick-links">
  {quick__links2.map((item, index) => (
    <ListGroupItem key={index} className="ps-0 border-0">
      <Link to={item.path}>{item.display}</Link>
    </ListGroupItem>
      ))}

</ListGroup>
        </Col>
        <Col lg="3">
  <h5 className="footer_link-title">Contact</h5>
  <ListGroup className="footer_quick-links">

    {/* Address */}
    <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
      <h6 className="mb-0 d-flex align-items-center gap-2">
        <span><i className="ri-map-pin-line"></i></span>
        Address:
      </h6>
      <p className="mb-0">Chattrogram, Bangladesh</p>
    </ListGroupItem>

    {/* Email */}
    <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
      <h6 className="mb-0 d-flex align-items-center gap-2">
        <span><i className="ri-mail-line"></i></span>
        Email:
      </h6>
      <p className="mb-0">dev.abc@gmail.com</p>
    </ListGroupItem>

    {/* Phone */}
    <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
      <h6 className="mb-0 d-flex align-items-center gap-2">
        <span><i className="ri-phone-fill"></i></span>
        Phone:
      </h6>
      <p className="mb-0">+123-456-7890</p>
    </ListGroupItem>

  </ListGroup>
</Col>
<Col lg='12' className="text-center pt-5">
<p className="copyright">Copyright {year} , design and develop by Pranta Das, Aniruddha Dev Nath and Anitya Barua. All rights reserved.</p>
</Col>
      </Row>
     </Container>
    </footer>
  )
}

export default Footer

// import React, {useState, useContext} from 'react'
// import { Container,Row,Col, Form, FormGroup, Button } from 'reactstrap'
// import { Link, useNavigate } from 'react-router-dom'
// import '../styles/login.css'
// import loginImg from '../assets/images/login.png'
// import userIcon from '../assets/images/user.png'
// import { AuthContext } from '../context/AuthContext'
// import { BASE_URL } from '../utils/config'



// const Login = () => {

//   const [credentials, setCredentials] =useState ({
//    email:undefined,
//    password:undefined
// })

//  const {dispatch} = useContext(AuthContext)
//    const  navigate = useNavigate()

//   const handlechange = e => {
//     setCredentials(prev=>({...prev, [e.target.id]:e.target.value}))
// }

// const handleClick = async e => {
//   e.preventDefault();
//     dispatch({type: 'LOGIN_START'})
    
//     try {
//       const res = await fetch(`${BASE_URL}/auth/login`, {
//       method : 'post' ,
//       headers: {
//         'content-type' : 'application/json'
//       },
//       credentials : 'include',
//       body : JSON.stringify(credentials)
//     })
//        const result = await res.json()
//        if(!res.ok) alert(result.message)
        
//         console.log(result.data)

//         dispatch({type:'LOGIN_SUCCESS', payload: result.data})
//         navigate("/")

//     } catch (error) {
//       dispatch({type:'LOGIN_FAILURE', payload:error.message})
//     }

// }

//   return <section>
//     <Container>
//       <Row>
//         <Col lg='8' className="m-auto">
//         <div className="login_cntainer d-flex justify-content-between">
//           <div className="login_img">
//             <img src={loginImg} alt="" />
//           </div>
//           <div className="login_form">
//             <div className="user">
//               <img src={userIcon} alt="" />
//             </div>
//             <h2>Login</h2>
//             <Form onSubmit={handleClick}>
//               <FormGroup>
//                 <input type="email" placeholder="Email" required id="email" onChange={handlechange} />
//               </FormGroup>
//               <FormGroup>
//                 <input type="password" placeholder="Password" required id="password" onChange={handlechange} />
//               </FormGroup>
//               <Button className="btn secondary_btn auth_btn" type="submit">Login</Button>
//             </Form>
//             <p>Don't have an account?<Link to='/register'>Create</Link></p>
//           </div>
//         </div>
//         </Col>
//       </Row>
//     </Container>
//   </section>
    
// }

// export default Login

import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import loginImg from '../assets/images/login.png';
import userIcon from '../assets/images/user.png';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);  // State to hold error message

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(credentials)
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.message || 'Login failed');  // Set error message for failed login
        return;
      }

      dispatch({ type: 'LOGIN_SUCCESS', payload: result.data });
      localStorage.setItem('mySecretKeyForJWT', result.token);

      // Check if user is admin and navigate accordingly
      if (result.data.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
      setError('An error occurred during login.');  // Set error message for general error
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login_container d-flex justify-content-between">
              <div className="login_img">
                <img src={loginImg} alt="Login" />
              </div>
              <div className="login_form">
                <div className="user">
                  <img src={userIcon} alt="User" />
                </div>
                <h2>Login</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      id="email"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button className="btn secondary_btn auth_btn" type="submit">
                    Login
                  </Button>
                </Form>
                <p>
                  Don't have an account? <Link to="/register">Create one</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;

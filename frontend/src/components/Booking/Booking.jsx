import React, {useState, useContext} from 'react'
import './booking.css'
import { Form, FormGroup, ListGroup,ListGroupItem, Button } from 'reactstrap'
import { json, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { BASE_URL } from '../../utils/config'


const Booking = ({tour, avgRating}) => {
    const {price, reviews, title}=tour;
    const navigate = useNavigate();
    const {user} = useContext(AuthContext)

    const [booking, setBooking] =useState ({
        userId: user && user._id,
        userEmail : user && user.email,
        tourName : title,
        fullName : '',
        phone : '',
        guestSize : 1,
        bookAt : ''
    })

const handlechange = e => {
       setBooking(prev=>({...prev, [e.target.id]:e.target.value}))
}

const serviceFee = 10
const totalAmount = Number(price) * Number(booking.guestSize) + Number(serviceFee)
const handleClick = async e => {
    e.preventDefault()
   
    console.log(booking)

     try {
        if(!user || user=== undefined || user ===null) {
            return alert('please sign in')
        }
        const res = await fetch(`${BASE_URL}/booking`, {
            method : 'post' ,
            headers : {
                'content-type' : 'application/json'
            },
            credentials :'include',
            body : JSON.stringify(booking)
            
        })

        const result = await res.json()

        if(!res.ok) {
            return alert(result.message)
        }
        
   navigate('/thank-you');
     } catch (error) {
        alert(error.message)
        
     }




}


    return <div className="booking">
    <div className="booking_top d-flex align-items-center justify-content-between">
        
        <h3>${price}<span>/per person</span></h3>
        
<span className="tour_rating d-flex align-items-center ">
              <i class="ri-star-fill">
                </i>{avgRating=== 0 ? null : avgRating} ({reviews?.length})
              </span> 
           
    </div>
        {/* ================ booking form ============== */}

        <div className="booking_form">
            <h5>Information</h5>
            <Form className="booking_info-form" onSubmit={handleClick}>
                <FormGroup>
                    <input type="text"  placeholder="Full Name" id="fullName" required onChange={handlechange}/>
                </FormGroup>
                <FormGroup>
                    <input type="number"  placeholder="Phone" id="phone" required onChange={handlechange}/>
                </FormGroup>
                <FormGroup className="d-flex align-items-center gap-3"> 
                    <input type="date"  placeholder="" id="bookAt" required onChange={handlechange}/>
                    <input type="number"  placeholder="guest" id="guestSize" required onChange={handlechange}/>
                </FormGroup>
            </Form>
        </div>
        {/* ================ booking form ============== */}

          {/* ================ booking bottom ============== */}

          <div className="booking_bottom">
            <ListGroup>
                <ListGroupItem className="border-0 px-0">
                    <h5 className="d-flex align-items-center gap-1">${price} <i class="ri-close-line"></i> 1 person</h5>
                    <span>${price}</span>
                </ListGroupItem>
                <ListGroupItem className="border-0 px-0">
                    <h5>service charge</h5>
                <span>${serviceFee}</span>
                </ListGroupItem>
                <ListGroupItem className="border-0 px-0 total">
                    <h5>total</h5>
                    <span>${totalAmount}</span>
                </ListGroupItem>
                <button className="btn primary_btn w-100 mt-4" onClick={handleClick}>Book now</button>
            </ListGroup>
          </div>



    </div>
}
export default Booking

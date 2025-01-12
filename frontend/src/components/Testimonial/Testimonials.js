import React from 'react'
import Slider from 'react-slick'
import ava01 from '../../assets/images/ava-1.jpg'
import ava02 from '../../assets/images/ava-2.jpg'
import ava03 from '../../assets/images/ava-3.jpg'


const Testimonials = () => {
const setting={
    dots:true,
    infinite:true,
    autoplay:true,
    speed:1000,
    swipeToSlide:true,
    autoPlaySpeed:2000,
    slidesToShow:3,

    resposive:[
        {
            breakpoint:992,
            setting: {
                slidesToShow:2,
                slidesToScroll:1,
                infinite:true,
                dots:true,
            },
        },
        {
            breakpoint:576,
            setting: {
                slidesToShow:1,
                slidesToScroll:1,
                
            },
        },

    ]
}

    return  <Slider {...setting}>
    <div className="testimonial py-4 px-3">
        <p> "TravelWorld made my vacation absolutely perfect! The booking process was seamless, and the tour options were diverse and well-organized. Highly recommended!"
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
         <img src={ava01} className='w-25 h-25 rounded-2' alt=""></img>
         <div>
            <h6 className="mb-0 mtt-3">
              John Doe
            </h6>
            <p>Customer</p>
         </div>
        </div>
        </div>

        <div className="testimonial py-4 px-3">
        <p> "I loved how easy it was to find and book my dream tour. The customer service was fantastic, and the trip exceeded all my expectations!"
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
         <img src={ava02} className='w-25 h-25 rounded-2' alt=""></img>
         <div>
            <h6 className="mb-0 mtt-3">
            Sophia Williams
            </h6>
            <p>Customer</p>
         </div>
        </div>
        </div>

        <div className="testimonial py-4 px-3">
        <p> "TravelWorld turned my travel plans into an incredible experience. Everything was so well-managed, I will definitely book again!"
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
         <img src={ava03} className='w-25 h-25 rounded-2' alt=""></img>
         <div>
            <h6 className="mb-0 mtt-3">
            David Wilson
            </h6>
            <p>Customer</p>
         </div>
        </div>
        </div>
        
        <div className="testimonial py-4 px-3">
        <p> "A truly unforgettable experience! TravelWorld took care of every detail, leaving me free to enjoy my trip without any worries."
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
         <img src={ava02} className='w-25 h-25 rounded-2' alt=""></img>
         <div>
            <h6 className="mb-0 mtt-3">
            Sophia Williams
            </h6>
            <p>Customer</p>
         </div>
        </div>
        </div>

    </Slider>
};

export default Testimonials

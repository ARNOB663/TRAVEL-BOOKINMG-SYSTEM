import React from "react"
import ServiceCard from "./ServiceCard"
import {Col} from "reactstrap"
import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const servicesData = [

    {
        imgUrl: weatherImg,
        title: "Calculate Weather",
        desc: "Get the latest weather updates of your destination."
    },
    {
        imgUrl: guideImg,
        title: "Best Travel Guide",
        desc: "Get the best travel guide for your destination."
    },
    {
        imgUrl: customizationImg,
        title: "Customization",
        desc: "Customize your travel plan according to your needs."

    },
]

const ServiceList = () => {
  return <>
   {
    servicesData.map((item, index) => (
      <Col lg='3' md='6' sm='12' className="mb-4" key={index}>
        <ServiceCard item={item}/>
      </Col>

    ))}
   
  </>
}

export default ServiceList

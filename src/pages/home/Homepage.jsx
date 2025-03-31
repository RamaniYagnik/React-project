import React, { useContext } from 'react'
import Layout from '../../component/layout/Layout'
import Hero from '../../component/herosection/Hero'
import Category from '../../component/category/Category'
import HomePageProductCard from '../../component/homepageproductcard/HomePageProductCard'
import Track from '../../component/track/Track'
import Testimonial from '../../component/testimonial/Testimonial'

const Homepage = () => {
   
  return (
    <Layout>
      <Hero/>
      <Category/>
      <HomePageProductCard/>
      <Track/>
      <Testimonial/>
    </Layout>
  )
}
export default Homepage
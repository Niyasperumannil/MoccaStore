import React from 'react'
import LandingPageHeader from '../LandingPageHeader/LandingPageHeader'
import Slider from '../Slider/Slider'
import FavoriteBrands from '../FavoriteBrands/FavoriteBrands'
import BrandsCarousel from '../BrandsCarousel/BrandsCarousel'
import ShopByCategory from '../ShopByCategory/ShopByCategory'
import Footer from '../Footer/Footer'

function LandingPageHome() {
  return (
    <>
      <LandingPageHeader />
      <Slider />
      <FavoriteBrands />
      <BrandsCarousel />
      <ShopByCategory />
      <Footer />
    </>
  )
}

export default LandingPageHome

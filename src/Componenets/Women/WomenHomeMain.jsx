import React from 'react'
import LandingPageHeader from '../../Componenets/LangingPageMain/LandingPageHeader/LandingPageHeader'
import Breadcrumb from './Breadcrumb/Breadcrumb'
import WomenCollection from './WomenCollection/WomenCollection'
import Footer from '../LangingPageMain/Footer/Footer'

function WomenHomeMain() {
  return (
    <>
      <LandingPageHeader />
      <Breadcrumb />
      <WomenCollection />
      <Footer />
    </>
  )
}

export default WomenHomeMain

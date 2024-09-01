import React from 'react'
import { Header } from '../../components/Header/Header'
import Offer from '../../components/Offers/Offer'
import { AppDownload } from '../../components/AppDownload/AppDownload'

const Home = () => {
  return (
    <div>
        <Header/>
        <Offer />
        <AppDownload/>
    </div>
  )
}

export default Home

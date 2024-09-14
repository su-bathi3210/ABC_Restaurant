import React from 'react'
import { Header } from '../Header/Header'
import Offer from '../../components/Offers/Offer'
import { AppDownload } from '../../components/AppDownload/AppDownload'

const Customer = () => {
    return (
        <div>
            <Header />
            <Offer />
            <AppDownload />
        </div>
    )
}

export default Customer;

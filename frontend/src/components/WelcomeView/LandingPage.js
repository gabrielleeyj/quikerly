import withRoot from './withRoot';
import React from 'react';
import AppAppBar from './views/AppAppBar';
import Hero from './views/Hero';
import ProductValues from './views/ProductValues';
import ProductHowItWorks from './views/ProductHowItWorks';



function LandingPage() {
    return (
        <React.Fragment>
            <AppAppBar />
            <Hero />
            <ProductValues />
            <ProductHowItWorks />
        </React.Fragment>
    )
}

export default withRoot(LandingPage);

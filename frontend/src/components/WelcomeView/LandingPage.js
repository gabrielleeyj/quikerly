import withRoot from './withRoot';
import React from 'react';
import AppAppBar from './views/AppAppBar';
import Hero from './views/Hero';



function LandingPage() {
    return (
        <React.Fragment>
            <AppAppBar />
            <Hero />
        </React.Fragment>
    )
}

export default withRoot(LandingPage);

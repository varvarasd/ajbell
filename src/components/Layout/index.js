import React, { Fragment } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Helmet } from 'react-helmet-async';

const Layout = ({title, description, favicon, children}) => {
    return <Fragment>
        <Helmet>
            <link rel="icon" href={favicon} />
            <title>{title}</title>
            <meta name="description" content={description} />
        </Helmet>
        <Header />
        <main className="main">{children}</main>
        <Footer />
    </Fragment>
};

export default Layout;
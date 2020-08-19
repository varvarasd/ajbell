import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../components/Layout';
import TableRows from './TableRows';
import { Loading } from '../../components/Elements';

import './home.scss';

const Home = () => {
    const [state, setState] = useState({ coins: [], isLoading: true });
    const params = useParams();

    useEffect(() => {
        let isMounted = true;
        const getCoins = () => {
            const url = process.env.REACT_APP_COIN_LIST;
            axios
              .get(url)
              .then((res) => {
                if (res && res.status === 200 && isMounted) {
                    console.log('get coins is being called ===================')

                    setState({ coins: res.data.data.coins, isLoading: false});
                    setTimeout( getCoins, 3000 );
                }
                })
              .catch((err) => console.log(err, '=== GET COIN LIST ERROR ==='));
        }
        
        if (params.id) clearTimeout(getCoins)
        else getCoins();
        return () => { isMounted = false };
    }, [params]);

    state.coins.sort((a, b) => parseFloat(a.price) > parseFloat(b.price) ? -1 : 1);

    const mainElement = <Fragment>
        <section className="hero">
            <h1 className="hero__title">Cryptocurrency Prices Live From <a className="hero__title-link" href="https://coinranking.com/">Coinranking</a></h1>
        </section>
        <section className="container">
            <table className="table">
                <thead className="table__head">
                    <tr className="table__tabs">
                        <th>Rank</th>
                        <th>Coin</th>
                        <th>Price</th>
                        <th>Market Cap</th>
                        <th>Total supply</th>
                    </tr>
                </thead>
                <tbody>
                    <TableRows coins={state.coins} />
                </tbody>
            </table>
        </section>
    </Fragment>;

    return (
        <Layout 
            title='Coinranking - Cryptocurrency Prices Live'
            description='Cryptocurrency Rates List Today'
            favicon="https://coinranking.com/favicon.ico">
            {state.isLoading ? <Loading /> : mainElement}
        </Layout>
    );
}

export default Home;
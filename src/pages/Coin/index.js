import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import formatCurrency from 'format-currency';
import Layout from '../../components/Layout';
import { Loading } from '../../components/Elements';
import './coin.scss';

const Coin = () => {
    const params = useParams();
    const [state, setState] = useState({
        base: { symbol: '' }, 
        coin: { 
            description: '', 
            symbol: '',
            links: []
        },
        isLoading: true
    });

    useEffect(() => {
        let isMounted = true;
        const url = process.env.REACT_APP_COIN_INFO + `/${params.id}?base=GBP`;
        axios
            .get(url)
            .then((res) => {
            if (res && res.status === 200 && isMounted) {
                setState({...res.data.data, isLoading: false});
            }
        })
        .catch((err) => console.log(err, '=== GET COIN INFO ERROR ==='));
        return () => { isMounted = false };
    }, []);
    
    const formatDescription = (desc) => {
        if(typeof desc !== 'string') return null;
        const newDesc = desc.replace(/<[^>]*>?/g, '');
        return newDesc.split(/\n|\r/g);
    }
    
    const descriptionArray = formatDescription(state.coin.description);
    const opts = { format: '%s%v', symbol: '£', maxFraction: 2 }
    const formattedPrice = formatCurrency(state.coin.price, opts);

    const descriptionElement = descriptionArray 
        ? descriptionArray.map((item, index) => <p key={index} className="coin-description">{item}</p>) 
        : 'There is no description for this coin';

    const mainElement = <Fragment>
    <section className="hero">
        <img style={{width: '40px'}}src={state.coin.iconUrl} alt={`${state.coin.name} icon`}/>
        <h1> {state.coin.name} ({state.coin.symbol}) price to {state.base.symbol}</h1>
        <h2 className="hero__coin-price">{formattedPrice}</h2>
    </section>
    <section className="container--coin">
        <div>{descriptionElement}</div>
        <div>
            <h3>Project links</h3>
            {state.coin.links.length ? state.coin.links.map(item => <p key={item.url}><a  href={item.url}>{item.name} - {item.type} </a></p>) : 'noo'}
        </div>
    </section>
    </Fragment>;

    return <Layout 
        title={`Coinranking - ${state.coin.name} details`} 
        description={`${state.coin.name} live details`}
        favicon={state.coin.iconUrl}>
            {state.isLoading ? <Loading /> : mainElement}
    </Layout>;
}
export default Coin;
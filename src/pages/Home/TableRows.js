import React from 'react';
import { Link } from 'react-router-dom';
import formatCurrency from 'format-currency';


const TableRows = ({coins}) => {
    if ( !coins ) return null;

    const buildTableRows = ({id, name, price, marketCap, symbol, iconUrl, rank, totalSupply}) => {
        const opts = { format: '%s%v', symbol: '£', maxFraction: 2 };
        const formattedPrice = formatCurrency(price, opts);
        const formattedMarketCap = formatCurrency(marketCap, opts);

        const tableDataElement = (id, content) => {
            return <td className="table__data">
                <Link to={`/${id}`} className="table__row-link"></Link>
                <strong>{content}</strong>
            </td>;
        };

        return <tr key={name} className="table__row">
            <td className="table__data"><span>{rank}</span></td>
            <td className="table__data">
                <Link to={`/${id}`} className="table__row-link"></Link>
                <div className="coin">
                    <img className="coin__icon" src={iconUrl} alt={`${name} icon`}/>
                    <span>
                        <p><strong>{name}</strong></p>
                        <p>{symbol}</p>
                    </span>
                </div>
            </td>
            {tableDataElement(id, formattedPrice)}
            {tableDataElement(id, formattedMarketCap)}
            {tableDataElement(id, totalSupply)}
        </tr>;
    };

    const tableRowsElement = coins.map(buildTableRows);

    return tableRowsElement;
}

export default TableRows;
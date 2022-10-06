import React from 'react'
import {Link} from 'react-router-dom';

const InvestmentHeader = () => {
    return (
        <header>
            <br />
            <h1 style={{textAlign:"center"}} className="links">
                <Link to="/strategies" className="header-links">
                    Fat Rat Radar
                </Link>
                <Link to="/strategies" className="header-links">
                    Add 
                </Link>

            </h1>
        </header>
    )
}
export default InvestmentHeader;
import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import InvestmentHeader from '../components/InvestmentHeader';
import AddInvestment from '../components/AddInvestment';
import InvestmentStrategy from '../components/InvestmentStrategy';



const IRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <InvestmentHeader>
                    <div className="main-content">
                        <Routes>
                            <Route component={InvestmentStrategy} path="/" exact="true" />
                            <Route component={AddInvestment} path="/add" />
                        </Routes>
                    </div>
                </InvestmentHeader>
            </div>
        </BrowserRouter>
    )
}

export default IRouter;
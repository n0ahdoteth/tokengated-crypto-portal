import  {useState} from 'react'
import {Routes, Route, Navigate} from 'react-router-dom';
import {Button} from '@chakra-ui/react'
import {Typography} from 'antd';
import {NavBar, Homepage, Cryptocurrencies, News} from './components';
import './App.css'
import InvestmentStrategy from './components/InvestmentStrategy';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'font-awesome/css/font-awesome.min.css';
import InvestmentHeader from './components/InvestmentHeader';
import AddInvestment from './components/AddInvestment';
import useLocalStorage from './hooks/useLocalStorage'
import EditInvestment from './components/EditInvestment';
import InvestmentContext from './context/InvestmentContext';

const App = () => {
    const [isConnected, setIsConnected] = useState(true);
    
    const [cards, setCards] = useLocalStorage('cards', []);
    document.body.style = 'background: #1d113d;';

    return(
        <div className='app-bg'>
        {isConnected ? (
        <>
        <div className='app'>
            <div className='main'>       
            <NavBar />
                    <div className='routes'>
                        <Routes>
                            <Route exact path="/" element={<Homepage />} />
                            <Route exact path="/cryptocurrencies" element={<Cryptocurrencies/>}/>
                            <Route exact path="/news" element={<News />} />
                        </Routes>
                    </div>
                    <FontAwesomeIcon icon="fa-brands fa-twitter" />

                {/* <div className='footer'>
                    <Title level={5} style={{color:'white', textAlign: 'center'}}>
                        FatRat Portal <br />
                        Discord <br />
                        Twitter <br />
                    </Title>
                    <Space>
                        <Link to="/">Home</Link>
                        <Link to="/cr">News</Link>
                    </Space>
                </div> */}
                <div className="routes">
                    
                    {/* <NavBar /> */}
                    <div className='main-content'>
                        <InvestmentContext.Provider value={{cards, setCards}}>            
                        <Routes>
                            <Route element={<InvestmentStrategy />}  exact path="/strategies" />
                            <Route 
                                exact path="/add"
                                element = {<AddInvestment />}
                            />
                            <Route element = {<EditInvestment /> } path="/edit/:id" />
                            <Route component={() => <Navigate to="/" />} />
                        </Routes>
                        </InvestmentContext.Provider>
                    </div>
                </div>

            </div>
        </div>
        </>) : (
            <Button>Connect Wallet</Button>
        )}     
    </div>

    )

}
export default App
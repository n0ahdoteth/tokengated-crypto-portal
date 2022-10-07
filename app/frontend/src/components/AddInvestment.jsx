import {useEffect, useContext} from 'react'
import InvestmentForm from './InvestmentForm'
import { useNavigate } from 'react-router-dom';
import InvestmentContext from '../context/InvestmentContext';

const AddInvestment = () => {
  const {cards, setCards} = useContext(InvestmentContext);
  const navigate = useNavigate();

  const handleOnSubmit = (card) => {
    setCards([card, ...cards]);
    navigate('/strategies');
    console.log(card)
  };

  useEffect(()=>{
    console.log(cards)
  },[])

  return (
    <>
        <InvestmentForm handleOnSubmit={handleOnSubmit}/>
    </>
  )
}

export default AddInvestment
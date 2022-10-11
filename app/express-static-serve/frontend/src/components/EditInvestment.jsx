import React, { useContext } from 'react';
import InvestmentForm from './InvestmentForm';
import { useParams, useNavigate } from 'react-router-dom';
import InvestmentContext from '../context/InvestmentContext';

const EditInvestment = () => {
	const { cards, setCards } = useContext(InvestmentContext);
	const { id } = useParams();
	const navigate = useNavigate();
	const cardToEdit = cards.find((card) => card.id === id);

	const handleOnSubmit = (card) => {
		const filteredCards = cards.filter((card) => card.id !== id);
		setCards([card, ...filteredCards]);
		navigate('/strategies');
	};

	return (
		<div>
			<InvestmentForm card={cardToEdit} handleOnSubmit={handleOnSubmit} />
		</div>
	);
};

export default EditInvestment;

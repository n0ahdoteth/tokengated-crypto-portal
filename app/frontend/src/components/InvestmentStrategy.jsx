import React, { useContext } from 'react';
import _ from 'lodash';
import Investment from './Investment';
import InvestmentContext from '../context/InvestmentContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import InvestmentHeader from './InvestmentHeader';

const InvestmentStrategy = () => {
	const { cards, setCards } = useContext(InvestmentContext);
	const handleRemoveInvestment = (id) => {
		setCards(cards.filter((card) => card.id !== id));
	};

	return (
		<>
			<InvestmentHeader />

			<div
				className='d-grid gap-5'
				style={{ gridTemplateColumns: 'repeat(auto-fill, 16rem)' }}
			>
				{!_.isEmpty(cards) ? (
					cards.map((card) => (
						<Investment
							key={card.id}
							{...card}
							handleRemoveInvestment={handleRemoveInvestment}
						/>
					))
				) : (
					<p className='message'>Add em</p>
				)}
			</div>
		</>
	);
};

export default InvestmentStrategy;

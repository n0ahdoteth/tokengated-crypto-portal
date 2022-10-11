import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const InvestmentForm = (props) => {
	const [card, setCard] = useState(() => {
		return {
			date: props.card ? props.card.date : '',
			description: props.card ? props.card.description : '',
			discordLink: props.card ? props.card.discordLink : '',
			strategy: props.card ? props.card.strategy : '',
			title: props.card ? props.card.title : '',
			twitterLink: props.card ? props.card.twitterLink : '',
		};
	});

	const [errorMsg, setErrorMsg] = useState('');
	const { date, description, discordLink, strategy, title, twitterLink } = card;
	const handleOnSubmit = (e) => {
		e.preventDefault();
		const card = {
			id: uuidv4(),
			date,
			description,
			title,
			discordLink,
			twitterLink,
			strategy,
		};
		props.handleOnSubmit(card);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setCard((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	return (
		<div className='main-form'>
			{errorMsg && <p className='errorMsg'>{errorMsg}</p>}
			<Form onSubmit={handleOnSubmit}>
				<Form.Group controlId='title'>
					<Form.Label>NFT Collection Name</Form.Label>
					<Form.Control
						className='input-control'
						type='text'
						name='title'
						value={card.title}
						placeholder='Enter name of the NFT collection'
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Form.Group controlId='date'>
					<Form.Label>Release Date</Form.Label>
					<Form.Control
						className='input-control'
						type='date'
						name='date'
						value={card.date}
						placeholder='Enter Release Date'
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Form.Group controlId='description'>
					<Form.Label>Short Description</Form.Label>
					<Form.Control
						className='input-control'
						type='text'
						name='description'
						value={card.description}
						placeholder='TLDR of the collection'
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Form.Group controlId='discordLink'>
					<Form.Label>Discord Link</Form.Label>
					<Form.Control
						className='input-control'
						type='text'
						name='discordLink'
						value={discordLink}
						placeholder='Discord Link'
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Form.Group controlId='twitterLink'>
					<Form.Label>Twitter Link</Form.Label>
					<Form.Control
						className='input-control'
						type='text'
						name='twitterLink'
						value={twitterLink}
						placeholder='Twitter Link'
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Form.Group controlId='strategy'>
					<Form.Label>Fat Rat Strategy</Form.Label>
					<Form.Control
						className='input-control'
						type='text'
						name='strategy'
						value={strategy}
						placeholder='FatRat Deployment Strategy'
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Button variant='primary' type='submit' className='submit-button'>
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default InvestmentForm;

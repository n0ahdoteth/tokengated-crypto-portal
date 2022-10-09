import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Table } from 'react-bootstrap';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Audio } from 'react-loader-spinner';
import { Typography, Col, Input, Row } from 'antd';

const Cryptocurrencies = ({ simplified }) => {
	const count = simplified ? 12 : 100;
	const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
	const [cryptos, setCryptos] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const { Title } = Typography;
	console.log(cryptosList);

	useEffect(() => {
		const filteredData = cryptosList?.data?.coins.filter((coin) =>
			coin.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setCryptos(filteredData);
	}, [cryptosList, searchTerm]);

	if (isFetching)
		return (
			<div className="audio-div">
				<Audio />
			</div>
		);

	return (
		<>
			{!simplified && (
				<div className='search-crypto'>
					<Title
						level={2}
						className='heading'
					>
						Top 100 Coins
					</Title>
					<Input
						placeholder='Search for a Coin'
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			)}

			<div className='table-style'>
				<Table bordered hover size='sm' variant='dark'>
					<thead>
						<tr>
							<th>#</th>
							<th>Coin</th>
							<th>Price</th>
							<th>24h%</th>
							<th>Market Cap</th>
						</tr>
					</thead>
					<tbody>
						{cryptos?.map((currency) => (
							<tr>
								{console.log(currency.iconUrl)}
								<td>{currency.rank}</td>
								<td>
									<img
										className='crypto-image'
										style={{ width: '30px', maxHeight: '30px' }}
										src={currency.iconUrl}
									/>{' '}
									<strong>{currency.name}</strong>{' '}
								</td>
								<td>${Math.round(currency.price * 100) / 100}</td>
								{Math.round(currency.change * 100) / 100 >= 0 ? (
									<td style={{ color: 'green' }}>
										{Math.round(currency.change * 100) / 100}%
									</td>
								) : (
									<td style={{ color: 'red' }}>
										{Math.round(currency.change * 100) / 100}%
									</td>
								)}
								<td>${millify(currency.marketCap)}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		</>
	);
};

export default Cryptocurrencies;

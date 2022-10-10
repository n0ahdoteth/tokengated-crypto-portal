import React from 'react';
import millify from 'millify';
import { Typography, Statistic, Row } from 'antd';
import { Button, Center } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News } from '../components';
import { Audio } from 'react-loader-spinner';
import InvestmentHeader from './InvestmentHeader';

const { Title } = Typography;

const Homepage = () => {
	const { data, isFetching } = useGetCryptosQuery(10);
	const globalStats = data?.data?.stats;
	if (isFetching)
		return (
			<div className="audio-div">
				<Audio />
			</div>
		);

	return (
		<>
			<Title
				level={2}
				className='heading'
				style={{ textAlign: 'center', color: '#0071bd', marginTop: '3%' }}
			>
				Global Crypto Stats
			</Title>
			<Row id='stats'>
				<Statistic
					style={{
						display: 'block',
						marginLeft: 'auto',
						color: '#0071bd',
						padding: '20px',
					}}
					value={`MC: $${millify(globalStats.totalMarketCap)}`}
				/>
				<Statistic
					style={{
						display: 'block',
						marginRight: 'auto',
						color: '#0071bd',
						padding: '20px',
					}}
					value={`Daily Vol: $${millify(globalStats.total24hVolume)}`}
				/>
			</Row>

			<div className='home-heading-container'>
				<Title level={2} className='home-title' style={{ color: '#0071bd' }}>
					Top Coins
				</Title>
				<Title level={3} className='show-more' style={{ color: '#0071bd' }}>
					<Link to='/cryptocurrencies'>Show More</Link>
				</Title>
			</div>
			<Cryptocurrencies simplified />
			<div className='home-heading-container'>
				<Title level={2} className='home-title' style={{ color: '#0071bd' }}>
					Latest News
				</Title>
				<Title level={3} className='show-more'>
					<Link to='/news'>Show More</Link>
				</Title>
			</div>
			<News simplified />
			<InvestmentHeader />
		</>
	);
};
export default Homepage;

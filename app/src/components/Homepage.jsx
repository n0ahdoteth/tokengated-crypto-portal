import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Typography, Statistic, Row } from 'antd';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News } from '../components';
import { Audio } from 'react-loader-spinner';
import InvestmentHeader from './InvestmentHeader';
import Web3 from 'web3';

const { Title } = Typography;

const Homepage = () => {
	const { data, isFetching } = useGetCryptosQuery(10);
	const globalStats = data?.data?.stats;
	const [auth, setAuth] = useState(false);
	// const [currentAccount, setCurrentAccount] = useState('');
	// const shortenedAddress =
	// 	currentAccount.slice(0, 5) + '...' + currentAccount.slice(35, 40);
	// const { ethereum } = window;

	// useEffect(() => {}, [currentAccount]);

	if (isFetching)
		return (
			<div className='audio-div'>
				<Audio />
			</div>
		);

	const web3 = new Web3(window.ethereum);

	// const revealMsg = async () => {
	// 	let signature = await web3.eth.personal.sign(
	// 		'Sign to verify that you own a Fat Rat',
	// 		currentAccount
	// 	);
	// 	let res = await fetch('/secret?signature=' + signature);
	// 	let body = await res.text();
	// 	let isTrueSet = body === 'true';
	// 	console.log(isTrueSet);
	// 	setAuth(isTrueSet);
	// };

	// const connectWallet = async () => {
	// 	try {
	// 		if (!ethereum) {
	// 			alert('Get MetaMask!');
	// 			return;
	// 		}
	// 		const accounts = await ethereum.request({
	// 			method: 'eth_requestAccounts',
	// 		});
	// 		setCurrentAccount(accounts[0]);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	return (
		<>
			{/* {currentAccount === '' ? (
				<Button onClick={connectWallet} id='connect-wallet-button'>
					Connect Wallet
				</Button>
			) : (
				<>
					<Button id='connect-wallet-button' style={{ color: '#78e861' }}>
						{shortenedAddress}
					</Button>
					<Button onClick={revealMsg}>Verify Assets</Button>
				</>
			)} */}

			
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
						<Title
							level={2}
							className='home-title'
							style={{ color: '#0071bd' }}
						>
							Top Coins
						</Title>
						<Title level={3} className='show-more' style={{ color: '#0071bd' }}>
							<Link to='/cryptocurrencies'>Show More</Link>
						</Title>
					</div>
					<Cryptocurrencies simplified />
					<div className='home-heading-container'>
						<Title
							level={2}
							className='home-title'
							style={{ color: '#0071bd' }}
						>
							Latest News
						</Title>
						<Title level={3} className='show-more'>
							<Link to='/news'>Show More</Link>
						</Title>
					</div>
					<News simplified />
					<InvestmentHeader />
				</>
		
		</>
	);
};
export default Homepage;

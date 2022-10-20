import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Button, Card, Col } from 'react-bootstrap';
import {
	NavBar,
	Homepage,
	Cryptocurrencies,
	News,
	AddInvestment,
	EditInvestment,
	InvestmentStrategy,
} from './components';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'font-awesome/css/font-awesome.min.css';
import useLocalStorage from './hooks/useLocalStorage';
import InvestmentContext from './context/InvestmentContext';
import Web3 from 'web3';

const App = () => {
	const [cards, setCards] = useLocalStorage('cards', []);
	const [auth, setAuth] = useState(false);
	const [currentAccount, setCurrentAccount] = useState('');
	const shortenedAddress =
		currentAccount.slice(0, 5) + '...' + currentAccount.slice(35, 40);
	const { ethereum } = window;
	const [owns, setOwns] = useState('');

	document.body.style = 'background: #1d113d;';
	const web3 = new Web3(window.ethereum);

	const revealMsg = async () => {
		let signature = await web3.eth.personal.sign(
			'Sign to verify that you own a Fat Rat',
			currentAccount
		);
		let res = await fetch('/secret?signature=' + signature);
		let body = await res.text();
		let isTrueSet = body === 'true';
		console.log(isTrueSet);
		console.log(body);
		setAuth(isTrueSet);
		if (!isTrueSet) setOwns('You do not own one');
	};

	const connectWallet = async () => {
		try {
			if (!ethereum) {
				alert('Get MetaMask!');
				return;
			}
			const accounts = await ethereum.request({
				method: 'eth_requestAccounts',
			});
			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='app-bg'>
			<div className='app'>
				<div className='main'>
					{currentAccount === '' ? (
						<Button
							onClick={connectWallet}
							id='connect-wallet-button'
						>
							Connect Wallet
						</Button>
					) : (
						<>
							<Button
								id='connect-wallet-button'
								style={{ color: '#78e861' }}
							>
								{shortenedAddress}
							</Button>
							<Button onClick={revealMsg}>Verify Assets</Button>
						</>
					)}

					{auth ? (
						<div>
							<NavBar auth={auth} />
							<div className='routes'>
								<Routes>
									<Route
										exact
										path='/'
										element={<Homepage auth={auth} />}
									/>
									<Route
										exact
										path='/cryptocurrencies'
										element={
											<Cryptocurrencies auth={auth} />
										}
									/>
									<Route
										exact
										path='/news'
										element={<News />}
									/>
								</Routes>
							</div>
							<FontAwesomeIcon icon='fa-brands fa-twitter' />

							<div className='routes'>
								<div className='main-content'>
									<InvestmentContext.Provider
										value={{ cards, setCards }}
									>
										<Routes>
											<Route
												element={
													<InvestmentStrategy
														auth={auth}
													/>
												}
												exact
												path='/strategies'
											/>
											<Route
												exact
												path='/add'
												element={
													<AddInvestment
														auth={auth}
													/>
												}
											/>
											<Route
												element={
													<EditInvestment
														auth={auth}
													/>
												}
												path='/edit/:id'
											/>
											<Route
												component={() => (
													<Navigate to='/' />
												)}
											/>
										</Routes>
									</InvestmentContext.Provider>
								</div>
							</div>
						</div>
					) : (
						<>
							<p style={{ color: 'white' }}>
								You must be holding a Fat Rat NFT to access the
								site. Please connect and verify.
							</p>
							<p style={{ color: 'white' }}>{owns}</p>
						</>
					)}
				</div>
			</div>
		</div>
	);
};
export default App;

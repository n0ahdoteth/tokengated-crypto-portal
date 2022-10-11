import { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../images/fatrat.png';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

const NavBar = () => {
	const [currentAccount, setCurrentAccount] = useState('');
	const shortenedAddress =
		currentAccount.slice(0, 5) + '...' + currentAccount.slice(35, 40);
    const [isOnGoerli, setIsOnGoerli] = useState()
	const { ethereum } = window;

    useEffect(() => {}, [currentAccount])

	const changeNetwork = async () => {
		try {
			if (!ethereum) throw new Error('No crypto wallet found');
			await ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [
					{
						chainId: Web3.utils.toHex(5),
					},
				],
			});
		} catch (error) {
			console.log(error);
		}
	};

	const seeNetwork = async () => {
		const provider = await detectEthereumProvider();
		const chainIdTest = await provider.request({ method: 'eth_chainId' });
		if (chainIdTest == 5) {
			setIsOnGoerli(true);
		} else {
			setIsOnGoerli(false);
		}
	};

    const web3 = new Web3(window.ethereum);


    const revealMsg = async () => {
        let signature = await web3.eth.personal.sign("Sign to verify that you own a Fat Rat", currentAccount);
        let res = await fetch('/secret?signature=' + signature);
        let body = await res.text();
        console.log(body);
    }

	const connectWallet = async () => {
		try {
			if (!ethereum) {
				alert('Get MetaMask!');
				seeNetwork();
				return;
			}
			const accounts = await ethereum.request({
				method: 'eth_requestAccounts',
			});
			setCurrentAccount(accounts[0]);
			seeNetwork();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Navbar bg='black' expand='lg' variant='dark'>
			<Container>
				<Nav.Item>
					<Link to='/' className='link-title'>
						<img src={logo} style={{ width: '65px' }} />
					</Link>
				</Nav.Item>
				<Navbar.Toggle bg='light' aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='m-auto'>
						<Link to='/strategies' className='link-styling'>
							Group Strategy/Calendar
						</Link>
						<Link to='/cryptocurrencies' className='link-styling'>
							Cryptocurrencies
						</Link>
						<Link to='/news' className='link-styling'>
							News
						</Link>

						{currentAccount === '' ? (
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
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
export default NavBar;

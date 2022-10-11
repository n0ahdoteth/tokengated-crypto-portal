import { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../images/fatrat.png';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

const NavBar = () => {
	

	

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

						
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
export default NavBar;

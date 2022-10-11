const express = require('express');
const app = express();
const path = require('path');
const Web3 = require('web3');
const port = 4000;
const web3 = new Web3(
	'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
);
const cors = require('cors');

app.use(cors());

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static('public'));

app.get('/secret', async (req, res) => {
	let address = await web3.eth.accounts.recover(
		'Sign to verify that you own a Fat Rat',
		req.query.signature
	);
	let balance = Number(
		await contract.methods.balanceOf(address, 0).call()
	);
	console.log('Balance is ', balance);
});

app.listen(port, () => {
	console.log(`server started on port ${port}`);
});

const ABI = require('./abi.json');
const ADDRESS = '0x0158A3AA1fAdeDec8a770f9D372EBeDdcE705e35';
let contract = new web3.eth.Contract(ABI, ADDRESS);

require('@nomicfoundation/hardhat-toolbox');
require('@nomiclabs/hardhat-etherscan');
require('@nomiclabs/hardhat-waffle');

require('@nomiclabs/hardhat-ethers');

// require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

module.exports = {
	solidity: '0.8.17',
	networks: {
		goerli: {
			url: process.env.QUICKNODE_API_KEY_URL,
			accounts: [process.env.GOERLI_PRIVATE_KEY]
		},
	},
	etherscan: {
		apiKey: process.env.ETHERSCAN_API_KEY
	},
};

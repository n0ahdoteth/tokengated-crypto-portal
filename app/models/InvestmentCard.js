const mongoose = require('mongoose');

const investmentCardSchema = new mongoose.Schema({
	content: {
		type: String,
		description: String,
		discordLink: String,
		strategy: String,
		title: String,
		twitterLink: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('InvestmentCard', investmentCardSchema);

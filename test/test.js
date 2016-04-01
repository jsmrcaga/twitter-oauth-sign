var ts  = require("../main.js");
var chai = require('chai');

describe("Twitter Signature", function(){
	it('Should be Equal to Twitter example at: https://dev.twitter.com/oauth/overview/creating-signatures', function(){
		var final = 'tnnArxj06cWHq44gCs1OSKk/jLY=';
		var method = 'POST';
		var url = "https://api.twitter.com/1/statuses/update.json";
		var params = {
			include_entities: true,
			oauth_consumer_key: 'xvz1evFS4wEEPTGEFPHBog',
			oauth_nonce: 'kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg',
			oauth_signature_method: 'HMAC-SHA1',
			oauth_timestamp: 1318622958,
			oauth_token: '370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb',
			oauth_version: '1.0',
			status: 'Hello Ladies + Gentlemen, a signed OAuth request!'
		};

		var keys = {
			consumer_secret: 'kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw',
			oauth_token: 'LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE'
		};

		chai.expect(ts.sign(method, url, params, keys)).to.be.equal(final);
	});
});
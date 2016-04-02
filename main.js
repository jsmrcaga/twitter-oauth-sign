var Crypto = require('crypto');
var percent_encode = require('oauth-percent-encode');
var querystring = require('querystring');

var config = {
	required_params: ['oauth_consumer_key', 'oauth_nonce', 'oauth_timestamp', 'oauth_token'],
	oauth_signature_method: 'HMAC-SHA1',
	oauth_version: '1.0'
};

var sign = function _twitterSign(method, url, params, keys) {
	if(arguments.length < 4){
		throw new Error("Only " + arguments.length + " arguments provided, 4 needed.");
	}


	var simple_url = url.split("?")[0];
	var url_params = querystring.parse(url.split("?")[1]);
	for(var p in url_params){
		params[p] = url_params[p];
	}

	var output = method.toUpperCase() + "&" + percent_encode(simple_url) + "&";

	if(!('consumer_secret' in keys)) throw new Error("Consumer secret is needed");

	params = Object.twitter_sign_sort(params);

	var parameter_string = "";
	for(var k in params){
		parameter_string += percent_encode(k)+"="+percent_encode(params[k].toString()) + "&";
	}

	output += percent_encode(parameter_string.slice(0,-1));
	console.log("Generated output to sign:", output);

	var signing_key = keys.consumer_secret + "&" + (keys.oauth_token || "");
	//console.log("Generated signing key:", signing_key);

	// TODO HMAC-SHA1
	var signed = Crypto.createHmac('sha1', signing_key).update(output).digest().toString('base64');

	return signed;
};

var noncegen = function(size){
	var nonce = "";
	for(var i = 0; i < size; i++){
		var rnd = Math.floor(Math.random()*3);
		switch(rnd){
			case 0:
				var rnd  = Math.floor(Math.random() * (90 - 65) + 65);
				nonce += String.fromCharCode(rnd);
				break;
			case 1:
				var rnd  = Math.floor(Math.random() * 9);
				nonce += rnd.toString();
				break;
			case 2:
				var rnd  = Math.floor(Math.random() * (122 - 97) + 97);
				nonce += String.fromCharCode(rnd);
				break;
		}
	}
	return nonce;
};

module.exports = {
	sign: sign,
	generateNonce: noncegen
};

Object.defineProperty(Object, "twitter_sign_sort", {
	enumerable: false,
	value: function(obj){
		var sortedKeys = Object.keys(obj).sort();
		var result = {};
		sortedKeys.forEach(function(key){
			result[key] = obj[key];
		});

		return result;
	}
});
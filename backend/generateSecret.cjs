const crypto = require('crypto');

// Generate a secure 32-byte secret key and convert to hex string
const secretKey = crypto.randomBytes(32).toString('hex');

console.log('Generated Secret Key:', secretKey);

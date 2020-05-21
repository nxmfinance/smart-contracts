const abi = require('ethereumjs-abi');
const { toHex } = require('./ethTools');

function encode (...args) {

  const signature = args[0];
  const params = args.slice(1);

  const datatypes = signature
    .substring(0, signature.length - 1)
    .split('(')[1]
    .split(',');

  for (let i = 0; i < datatypes.length; i++) {
    if (datatypes[i].includes('byte')) {
      if (!params[i].startsWith('0x')) {
        params[i] = toHex(params[i]);
        args[i + 1] = params[i];
      }
    }
  }

  const encoded = abi.simpleEncode.apply(this, args).toString('hex');

  return '0x' + encoded;
}

module.exports = { encode };
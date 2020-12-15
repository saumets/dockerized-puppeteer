const lookup = require('dns').lookup;
const promisify = require('util').promisify;

const dnsLookup = promisify(lookup);

module.exports = async (containerName) => {
  try {
    const { address } = await dnsLookup(containerName);
    return address;
  }
  catch (error) {
    console.error(error);
  }
};

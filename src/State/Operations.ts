import axios from 'axios';

export default class Operations {
  contractAddress = 'tz1hpJydx7Y3vAcQSuXM449SH8J3cgXhC5bX';

  getOperations = async () => {
    const url = `https://api.ithacanet.tzkt.io/v1/accounts/${this.contractAddress}/operations?type=origination%2Ctransaction%2Creveal&limit=40&sort=1&quote=usd`;

    const operations = await axios.get(url).catch(function (error) {
      console.log('pin_error: ', error);
    });

    if (operations) {
      const filteredOperations = [];
      operations.data.forEach((op) => {
        if (op && op.parameter) {
          filteredOperations.push(op.parameter.value);
        }
      });

      return filteredOperations;
    }
  };
}

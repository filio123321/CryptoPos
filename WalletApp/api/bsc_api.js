import axios from "axios";
import Web3 from "web3";

export const getAddressBalanceBNB = (address) => {
  const url = `https://api.bscscan.com/api?module=account&action=balance&address=${address}&apikey=KU2R2B8SZ7GW3QKRWCIWGZDS13UX16XC9T`;

  return fetch(url)
    .then((response) => response.json())
    .then((json) => {
      // console.log(json.result);
      return json.result;
    })
    .catch((error) => {
      console.error(error);
      return 0;
    });
};

export const getAddressBalanceETH = (address) => {
  const url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=QDD2GKAHRKWYF2ITZ6PBYRRRUBMB49652Y`;

  return fetch(url)
    .then((response) => response.json())
    .then((json) => {
      return json.result;
    })
    .catch((error) => {
      console.error(error);
      return 0;
    });
};

export const getAddressBalanceBTC = (address) => {
  const url = `https://blockchain.info/balance?active=${address}`;

  return fetch(url)
    .then((response) => response.json())
    .then((json) => {
      const balance = json[address].final_balance;
      return balance;
    })
    .catch((error) => {
      console.error(error);
      return 0;
    });
};

export const bnbTousd = async (bnb) => {
  try {
    const url = `https://api.coincap.io/v2/assets/binance-coin`;
    const response = await axios.get(url);
    return response.data.data.priceUsd * bnb;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const btcTousd = async (btc) => {
  try {
    const url = `https://api.coincap.io/v2/assets/bitcoin`;
    const response = await axios.get(url);
    return response.data.data.priceUsd * btc;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const ethTousd = async (eth) => {
  try {
    const url = `https://api.coincap.io/v2/assets/ethereum`;
    const response = await axios.get(url);
    console.log(response.data.data.priceUsd * eth);
    return response.data.data.priceUsd * eth;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const usdToBnb = async (usdAmount) => {
  try {
    const bnbPrice = await bnbTousd(1);
    return usdAmount / bnbPrice;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const usdToEth = async (usdAmount) => {
  try {
    const ethPrice = await ethTousd(1);
    return usdAmount / ethPrice;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const usdToBtc = async (usdAmount) => {
  try {
    const btcPrice = await btcTousd(1);
    return usdAmount / btcPrice;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const BNBTransaction = async (
  senderAddress,
  privateKey,
  recipientAddress,
  amountToSend
) => {
  const Web3 = require("web3");

  const sendBNBTransaction = async (
    senderAddress,
    privateKey,
    recipientAddress,
    amountToSend
  ) => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org:443")
    );
    const amountInWei = web3.utils.toWei(amountToSend, "ether");
    console.log("amountInWei", amountInWei);

    try {
      const gasPrice = await web3.eth.getGasPrice();
      const nonce = await web3.eth.getTransactionCount(senderAddress);
      const gasLimit = 21000;

      const transactionObject = {
        from: senderAddress,
        to: recipientAddress,
        value: amountInWei,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        nonce: nonce,
      };
      console.log(transactionObject);
      const signedTransaction = await web3.eth.accounts.signTransaction(
        transactionObject,
        privateKey
      );
      console.log(signedTransaction);

      const transactionReceipt = await web3.eth.sendSignedTransaction(
        signedTransaction.rawTransaction
      );

      console.log(
        `Transaction sent with hash: ${transactionReceipt.transactionHash}`
      );
      return true;
    } catch (error) {
      console.log(`Error sending transaction: ${error}`);
      return false;
    }
  };
  const result = sendBNBTransaction(
    senderAddress,
    privateKey,
    recipientAddress,
    amountToSend
  );
  console.log(result);
  return result;
};

export const ChekcValid = (address, privateKey) => {
  const web3 = new Web3("https://bsc-dataseed.binance.org");
  let checkWallet = false;
  let checkKey = false;

  if (web3.utils.isAddress(address)) {
    checkWallet = true;
  } else {
    checkWallet = false;
  }

  try {
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    checkKey = true;
  } catch (error) {
    checkKey = false;
  }
  if (checkWallet && checkKey) {
    return true;
  } else {
    console.log(checkWallet, checkKey);
    return false;
  }
};

export const ETHTransaction = async (
  senderAddress,
  privateKey,
  recipientAddress,
  amount
) => {
  try {
    const Web3 = require("web3");
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://mainnet.infura.io/v3/85776a4fb53a4145936b4847edcf5d51"
      )
    );

    const senderNonce = await web3.eth.getTransactionCount(senderAddress);

    const amountToSend = web3.utils.toWei(amount.toString(), "ether");

    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 21000;

    const txObject = {
      nonce: web3.utils.toHex(senderNonce),
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(gasLimit),
      to: recipientAddress,
      value: web3.utils.toHex(amountToSend),
      data: "",
    };

    const signedTx = await web3.eth.accounts.signTransaction(
      txObject,
      privateKey
    );

    const txReceipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    console.log(`Transaction hash: ${txReceipt.transactionHash}`);
    return true;
  } catch (e) {
    console.log(`Error ${e}`);
    return false;
  }
};

export const generateEthAddress = () => {
  const url = "http://192.168.200.61:3000/getEth";
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => console.error(error));
};

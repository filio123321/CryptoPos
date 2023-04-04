import axios from "axios";

export const getAddressBalance = (address) => {
  const url = `https://api.bscscan.com/api?module=account&action=balance&address=${address}&apikey=KU2R2B8SZ7GW3QKRWCIWGZDS13UX16XC9T`;

  return fetch(url)
    .then((response) => response.json())
    .then((json) => {
      // console.log(json.result);
      return json.result;
    })
    .catch((error) => {
      console.error(error);
      throw error;
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
    console.log(response.data.data.priceUsd * btc);
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

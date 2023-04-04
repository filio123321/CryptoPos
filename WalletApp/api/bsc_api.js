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

export const usdToBnb = async (usdAmount) => {
  try {
    const bnbPrice = await bnbTousd(1);
    return usdAmount / bnbPrice;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// use bscscan api to get data
// import axios from 'axios'
// api key KU2R2B8SZ7GW3QKRWCIWGZDS13UX16XC9T
// import axios 




export const getAddressBalance = (address) => {
    const url = `https://api.bscscan.com/api?module=account&action=balance&address=${address}&apikey=KU2R2B8SZ7GW3QKRWCIWGZDS13UX16XC9T`;
  
    return fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json.result);
        return json.result;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  };


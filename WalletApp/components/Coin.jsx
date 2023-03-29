import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { cryptoSymbol } from 'crypto-symbol'
import { useState, useEffect } from 'react';
import { VictoryLine } from "victory-native";


const { nameLookup } = cryptoSymbol({})


const Coin = (props) => {
  const [chartData, setChartData] = useState([{x: 0, y: 0}]);
  const [coinPrice, setCoinPrice] = useState('...');
  const [changePrice, setChangePrice] = useState(0);
  const [changePriceColor, setChangePriceColor] = useState('#fff');

  const API_URL = 'https://finnhub.io/api/v1/crypto/candle';
  const API_TOKEN = 'cghtaphr01qr8eo2n8ogcghtaphr01qr8eo2n8p0';
  const SYMBOL = `BINANCE:${props.symbol.toUpperCase()}USDT`;
  const RESOLUTION = '60';

  const iconUrl = `https://cryptoicons.org/api/color/${props.symbol.toLowerCase()}/600/`


  const widthWithoutImage = '100% - 60'

  const getCoinPrice = () => {
    // const url = "https://api.coinconvert.net/convert/btc/usd?amount=1"
    const url = "https://api.coinconvert.net/convert/" + props.symbol + "/usd?amount=" + props.balance
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        // console.log(json.USD)
        setCoinPrice(json.USD)
        return json
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getCoinPrice()
  }, [props.balance])
  // do that but set interval to 5 seconds

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     getCoinPrice()
  //     console.log('got price');
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const toDate = Math.floor(Date.now() / 1000); // current time in unix format
    const fromDate = toDate - (24 * 60 * 60); // 24 hours ago in unix format
    // const fromDate = toDate - (2 * 365 * 24 * 60 * 60); 

    fetch(`${API_URL}?symbol=${SYMBOL}&resolution=${RESOLUTION}&from=${fromDate}&to=${toDate}&token=${API_TOKEN}`)
      .then((response) => response.json())
      .then((data) => {
        const chartData = data.c.map((closingValue, index) => ({
          x: index + 1,
          y: closingValue,
        }));
        setChartData(chartData);

      // get first and last closing price
      const firstClosingPrice = chartData[0].y;
      const lastClosingPrice = chartData[chartData.length - 1].y;
      const changePrice = ((lastClosingPrice - firstClosingPrice) / firstClosingPrice * 100).toFixed(2);
      setChangePrice(changePrice);
      if (changePrice > 0) {
        setChangePriceColor('#00FF00');
      } else if (changePrice < 0) {
        setChangePriceColor('#FF0000');
      }
      })

      // get first and last closing price
      // .then(() => {
      //   const firstClosingPrice = chartData[0].y;
      //   const lastClosingPrice = chartData[chartData.length - 1].y;
      //   const changePrice = ((lastClosingPrice - firstClosingPrice) / firstClosingPrice * 100).toFixed(2);
      //   setChangePrice(changePrice);
      //   if (changePrice > 0) {
      //     setChangePriceColor('#00FF00');
      //   } else if (changePrice < 0) {
      //     setChangePriceColor('#FF0000');
      //   }
      // })
      .catch((error) => {
        console.error(error);
      });
  }, []);



  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: iconUrl }} style={styles.icon} />

      <View style={styles.TextsWrapper}>

        {/* this is in the left end */}
        <View style={styles.NamesWrapper}>
          <Text style={styles.nameText}>{nameLookup(props.symbol)}</Text>
          {/* <Text style={styles.symbolText}>{props.symbol.toUpperCase()}</Text> */}
          {/* <Text style={styles.symbolText}>{changePrice}%</Text> */}
          {/* place a + or - depending on the changeprice */}
          <Text style={[styles.symbolText, {color: changePriceColor}]}>{changePrice > 0 ? "+" : null }{changePrice}%</Text>
        </View>

        <View style={styles.ChartWrapper}>
          <VictoryLine
            data={chartData}
            interpolation="natural"
            width={100}
            height={50}
            padding={{ top: 0, bottom: 0, left: 0, right: 0 }}
            animate={{
              duration: 4000,
              onLoad: { duration: 2000 }
            }}
            style={{
              data: { stroke: "#9D00FF"},
              parent: { border: "1px solid #9D00FF"}
            }}
          />
        </View>

        

        {/* this is in the right end */}
        <View style={styles.BalanceWrapper}>
          {/* <Text style={styles.BalanceTextUsd}>{props.balance}</Text>  */}
          {/* <Text style={styles.BalanceTextUsd}>{getCoinPrice()}</Text> */}
          <Text style={styles.BalanceTextUsd}>{coinPrice === "..." ? "..." : coinPrice.toFixed(2)}</Text>
          <Text style={styles.BalanceText}>{props.balance}</Text>
        </View>

      </View>
      

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
container: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        padding: 10,
        // backgroundColor: '#595760', // convert to rgba
        backgroundColor: 'rgba(89, 87, 96, 0.2)',


        borderRadius: 20,
        width: '95%',
        margin: 2.5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
},
  icon: {
    width: 60,
    height: 60, 
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  symbolText: {
    fontSize: 14,
    // color: '#fff',
    // slighty gray
    // color: '#D3D3D3'
    opacity: 0.7,
  },
  NamesWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  TextsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  BalanceWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: 170,
  },  
  BalanceText: {
    fontSize: 14,
    color: '#D3D3D3'

  },
  BalanceTextUsd: {
    fontSize: 20,
    // color: '#fff',
    // slighty gray
    fontWeight: 'bold',
    color: '#fff',
  },
  ChartWrapper: {
    width: "1%"
  }



});

export default Coin;




// cghtaphr01qr8eo2n8ogcghtaphr01qr8eo2n8p0

/*

https://finnhub.io/api/v1/crypto/candle?
symbol=BINANCE:BTCUSDT
&resolution=D
&from=1572651390
&to=1575243390
&token=cghtaphr01qr8eo2n8ogcghtaphr01qr8eo2n8p0

*/
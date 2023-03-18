import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { cryptoSymbol } from 'crypto-symbol'

const { nameLookup } = cryptoSymbol({})

const Coin = (props) => {

  const iconUrl = `https://cryptoicons.org/api/color/${props.symbol.toLowerCase()}/600/`


  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: iconUrl }} style={styles.icon} />

      <View style={styles.TextsWrapper}>
        {/* this is in the left end */}
        <View style={styles.NamesWrapper}>
          <Text style={styles.nameText}>{nameLookup(props.symbol)}</Text>
          <Text style={styles.symbolText}>{props.symbol.toUpperCase()}</Text>
        </View>

        {/* this is in the right end */}
        <View style={styles.BalanceWrapper}>
          <Text style={styles.BalanceTextUsd}>{props.balance}</Text>
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
        padding: 10,
        backgroundColor: '#595760',
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
    width: 60, // Modify the width to your desired size
    height: 60, // Modify the height to your desired size
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
    color: '#D3D3D3'
  },
  NamesWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  TextsWrapper: {
    // backgroundColor: 'purple',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },
  BalanceWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-end',
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



});

export default Coin;

import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { cryptoSymbol } from 'crypto-symbol'

const { nameLookup } = cryptoSymbol({})

const Coin = (props) => {

  const iconUrl = `https://cryptoicons.org/api/color/${props.symbol.toLowerCase()}/600/`

  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: iconUrl }} style={styles.icon} />
      <Text style={styles.name}>{nameLookup(props.symbol)}</Text>
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
});

export default Coin;

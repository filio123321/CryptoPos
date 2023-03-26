import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Feather, AntDesign, MaterialIcons } from '@expo/vector-icons';
import Coin from '../components/Coin';
import { useEffect, useState } from 'react';
import {getAddressBalance} from '.././api/bsc_api';



export default function HomeScreen() {
    const [balance, setBalance] = useState('...');
        // 0xc658595AB119817247539a000fdcF9f646bb65dc


    useEffect(() => {
        getAddressBalance('0xc658595AB119817247539a000fdcF9f646bb65dc').then((balance) => {
            console.log(balance);
            // setBalance(balance);
            setBalance(balance);
          }).catch((error) => {
            console.error(error);
          });
    }, []);



    return (
        // <View style={styles.container}>

            <ScrollView style={styles.pageWrapper}>
                
                <View style={styles.BalanceWrapper}>
                    <Text style={styles.BalanceText}>
                        {/* $12,345.<Text style={styles.BalanceTextCents}>03</Text> */}
                        {balance}
                    </Text>
                </View>

                <View style={{height: 'auto'}}>
                    <ScrollView 
                        horizontal={true} 
                        showsHorizontalScrollIndicator={false} 
                        style={styles.FunnctionalityButtonsWrapper}
                    >
                        <View style={{flexDirection: 'column', alignItems: 'center', marginHorizontal: 10}}>
                            <TouchableOpacity style={styles.FuncButton}>
                                <Feather name="arrow-down-left" size={45} color="black" />
                            </TouchableOpacity>
                            <Text style={{color: 'white',  fontSize: 15, marginTop: 5}}>Recieve</Text>
                        </View>
                        
                        <View style={{flexDirection: 'column', alignItems: 'center', marginHorizontal: 10,}}>
                            <TouchableOpacity style={styles.FuncButton}>
                                <Feather name="arrow-up-right" size={45} color="black" />
                            </TouchableOpacity>
                            <Text style={{color: 'white',  fontSize: 15, marginTop: 5}}>Send</Text>
                        </View>

                        <View style={{flexDirection: 'column', alignItems: 'center', marginHorizontal: 10,}}>
                            <TouchableOpacity style={styles.FuncButton}>
                                <AntDesign name="swap" size={45} color="black" />
                            </TouchableOpacity>
                            <Text style={{color: 'white',  fontSize: 15, marginTop: 5}}>Swap</Text>
                        </View>

                        <View style={{flexDirection: 'column', alignItems: 'center', marginHorizontal: 10,}}>
                            <TouchableOpacity style={styles.FuncButton}>
                                <Feather name="shopping-cart" size={37} color="black" />
                            </TouchableOpacity>
                            <Text style={{color: 'white',  fontSize: 15, marginTop: 5}}>Buy</Text>
                        </View>

                        <View style={{flexDirection: 'column', alignItems: 'center', marginHorizontal: 10,}}>
                            <TouchableOpacity style={styles.FuncButton}>
                                <AntDesign name="tago" size={40} color="black" />
                            </TouchableOpacity>
                            <Text style={{color: 'white',  fontSize: 15, marginTop: 5}}>Sell</Text>
                        </View>

                        <View style={{flexDirection: 'column', alignItems: 'center', marginHorizontal: 10,}}>
                            <TouchableOpacity style={styles.FuncButton}>
                                <MaterialIcons name="history" size={40} color="black" />
                            </TouchableOpacity>
                            <Text style={{color: 'white',  fontSize: 15, marginTop: 5}}>History</Text>
                        </View>

                    </ScrollView>
                </View>

                <View style={styles.MyCoinsWrpper}>
                    <View style={styles.MyCoinsTextWrapper}>
                        <Text style={styles.MyCoinsText}>My Coins</Text>

                        <TouchableOpacity>
                            <Text style={styles.SeeAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.OwnedCoinsWrapper}>
                        <Coin symbol='BTC' balance='1000.0014'/>
                        <Coin symbol='ETH' balance='900000.066'/>
                        <Coin symbol='XRP' balance='2.34621'/>
                    </View>

                
                </View>

            </ScrollView>
        // </View>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#28282B',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pageWrapper: {
        backgroundColor: 'blue',
        height: '100%',
        width: '100%',

    },
    BalanceWrapper: {
        // backgroundColor: 'purple',
        backgroundColor: '#28282B',
        // height: '100%',
        padding: 60,
        width: '100%',
        paddingTop: 50,
        alignItems: 'center',
    },
    BalanceText: {
        // text color white, bold, font 20
        color: 'white',
        fontWeight: 'bold',
        fontSize: 50,
        // font:'sebino',
    },
    BalanceTextCents: {
        // text color white, bold, font 20
        color: 'white',
        fontWeight: 'bold',
        fontSize: 40,
        // font:'sebino',
    },
    FunnctionalityButtonsWrapper: {
        // row
        flexDirection: 'row',
        // backgroundColor: 'red',
        backgroundColor: '#28282B',

    },
    FuncButton: {
        backgroundColor: 'white',
        height: 55,
        width: 55,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        // marginHorizontal: 10,
        // transperent background
        // backgroundColor: 'transparent',
        // opacity: 0.5,
        // borderWidth: 1,
    },
    FuncButtonIcon: {
        color: 'white',
        fontSize: 50,
    },
    MyCoinsWrpper: {
        // backgroundColor: 'green',
        backgroundColor: '#28282B',
        height: '100%',
        width: '100%',
        // paddingTop: 50,
        alignItems: 'center',
        paddingTop: 10,
    },
    MyCoinsTextWrapper: {
        // backgroundColor: 'purple',
        // place items on the 2 ends, row, cetntered vertically
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        // backgroundColor: 'red',
    },
    MyCoinsText: {
        // text color white, bold, font 20
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        // font:'sebino',
    },
    SeeAllText: {
        // smaller text, slightly gray
        color: '#A9A9A9',
        fontSize: 15,
        // font:'sebino',
    },
    OwnedCoinsWrapper: {
        // backgroundColor: 'red',
        backgroundColor: '#28282B',
        height: '100%',
        width: '100%',
        // paddingTop: 50,
        alignItems: 'center',
        paddingTop: 10,
    },




});

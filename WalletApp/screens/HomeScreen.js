import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Feather, AntDesign, MaterialIcons } from '@expo/vector-icons';
import Coin from '../components/Coin';
import { useEffect, useState } from 'react';
import { getAddressBalance, bnbTousd } from '.././api/bsc_api';



export default function HomeScreen() {
    const [balanceBNB, setBalanceBNB] = useState(0);
    const [balanceUSD, setBalanceUSD] = useState(0);
        // 0xc658595AB119817247539a000fdcF9f646bb65dc

        const convertBnbToUsd = async () => {
            const bnbPrice = await bnbTousd(balanceBNB); // assuming you want to convert 10 BNB to USD
            console.log("async", bnbPrice); // output the USD value of 10 BNB
          };

    useEffect(() => {
        getAddressBalance('0x260e69ab6665B9ef67b60674E265b5D21c88CB45').then((balance) => {
            console.log(balance);
            setBalanceBNB(balance / 1000000000000000000);
          }).catch((error) => {
            console.error(error);
          });
    }, []);

    useEffect(() => {
        const getBalanceUSD = async () => {
            const balance = await bnbTousd(balanceBNB); // pass in your BNB balance here
            setBalanceUSD(balance);
        }

        getBalanceUSD();
        console.log("SPLIT", balanceUSD);
    }, [balanceBNB]);


    return (
        // <View style={styles.container}>

            <ScrollView style={styles.pageWrapper}>
                
                <View style={styles.BalanceWrapper}>
                    <Text style={styles.BalanceText}>
                        $ {balanceUSD.toFixed(0)}

                        {(balanceUSD == 0 ? null : <><Text>.</Text><Text style={styles.BalanceTextCents}>{balanceUSD.toString().split('.')[1].slice(0, 2)}</Text></>)}

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
        backgroundColor: '#161616',
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
        backgroundColor: '#161616',
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
        backgroundColor: '#161616',

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
        backgroundColor: '#161616',
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
        backgroundColor: '#161616',
        height: '100%',
        width: '100%',
        // paddingTop: 50,
        alignItems: 'center',
        paddingTop: 10,
    },




});



// 28282B
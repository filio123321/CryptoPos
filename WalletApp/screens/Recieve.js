import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState, useRef } from 'react';
import PagerView from 'react-native-pager-view';
import { useFonts } from 'expo-font';
import ModalSelector from 'react-native-modal-selector';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
// import Clipboard from '@react-native-clipboard/clipboard';
import * as Clipboard from 'expo-clipboard';
import { Share } from 'react-native';
import QRCode from 'react-native-qrcode-svg';



const windowWidth = Dimensions.get("window").width;
const qrCodeHeight = windowWidth * 0.8;

const bnbPublicAddress = "0xc658595AB119817247539a000fdcF9f646bb65dc";
const btcPublicAddress = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh";
const ethPublicAddress = "0x6326cAEB1BE2C7cDb8c31e46662368C31ebaECf4";



const getBNBPublicAddress = async () => {
    try {
      const address = await SecureStore.getItemAsync('BNB_pubic');
      return address;
    } catch (error) {
      // Handle error
    }
  };
  



const Recieve = (props) => {
    const [address, setAddress] = useState('');
    const ref = useRef(PagerView);
    const navigation = useNavigation();
    const [page, setPage] = useState(0);
    // const [slectedCrypto, setSlectedCrypto] = useState(0);
    // let { crypto } = route.params;
    const [crypto, setCrypto] = useState(props.crypto);

    useEffect(() => {
        console.log("crypto", crypto);
    }, [crypto]);

    useEffect(() => {
        const fetchData = async () => {
          const address = await getBNBPublicAddress();
          setAddress(address);
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        // if address
        if (!address){
            setAddress(bnbPublicAddress);
        }
    }, []);


    

    const cryptos = [
        { key: 0, label: 'Bitcoin', crypto: 'BTC' },
        { key: 1, label: 'Ethereum', crypto: 'ETH' },
        { key: 2, label: 'BNB (Binance smart coin)', crypto: 'BNB' },
        { key: 3, label: 'Ripple', crypto: 'XRP' },
    ]


    const [fontsLoaded, error] = useFonts({
        'manjari': require('../assets/fonts/Manjari-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }


    // useEffect(() => {
    //     SecureStore.getItemAsync('BNB_pub').then((value) => {
    //         console.log("bnb", value);
    //     });
        
    // }, []);

    // useEffect(() => {
    //     if (crypto == null){
    //         const page = 0;
    //     }else{
    //         const page = 1;
    //     }
    // }, []);

    const optionChangeHandler = async (option) => {
        try {
          setCrypto(option.crypto);
          
          const value = await SecureStore.getItemAsync('BNB_pubic');
          console.log(value);
          
          // setPage(1);
        } catch (error) {
          alert(error);
        }
      }


          

    return (
        <PagerView style={styles.pagerView} initialPage={crypto ? 1 : 0} ref={ref} scrollEnabled={false} >
            <View key="0" style={styles.container}>
                {/* <Text>First page</Text> */}

                <View style={{width: "100%", height: "100%", alignItems: "center", marginTop: "70%"}}>
                    <View style={{backfaceVisibility: "hidden", borderColor: "#CA34FF", borderWidth: 3, borderRadius: 15, padding: 10, width: "80%"}}>
                        <Text style={{color: "#fff", fontSize: 20, fontWeight: "bold", fontFamily: "manjari"}}>Select coin:</Text>

                        <ModalSelector
                            data={cryptos}
                            initValue=""
                            onChange={(option)=>{ optionChangeHandler(option) }}
                            // onChange={(option)=>{ alert(`${option.label} (${option.key}) nom nom nom`) }}
                            // style={{borderRadius: 10, backgroundColor: "rgba(206, 155, 230, 0.15)", width: "100%", }}
                            selectStyle={{borderRadius: 10, backgroundColor: "rgba(206, 155, 230, 0.15)", width: "100%", borderWidth: 0,}}
                            selectTextStyle={{color: "#CA34FF", fontSize: 15, fontWeight: "bold", fontFamily: "manjari"}}
                            // cancelStyle={{backgroundColor: "#CA34FF", borderRadius: 15, padding: 10, }}
                            // cancelTextStyle={{color: "#fff", fontSize: 20, fontWeight: "bold", fontFamily: "manjari"}}
                            // optionStyle={{backgroundColor: "#CA34FF", borderRadius: 15, padding: 10, }}
                            // optionTextStyle={{color: "#fff", fontSize: 20, fontWeight: "bold", fontFamily: "manjari"}}
                            // sectionStyle={{backgroundColor: "#CA34FF", borderRadius: 15, padding: 10, }}
                            // sectionTextStyle={{color: "#fff", fontSize: 20, fontWeight: "bold", fontFamily: "manjari"}}
                        />
                    </View>

                    {/* a "ext button that is initaly gray and then turns purple after a coin is selected" */}
                    <TouchableOpacity style={crypto == null ? styles.buttonDisabled : styles.buttonEnabled} onPress={() => ref.current.setPage(1)} disabled={crypto == null}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </View>

                




            </View>
            <View key="1" style={styles.container}>

                <View style={{borderWidth: 3, borderColor: "#CA34FF", borderRadius: 15, padding: 10, width: "90%", marginTop: "10%"}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Text style={{color: "#fff", fontSize: 20, fontWeight: "bold", fontFamily: "manjari", marginBottom: 10, marginTop: 5}}>Your {crypto} address:</Text>

                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <MaterialIcons name="content-copy" size={24} color="#fff" style={{marginRight: 10}} onPress={() => Clipboard.setString(address)} />
                            <MaterialCommunityIcons name="share-outline" size={24} color="#fff" onPress={() => Share.share({message: address})} />
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => Clipboard.setString(address)}>
                        <Text style={{color: "#fff", fontSize: 20, fontWeight: "bold", fontFamily: "manjari", color: "#CA34FF"}}>{address}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.qrWrapper}>
                    <QRCode
                        value={address}
                        size={qrCodeHeight}
                        color="#161616"
                        backgroundColor="#fff"
                        // logo={require('../assets/qrlogo.png')}
                        logoSize={50}
                        logoBackgroundColor="#161616"
                    />
                </View>

                <View style={styles.warningTextWrapper}>
                    <Text style={styles.warningText}>
                        Send only {crypto} to this address, otherwise it may result in a loss. Cryptocurrency transactions are irreversible.
                    </Text>
                </View>
            </View>
        </PagerView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161616',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    pagerView: {
        flex: 1,
      },
    buttonDisabled: {
        borderRadius: 10,
        backgroundColor: "rgba(206, 155, 230, 0.15)",
        width: "80%",
        padding: 10,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonEnabled: {
        borderRadius: 10,
        backgroundColor: "#CA34FF",
        width: "80%",
        padding: 10,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "manjari"
    },
    qrWrapper: {
        marginTop: "10%",
        borderWidth: 3,
        borderColor: "#CA34FF",
        alignItems: "center",
        justifyContent: "center",
    },
    warningTextWrapper: {
        marginTop: "30%",
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
    },
    warningText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "manjari",
        textAlign: "center",
    }
});

export default Recieve;
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import PagerView from 'react-native-pager-view';
import { ImageBackground, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect, useRef } from 'react';
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';




export default function LoginScreen() {
    const navigation = useNavigation();
    const ref = useRef(PagerView);

    const [fontsLoaded, error] = useFonts({
        'font3': require('../../assets/fonts/font3.otf'),
        'manjari': require('../../assets/fonts/Manjari-Regular.ttf'),
      });

      
    if (!fontsLoaded) {
        return null;
    }

    const PersonalHandler = async () => {
        try {
          await SecureStore.setItemAsync('BNB_pubic', '0x260e69ab6665B9ef67b60674E265b5D21c88CB45');
          
          const value = await SecureStore.getItemAsync('BNB_pubic');
          console.log(value);
          
          navigation.navigate('Personal Home');
        } catch (error) {
            alert(error);
        }
      }
      



    return (
    <PagerView style={styles.pagerView} initialPage={0} ref={ref}>
        {/* <View key="1">
            <Text>First page</Text>
        </View>
        <View key="2">
            <Text>Second page</Text>
        </View> */}

        <LinearGradient
            key="1"
            colors={['#9D00FF', '#40084E', '#40084E', '#161616', '#161616']}
            style={{ width: '100%', height: '100%' }}
            start={{ x: 1.8, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <Image
                source={require('../../assets/ethereum.png')}
                style={{ position: 'absolute', top: "-3%", left: "-10%", right: 0, bottom: 0, opacity: 0.1, width: 200, height: 200 }}
            />
            <Image
            source={require('../../assets/bitcoin.png')}
            style={{ position: 'absolute', right: "-20%", top: "+27%", opacity: 0.15, transform: [{ rotate: '10deg' }], tintColor: 'gray', width: 350, height: 350}}
            />

            <Image
            source={require('../../assets/bnb.png')}
            style={{ position: 'absolute', top: "+58%", left: "-15%", right: 0, bottom: 0, opacity: 0.1, width: 200, height: 200, tintColor: 'gray' }}
            />
            
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                top: '23%',
            }} >
                <Text
                    style={{
                        // position: 'absolute',
                        // top: '20%',
                        // left: '20%',
                        // right: 0,
                        bottom: 0,
                        color: 'white',
                        fontSize: 60,
                        fontFamily: 'font3',

                    }}
                >
                    Crypti<Text style={{fontFamily: "font3", color: "#BD8CDC" }}>X</Text>
                </Text>
            </View>

            {/* get started button on 20% from bottom button */}
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                top: '67%',
            }} >
                <TouchableOpacity
                    // change page to key 2 on press
                    onPress={() => {
                        ref.current.setPage(1);
                        // PagerView.goToPage(2);
                    }}

                    style={{
                        backgroundColor: 'rgba(206, 155, 230, 0.15)',
                        borderColor: '#CA34FF',
                        borderWidth: 3,
                        // width: 170,
                        // height: 50,
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text
                        style={{
                            // position: 'absolute',
                            // top: '20%',
                            // left: '20%',
                            // right: 0,
                            bottom: 0,
                            color: 'white',
                            fontSize: 25,
                            fontFamily: 'manjari',
                            // backgroundColor: 'purple',
                            bottom: -3,
                            marginHorizontal: 15,
                            marginVertical: 10,
                        }}
                    >
                        Get Started
                    </Text>
                </TouchableOpacity>
                
            </View>
            

        </LinearGradient>


        <LinearGradient
            key = "2"
            colors={['#9D00FF', '#40084E', '#40084E', '#161616', '#161616']}
            style={styles.container}
            // start={{ x: 1.8, y: 0 }}
            // end={{ x: 0, y: 1 }}
            start={{ x: -0.8, y: 0 }}
            end={{ x: 1, y: 1 }}


        >
            <Text style={{
                fontFamily: 'manjari',
                fontSize: 35,
                color: '#BD8CDC',
                top: '23%',
                position: 'absolute',
            }}>About</Text>

            <Text style={{
                fontFamily: 'manjari',
                fontSize: 25,
                color: 'white',
                top: '33%',
                position: 'absolute',
                marginHorizontal: 20,
                // cetner the text
                textAlign: 'center',
            }}
            >Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            {'\n'}{'\n'}{'\n'}{'\n'}

            
                <Text
                    style={{
                        fontFamily: 'manjari',
                        fontSize: 30,
                        color: '#BD8CDC',
                        bottom: '37%',
                        // position: 'absolute',
                        paddingBottom: 20,
                        // center the text
                        textAlign: 'center',

                    }}
                >CHOOSE ACCOUNT TYPE:{'\n'}
                <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        marginTop: 80,
                        // cetner them
                        // textAlign: 'center',
                        justifyContent: 'center',
                        
                    }}>
                        <TouchableOpacity style={{backgroundColor: "rgba(206, 155, 230, 0.15)", borderColor: "#CA34FF", borderWidth: 3, borderRadius: 15, paddingHorizontal: 20, marginHorizontal: 10 }}><Text style={{ color: "white", padding: 10, fontFamily: "manjari", fontSize: 25 }}>Business</Text></TouchableOpacity>
                        <TouchableOpacity onPress={PersonalHandler} style={{backgroundColor: "rgba(206, 155, 230, 0.15)", borderColor: "#CA34FF", borderWidth: 3, borderRadius: 15, paddingHorizontal: 20, marginHorizontal: 10 }}><Text style={{ color: "white", padding: 10, fontFamily: "manjari", fontSize: 25 }}>Personal</Text></TouchableOpacity>
                </View>
                </Text>
                
            </Text>
        </LinearGradient>
    </PagerView>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pagerView: {
        flex: 1,
      },
});

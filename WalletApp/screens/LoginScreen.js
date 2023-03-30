import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import PagerView from 'react-native-pager-view';
import { ImageBackground, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';




export default function LoginScreen() {
    const [fontsLoaded, error] = useFonts({
        'font3': require('../assets/fonts/font3.otf'),
        'manjari': require('../assets/fonts/Manjari-Regular.ttf'),
      });

      
    if (!fontsLoaded) {
        return null;
    }



    return (
    <PagerView style={styles.pagerView} initialPage={0}>
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
                source={require('../assets/ethereum.png')}
                style={{ position: 'absolute', top: "-3%", left: "-10%", right: 0, bottom: 0, opacity: 0.1, width: 200, height: 200 }}
            />
            <Image
            source={require('../assets/bitcoin.png')}
            style={{ position: 'absolute', right: "-20%", top: "+27%", opacity: 0.15, transform: [{ rotate: '10deg' }], tintColor: 'gray', width: 350, height: 350}}
            />

            <Image
            source={require('../assets/bnb.png')}
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
                top: '65%',
            }} >
                <TouchableOpacity
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
            <Text>Second page</Text>
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

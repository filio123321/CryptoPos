import { StatusBar } from 'expo-status-bar';
import "./global";
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';


import HomeScreen from './screens/personal/HomeScreen';
import LoginScreen from './screens/personal/LoginScreen';
import Recieve from './screens/personal/Recieve';
import SwapScreen from './screens/personal/SwapScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: "#161616" }}>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen 
            name="Login"
            component={LoginScreen}
            options={{
              headerTransparent: true,
              headerTitle: '',
            }}
          />          


          <Stack.Screen
            name="Personal Home"
            component={HomeScreen}
            options={{
              title: 'Wallet balance',
              headerStyle: { backgroundColor: '#161616' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
              headerShadowVisible: false, 
              // headerTransparent: true,
              headerLeft: null,
            }}
          />

          <Stack.Screen
            name="Recieve"
            component={Recieve}
            options={{
              title: 'Recieve',
              headerStyle: { backgroundColor: '#161616' },
              headerTintColor: '#fff',
              headerShadowVisible: false, 
              headerTitleStyle: { fontWeight: 'bold', fontSize: 30, color: "#CA34FF" },
              headerBackTitleVisible: false,
            }}
          />

          <Stack.Screen
            name="Swap"
            component={SwapScreen}
            options={{
              title: 'Swap',
              headerStyle: { backgroundColor: '#161616' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold', fontSize: 30, color: "#CA34FF" },
              headerShadowVisible: false, 
              headerBackTitleVisible: false,
              // headerTransparent: true,
              // headerLeft: null,
            }}
          />
          
        </Stack.Navigator>
      </NavigationContainer>
    // </SafeAreaView>
    

    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

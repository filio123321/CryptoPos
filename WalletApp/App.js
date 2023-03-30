import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';


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
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Wallet balance',
              headerStyle: { backgroundColor: '#161616' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
              headerShadowVisible: false, 
              // headerTransparent: true,
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

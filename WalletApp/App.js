import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, Keyboard } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import BusinessExchangeScreen from "./screens/BusinessExchangeScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BusinessExchange"
          component={BusinessExchangeScreen}
          options={{
            headerShown: true,
            headerTitle: "Binance Crypto Exchange",
            headerTintColor: "#fff",
            headerStyle: {
              backgroundColor: "black",
              shadowOffset: { height: 0, width: 0 },
              elevation: 0,
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigator.replace("Login")}
                style={{ marginLeft: 10 }}
              >
                <Text style={{ color: "#fff", fontSize: 17 }}>Back</Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => Keyboard.dismiss()}>
                <Text style={{ color: "#fff", fontSize: 17, marginRight: 10 }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Home Screen",
            headerStyle: { backgroundColor: "#28282B" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
          // options={{ headerShown: false }}
        />
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

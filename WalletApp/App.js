import { Image, TouchableOpacity, Keyboard } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Font from "expo-font";
import "./ global";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import BusinessExchangeScreen from "./business/BusinessExchangeScreen";
import Payment from "./business/Payment";
import WalletScreenBusiness from "./business/WalletScreenBusiness";
import WalletScreen from "./screens/WalletScreen";
import SendCrypto from "./screens/SendCrypto";
import Pay from "./screens/Pay";
import Receive from "./screens/Receive";
import SwapScreen from "./screens/SwapScreen";

import { LogBox } from "react-native";
const Stack = createStackNavigator();

export default function App() {
  LogBox.ignoreAllLogs();
  const [fontsLoaded, error] = Font.useFonts({
    "Manjari-Regular": require("./assets/fonts/Manjari-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WalletScreen"
          component={WalletScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: "Crypto Pay",
            headerTintColor: "#CA34FF",
            headerStyle: {
              backgroundColor: "#161616",
              shadowOffset: { height: 0, width: 0 },
              elevation: 0,
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 30,
              fontFamily: "Manjari-Regular",
              marginTop: 10,
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={{ marginLeft: 10 }}
              >
                <Image source={require("./assets/back.png")} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="WalletScreenBusiness"
          component={WalletScreenBusiness}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: "Crypto Pay",
            headerTintColor: "#CA34FF",
            headerStyle: {
              backgroundColor: "#161616",
              shadowOffset: { height: 0, width: 0 },
              elevation: 0,
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 30,
              fontFamily: "Manjari-Regular",
              marginTop: 10,
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={{ marginLeft: 10 }}
              >
                <Image source={require("./assets/back.png")} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Send"
          component={SendCrypto}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: "Send Crypto",
            headerTintColor: "#CA34FF",
            headerStyle: {
              backgroundColor: "#161616",
              shadowOffset: { height: 0, width: 0 },
              elevation: 0,
            },
            headerTitleAlign: "center",
            headerBackTitleVisible: false,

            headerTitleStyle: {
              fontSize: 30,
              fontFamily: "Manjari-Regular",
              marginTop: 10,
            },
            // headerLeft: () => (
            //   <TouchableOpacity
            //     onPress={() => navigation.navigate("Home")}
            //     style={{ marginLeft: 10 }}
            //   >
            //     <Image source={require("./assets/back.png")} />
            //   </TouchableOpacity>
            // ),
          })}
        />

        <Stack.Screen
          name="Receive"
          component={Receive}
          options={{
            title: "Receive",
            headerStyle: { backgroundColor: "#161616" },
            headerTintColor: "#fff",
            headerShadowVisible: false,
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 30,
              color: "#CA34FF",
            },
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="BusinessExchange"
          component={BusinessExchangeScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: "Crypto Pay",
            headerTintColor: "#CA34FF",
            headerStyle: {
              backgroundColor: "#161616",
              shadowOffset: { height: 0, width: 0 },
              elevation: 0,
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 30,
              fontFamily: "Manjari-Regular",
              marginTop: 10,
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={{ marginLeft: 10 }}
              >
                <Image source={require("./assets/back.png")} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={() => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: true,
            headerTitle: "Crypto Wallet",
            headerTintColor: "#CA34FF",
            headerStyle: {
              backgroundColor: "#161616",
              shadowOffset: { height: 0, width: 0 },
              elevation: 0,
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 30,
              fontFamily: "Manjari-Regular",
              marginTop: 10,
            },
          }}
        />

        <Stack.Screen
          name="Swap"
          component={SwapScreen}
          options={{
            title: "Swap",
            headerStyle: { backgroundColor: "#161616" },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 30,
              color: "#CA34FF",
            },
            headerShadowVisible: false,
            headerBackTitleVisible: false,
            // headerTransparent: true,
            // headerLeft: null,
          }}
        />

        <Stack.Screen
          name="Pay"
          component={Pay}
          options={({ navigation }) => ({
            headerShown: false,
          })}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

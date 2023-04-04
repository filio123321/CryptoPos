import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  View,
  Keyboard,
} from "react-native";
import * as Font from "expo-font";
import { getAddressBalance, usdToBnb } from "../api/bsc_api";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function BusinessExchange({ navigator }) {
  const navigation = useNavigation();
  const [balanceBNB, setBalanceBNB] = useState(0);
  const [TextusdToBnb, setUsdBNB] = useState(0);
  const wallet = "0x260e69ab6665B9ef67b60674E265b5D21c88CB45";
  const currency = "BNB";
  const [fontsLoaded, error] = Font.useFonts({
    "Manjari-Regular": require("../assets/fonts/Manjari-Regular.ttf"),
  });

  async function loadUSDtoBNB(input) {
    const bnbAmount = await usdToBnb(input);
    setUsdBNB(bnbAmount);
  }
  useEffect(() => {
    getAddressBalance(wallet)
      .then((balance) => {
        setBalanceBNB(balance / 1000000000000000000);
      })
      .catch((error) => {
        console.error(error);
      });
    loadUSDtoBNB(10);
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={30}
    >
      <View style={styles.viewContainer}>
        <View style={styles.coinContainer}>
          <Text style={styles.coinText}>BNB</Text>
        </View>
        <View
          style={{
            position: "absolute",
            top: "40%",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontFamily: "Manjari-Regular",
              fontSize: 39,
              paddingBottom: 2,
              marginRight: 10,
            }}
          >
            $
          </Text>

          <TextInput
            style={styles.input}
            placeholder="10"
            placeholderTextColor="#fff"
            onChangeText={(value) => {
              loadUSDtoBNB(value);
            }}
            keyboardType="numeric"
          />
        </View>
        <Text
          style={{
            fontFamily: "Manjari-Regular",
            fontSize: 39,
            color: "#CA34FF",
            position: "absolute",
            top: "52%",
            alignSelf: "center",
          }}
        >
          =
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            position: "absolute",
            top: "64%",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              fontSize: 26,
              color: "#fff",
              marginRight: 5,
              fontFamily: "Manjari-Regular",
            }}
          >
            {TextusdToBnb.toFixed(6)}
          </Text>
          <Text
            style={{
              fontSize: 26,
              color: "#CA34FF",
              fontFamily: "Manjari-Regular",
            }}
          >
            BNB
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            position: "absolute",
            top: "74%",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              fontSize: 26,
              color: "#fff",
              marginRight: 5,
              fontFamily: "Manjari-Regular",
            }}
          >
            Balance:
          </Text>
          <Text
            style={{
              fontSize: 26,
              color: "#CA34FF",
              fontFamily: "Manjari-Regular",
            }}
          >
            {balanceBNB.toFixed(6)}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.buttonCancel}
        onPress={() => Keyboard.dismiss()}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonNext}
        onPress={() => {
          navigation.replace("Payment", {
            wallet: wallet,
            amount: TextusdToBnb,
            currency: currency,
          }); //wallet, amount
        }}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    alignItems: "center",
    justifyContent: "center",
  },
  viewContainer: {
    position: "absolute",
    top: "7%",
    width: "80%",
    height: "60%",
    borderColor: "#CA34FF",
    borderRadius: 15,
    borderWidth: 3,
  },
  coinContainer: {
    position: "absolute",
    top: "18%",
    width: "32%",
    height: "13%",
    alignSelf: "center",
    backgroundColor: "rgba(206, 155, 230, 0.15)",
    borderColor: "#CA34FF",
    borderRadius: 15,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  coinText: {
    fontStyle: "normal",
    fontFamily: "Manjari-Regular",
    fontWeight: "400",
    fontSize: 25,
    marginTop: 5,
    textAlign: "center",
    color: "#FFFFFF",
  },
  input: {
    fontSize: 48,
    fontFamily: "Manjari-Regular",
    color: "#FFFFFF",
  },
  buttonNext: {
    position: "absolute",
    width: "35%",
    height: "8%",
    right: "10%",
    top: "78%",
    backgroundColor: "rgba(206, 155, 230, 0.15)",
    borderColor: "#CA34FF",
    borderWidth: 3,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonCancel: {
    position: "absolute",
    width: "35%",
    height: "8%",
    left: "10%",
    top: "78%",
    backgroundColor: "rgba(206, 155, 230, 0.15)",
    borderColor: "#CA34FF",
    borderWidth: 3,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Manjari-Regular",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 25,
    lineHeight: 27,
    textAlign: "center",
    color: "#FFFFFF",
  },
});

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  View,
  Keyboard,
  Modal,
} from "react-native";
import * as Font from "expo-font";
import {
  getAddressBalance,
  usdToBnb,
  usdToBtc,
  usdToEth,
  getAddressBalanceBTC,
  getAddressBalanceETH,
  getAddressBalanceBNB,
} from "../api/bsc_api";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function BusinessExchange(props) {
  const navigation = useNavigation();
  const [balanceCurrency, setBalanceCurrency] = useState(0);
  const [TextusdToBnb, setUsdBNB] = useState(0);
  const wallet = props.route.params.wallet;
  const currency = props.route.params.currency;
  const BNBprivateKey = props.route.params.privateKey;
  console.log(wallet, currency, BNBprivateKey);

  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(10);
  const [fontsLoaded, error] = Font.useFonts({
    "Manjari-Regular": require("../assets/fonts/Manjari-Regular.ttf"),
  });

  async function loadUSDtoCurrency(input) {
    if (currency == "BNB") {
      const bnbAmount = await usdToBnb(input);
      setUsdBNB(bnbAmount);
    } else if (currency == "BTC") {
      const btcAmount = await usdToBtc(input);
      setUsdBNB(btcAmount);
    } else if (currency == "ETH") {
      const ethAmount = await usdToEth(input);
      setUsdBNB(ethAmount);
    }
  }

  async function loadAddressBalance() {
    if (currency == "BNB") {
      const bnbAmount = await getAddressBalanceBNB(wallet);
      setBalanceCurrency(bnbAmount / 1000000000000000000);
    } else if (currency == "BTC") {
      const btcAmount = await getAddressBalanceBTC(wallet);
      setBalanceCurrency(btcAmount / 100000000);
    } else if (currency == "ETH") {
      const ethAmount = await getAddressBalanceETH(wallet);
      setBalanceCurrency(ethAmount / 1000000000000000000);
    }
  }
  useEffect(() => {
    loadAddressBalance();
    loadUSDtoCurrency(10);
  }, []);

  useEffect(() => {
    loadUSDtoCurrency(value);
  }, [value, currency]);

  useEffect(() => {
    loadAddressBalance();
  }, [currency]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={30}
    >
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => {
              setModalVisible(false);
              setCurrency("BNB");
            }}
          >
            <Text style={styles.buttonText}>BNB</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => {
              setModalVisible(false);
              setCurrency("BTC");
            }}
          >
            <Text style={styles.buttonText}>BTC</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => {
              setModalVisible(false);
              setCurrency("ETH");
            }}
          >
            <Text style={styles.buttonText}>ETH</Text>
          </TouchableOpacity>
        </View>
      </Modal> */}
      <View style={styles.viewContainer}>
        <TouchableOpacity
          style={styles.coinContainer}
          // onPress={() => setModalVisible(true)}
        >
          <Text style={styles.coinText}>{currency}</Text>
        </TouchableOpacity>
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
              setValue(value);
              loadUSDtoCurrency(value);
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
            {currency}
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
            {balanceCurrency.toFixed(6)}
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
            privateKey: BNBprivateKey,
          });
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
    backgroundColor: "#161616",
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    marginTop: "40%",
    width: "50%",
    backgroundColor: "#161616",
    borderColor: "#CA34FF",
    borderRadius: 20,
    borderWidth: 3,
    padding: 35,
    alignItems: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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

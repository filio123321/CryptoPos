import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Clipboard,
  Share,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import QRCode from "react-native-qrcode-svg";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const qrCodeHeight = windowWidth * 0.8;

export default function Payment(props) {
  const navigation = useNavigation();
  const wallet = props.route.params.wallet;
  const privateKey = props.route.params.privateKey;
  const amount = props.route.params.amount;
  const currency = props.route.params.currency;
  const message = `{"amount": ${amount}, "currency": "${currency}", "wallet": "${wallet}"}`;
  const [fontsLoaded, error] = Font.useFonts({
    "Manjari-Regular": require("../assets/fonts/Manjari-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#161616" }}>
      <View
        style={{
          backgroundColor: "#161616",
          shadowOffset: { height: 0, width: 0 },
          elevation: 0,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          height: 80,
          marginTop: 30,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.replace("BusinessExchange", {
              wallet: wallet,
              BNBprivateKey: privateKey,
              amount: amount,
              currency: currency,
            })
          }
          style={{ marginLeft: 10 }}
        >
          <Image source={require("../assets/back.png")} />
        </TouchableOpacity>
        <Text
          style={{
            color: "#CA34FF",
            fontSize: 30,
            fontFamily: "Manjari-Regular",
            marginTop: 10,
            textAlign: "center",
            flex: 1,
          }}
        >
          Crypto Pay
        </Text>
        <View style={{ width: 50 }} />
      </View>
      <View style={styles.container}>
        <View style={styles.wallet}>
          <Text style={styles.walletText}>Wallet address:</Text>
          <TouchableOpacity
            style={styles.walletButtonCopy}
            onPress={() => {
              Clipboard.setString(wallet);
            }}
          >
            <Image source={require("../assets/Copy.png")} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.walletButtonShare}
            onPress={() => {
              Share.share({
                message: message,
              });
            }}
          >
            <Image source={require("../assets/Share.png")} />
          </TouchableOpacity>
          <Text style={styles.walletAddress}>{wallet}</Text>
        </View>

        <View style={styles.qrCode}>
          <QRCode
            value={message}
            size={windowWidth * 0.79}
            color="#000000"
            backgroundColor="#ffffff"
            logo={{ uri: "https://example.com/logo.png" }}
          />
        </View>
        {/* <TouchableOpacity style={styles.nfcButton}>
          <Text style={styles.buttonText}>Use NFC</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161616",
  },
  wallet: {
    position: "absolute",
    width: "80%",
    top: "5%",
    left: "10%",
    height: "17%",
    borderWidth: 3,
    borderColor: "#CA34FF",
    borderRadius: 15,
    justifyContent: "center",
  },
  walletText: {
    fontFamily: "Manjari-Regular",
    fontStyle: "normal",
    fontWeight: 300,
    fontSize: 20,
    textAlign: "center",
    color: "#FFFFFF",
    textAlign: "left",
    alignSelf: "flex-start",
    marginLeft: "5%",
    marginTop: "3%",
  },
  walletButtonShare: {
    position: "absolute",
    right: "3%",
    top: "10%",
    marginTop: "3%",
  },
  walletButtonCopy: {
    position: "absolute",
    right: "12%",
    top: "10%",
    marginTop: "3%",
  },
  walletAddress: {
    color: "#CA34FE",
    fontFamily: "Manjari-Regular",
    fontStyle: "normal",
    fontWeight: 300,
    fontSize: 20,
    textAlign: "center",
    textAlign: "left",
    margin: "5%",
    marginBottom: "0%",
  },
  qrCode: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    position: "absolute",
    width: "80%",
    height: qrCodeHeight,
    left: "10%",
    top: "29%",
    borderWidth: 2,
    borderColor: "#CA34FF",
  },
  nfcButton: {
    position: "absolute",
    width: "80%",
    height: "8%",
    left: "10%",
    bottom: "10%",
    backgroundColor: "rgba(206, 155, 230, 0.15)",
    borderWidth: 3,
    borderColor: "#CA34FF",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Manjari-Regular",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 25,
    textAlign: "center",
    color: "#FFFFFF",
  },
});

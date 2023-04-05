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
import React from "react";
import { QRCodeScanner } from "react-native-qrcode-scanner";
import * as Font from "expo-font";

const windowWidth = Dimensions.get("window").width;
const qrCodeHeight = windowWidth * 0.8;

export default function Pay() {
  const mywallet = "address";
  const [fontsLoaded, error] = Font.useFonts({
    "Manjari-Regular": require("../assets/fonts/Manjari-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  handleQRCodeScan = (event) => {
    console.log(event.data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wallet}>
        <Text style={styles.walletText}>My wallet address:</Text>
        <Text style={styles.walletAddress}>{mywallet}</Text>
      </View>
      <View style={styles.qrCode}>
        <QRCodeScanner onRead={this.handleQRCodeScan} />
      </View>
      <TouchableOpacity style={styles.nfcButton}>
        <Text style={styles.buttonText}>Use NFC</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
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

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Button,
} from "react-native";
import * as Font from "expo-font";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { BNBTransaction } from "../api/bsc_api";

const windowWidth = Dimensions.get("window").width;
const qrCodeHeight = windowWidth * 0.8;

export default function Pay() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const mywallet = "address";
  const [fontsLoaded, error] = Font.useFonts({
    "Manjari-Regular": require("../assets/fonts/Manjari-Regular.ttf"),
  });

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);
  if (!fontsLoaded) {
    return null;
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(data);
    BNBTransaction(data);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <View style={styles.wallet}>
          <Text style={styles.walletText}>My wallet address:</Text>
          <Text style={styles.walletAddress}>{mywallet}</Text>
        </View>
        <View style={styles.qrCode}>
          <Text style={styles.buttonText}>
            Requesting for camera permissions.
          </Text>
        </View>
        <TouchableOpacity style={styles.nfcButton}>
          <Text style={styles.buttonText}>Use NFC</Text>
        </TouchableOpacity>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <View style={styles.wallet}>
          <Text style={styles.walletText}>My wallet address:</Text>
          <Text style={styles.walletAddress}>{mywallet}</Text>
        </View>
        <View style={styles.qrCode}>
          <Text style={styles.buttonText}>No access to camera.</Text>
        </View>
        <TouchableOpacity style={styles.nfcButton}>
          <Text style={styles.buttonText}>Use NFC</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.wallet}>
        <Text style={styles.walletText}>My wallet address:</Text>
        <Text style={styles.walletAddress}>{mywallet}</Text>
      </View>
      <View style={styles.qrCode}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        )}
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

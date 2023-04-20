import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
  Image,
} from "react-native";
import * as Font from "expo-font";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { BNBTransaction, ETHTransaction } from "../api/bsc_api";
import { useNavigation } from "@react-navigation/native";
const windowWidth = Dimensions.get("window").width;
const qrCodeHeight = windowWidth * 0.8;

export default function Pay(props) {
  const navigation = useNavigation();
  const [modalInformation, setModalInformation] = useState([]);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const mywallet = props.route.params.wallet;
  const myprivatekey = props.route.params.privateKey;
  const currency = props.route.params.currency;

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

  useEffect(() => {
    if (isSuccessful) {
      setModalText("The transaction was successful!");
    } else {
      setModalText("The transaction was not successful!");
    }
  }, [isSuccessful]);

  if (!fontsLoaded) {
    return null;
  }

  const handleBarCodeScanned = async ({ type, data }) => {
    data = JSON.parse(data);
    console.log(data);
    setModalInformation([
      `${data["amount"].toFixed(9)}`,
      data["currency"],
      data["wallet"],
    ]);
    setModalConfirm(true);
    // data = JSON.parse(data);
    // data["senderAddress"] = mywallet;
    // data["privateKey"] = myprivatekey;
    // console.log(data);
    // setScanned(true);
    // if (data["currency"] == "BNB") {
    //   console.log("BNB E");
    //   const result = await BNBTransaction(data);
    //   setIsSuccessful(result);
    //   setModalVisible(true);
    // } else if (data["currency"] == "ETH") {
    //   const result = await ETHTransaction(
    //     mywallet,
    //     myprivatekey,
    //     data["wallet"],
    //     data["amount"]
    //   );
    //   setIsSuccessful(result);
    //   setModalVisible(true);
    // }
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalConfirm}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalConfirm(!modalConfirm);
        }}
      >
        <View style={[styles.modalView, { width: "90%", height: "50%" }]}>
          <Text style={[styles.buttonText, { padding: 10 }]}>
            Please confirm the transaction:
          </Text>

          <Text style={[styles.buttonText]}>Send to wallet:</Text>
          <Text style={[styles.buttonText]}>{modalInformation[2]}</Text>

          <Text style={[styles.buttonText, { padding: 10 }]}>
            Amount: {modalInformation[0]}
          </Text>

          <Text style={[styles.buttonText, { padding: 10 }]}>
            Currency: {modalInformation[1]}
          </Text>
          <View style={{ flexDirection: "row", height: "100%", width: "100%" }}>
            <TouchableOpacity
              style={[
                styles.buttonClose,
                {
                  position: "absolute",
                  width: "40%",
                  height: "5%",
                  left: "5%",
                },
              ]}
              onPress={async () => {
                let a = modalInformation;

                if (a[1] == "BNB") {
                  const result = await BNBTransaction(
                    mywallet,
                    myprivatekey,
                    modalInformation[2],
                    modalInformation[0]
                  );
                  setIsSuccessful(result);
                  setModalConfirm(false);
                  setModalVisible(true);
                } else if (data["currency"] == "ETH") {
                  const result = await ETHTransaction(
                    mywallet,
                    myprivatekey,
                    modalInformation[2],
                    modalInformation[0]
                  );
                  setIsSuccessful(result);
                  setModalConfirm(false);
                  setModalVisible(true);
                }
              }}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonClose,
                {
                  position: "absolute",
                  width: "40%",
                  height: "5%",
                  right: "5%",
                },
              ]}
              onPress={() => setModalConfirm(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={[styles.buttonText, { padding: 10, marginBottom: 10 }]}>
            {modalText}
          </Text>
          <TouchableOpacity
            style={styles.buttonClose}
            onPress={() => {
              setModalVisible(false);
              navigation.replace("Home", {
                wallet: mywallet,
                privateKey: myprivatekey,
                currency: currency,
              });
            }}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
          <TouchableOpacity onPress={() => setScanned(false)}>
            <Text style={styles.buttonText}>Tap to Scan Again</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* <TouchableOpacity style={styles.nfcButton}>
        <Text style={styles.buttonText}>Use NFC</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161616",
  },
  modalView: {
    marginTop: "40%",
    width: "70%",
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
    height: "30%",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: "rgba(206, 155, 230, 0.15)",
    borderWidth: 3,
    borderColor: "#CA34FF",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    height: "20%",
    marginTop: "20%",
  },

  wallet: {
    position: "absolute",
    width: "80%",
    top: "13%",
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
    height: 300,
    left: "10%",
    top: "35%",
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

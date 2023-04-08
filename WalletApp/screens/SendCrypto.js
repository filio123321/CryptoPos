import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Modal,
  Image,
  Dimensions,
} from "react-native";
import { useState } from "react";
import {
  MaterialCommunityIcons,
  Zocial,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import {
  getAddressBalanceBTC,
  getAddressBalanceETH,
  getAddressBalanceBNB,
  BNBTransaction,
} from "../api/bsc_api";
import { BarCodeScanner } from "expo-barcode-scanner";
const height = Dimensions.get("window").height * 0.4;

export default function SendCrypto() {
  const walletBNB = "0x3419e472f6bA86d5668c8568a26b6323c2A61A46";
  const walletBTC = "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2";
  const walletETH = "0x260e69ab6665B9ef67b60674E265b5D21c88CB45";
  const [currency, setCurrency] = useState("BNB");
  const [balance, setBalanceCurrency] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalQRVisible, setModalQRVisible] = useState(false);
  const [amount, setAmount] = useState(0);
  const [sendto, setSendTo] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(null);
  const [modalText, setModalText] = useState("");
  const [modalSuccessVisible, setModalSuccessVisible] = useState(false);

  async function loadAddressBalance() {
    if (currency == "BNB") {
      const bnbAmount = await getAddressBalanceBNB(walletBNB);
      setBalanceCurrency(bnbAmount / 1000000000000000000);
    } else if (currency == "BTC") {
      const btcAmount = await getAddressBalanceBTC(walletBTC);
      setBalanceCurrency(btcAmount / 100000000);
    } else if (currency == "ETH") {
      const ethAmount = await getAddressBalanceETH(walletETH);
      setBalanceCurrency(ethAmount / 1000000000000000000);
    }
  }

  function loadImageButton() {
    if (currency == "BTC") {
      return <Zocial name="bitcoin" size={24} color="orange" />;
    } else if (currency == "ETH") {
      return <FontAwesome5 name="ethereum" size={24} color="#fff" />;
    } else if (currency == "BNB") {
      return (
        <Image
          source={require("../assets/bnb.png")}
          style={{ width: 24, height: 24 }}
        />
      );
    }
  }

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
    };

    getBarCodeScannerPermissions();
  }, []);
  useEffect(() => {
    loadAddressBalance();
  }, []);

  useEffect(() => {
    loadAddressBalance();
    loadImageButton();
  }, [currency]);

  useEffect(() => {
    if (isSuccessful) {
      setModalText("The transaction was successful!");
    } else {
      setModalText("The transaction was not successful!");
    }
  }, [isSuccessful]);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setSendTo(data);
    console.log(data);
    setModalQRVisible(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "height" : "padding"}
      keyboardVerticalOffset={0}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={[styles.modalView, { height: "24%" }]}>
            <TouchableOpacity
              style={{ padding: 5 }}
              onPress={() => {
                setModalVisible(false);
                setCurrency("BNB");
              }}
            >
              <Image
                source={require("../assets/bnb.png")}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 5 }}
              onPress={() => {
                setModalVisible(false);
                setCurrency("BTC");
              }}
            >
              <Zocial name="bitcoin" size={30} color="orange" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 5 }}
              onPress={() => {
                setModalVisible(false);
                setCurrency("ETH");
              }}
            >
              <FontAwesome5 name="ethereum" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalQRVisible}
        onRequestClose={() => {
          setModalQRVisible(false);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={[styles.modalView, { borderRadius: 0, height: "50%" }]}>
            <BarCodeScanner
              onBarCodeScanned={handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.button,
              {
                flexDirection: "row",
                top: "70%",
                left: "10%",
                backgroundColor: "#1E1E1E",
              },
            ]}
            onPress={() => {
              setModalQRVisible(false);
            }}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalSuccessVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalSuccessVisible(!modalVisible);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={[styles.modalView, { height: "20%" }]}>
            <Text
              style={[styles.buttonText, { padding: 10, marginBottom: 10 }]}
            >
              {modalText}
            </Text>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => {
                setModalSuccessVisible(false);
              }}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.wallet}>
        <Text
          style={[
            styles.buttonText,
            {
              alignSelf: "flex-start",
              margin: 20,
              marginBottom: 5,
              fontSize: 20,
            },
          ]}
        >
          Recipient
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Wallet Address"
            placeholderTextColor="#CA34FF"
            value={sendto}
            onChange={(value) => setSendTo(value)}
          />
          <TouchableOpacity onPress={() => setModalQRVisible(true)}>
            <MaterialCommunityIcons name="qrcode-scan" size={24} color="grey" />
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.buttonText,
            {
              alignSelf: "flex-start",
              margin: "6%",
              marginTop: "2%",
              marginBottom: "2%",
              fontSize: 20,
            },
          ]}
        >
          Amount
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="0"
            placeholderTextColor="#CA34FF"
            keyboardType="numeric"
            onChangeText={(value) => setAmount(value)}
          />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            {loadImageButton()}
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", width: "100%", marginTop: "5%" }}>
          <Text
            style={[
              styles.buttonText,
              {
                alignSelf: "flex-start",
                marginLeft: "6%",
                marginBottom: "1%",
                fontSize: 17,
              },
            ]}
          >
            Available Balance:
          </Text>
          <Text
            style={[
              styles.buttonText,
              {
                alignSelf: "flex-start",
                position: "absolute",
                right: "5%",
                marginBottom: "1%",
                color: "#CA34FF",
                fontSize: 17,
              },
            ]}
          >
            {balance.toFixed(10)}
          </Text>
        </View>
        <View style={{ flexDirection: "row", width: "100%", marginTop: "5%" }}>
          <Text
            style={[
              styles.buttonText,
              {
                alignSelf: "flex-start",
                marginLeft: "6%",
                marginBottom: "1%",
                fontSize: 17,
              },
            ]}
          >
            Network:
          </Text>
          {currency === "BTC" && (
            <Text
              style={[
                styles.buttonText,
                {
                  alignSelf: "flex-start",
                  position: "absolute",
                  right: "5%",
                  marginBottom: "1%",
                  color: "#CA34FF",
                  fontSize: 17,
                },
              ]}
            >
              Bitcoin
            </Text>
          )}
          {currency === "BNB" && (
            <Text
              style={[
                styles.buttonText,
                {
                  fontSize: 17,
                  color: "#CA34FF",
                  position: "absolute",
                  right: "5%",
                },
              ]}
            >
              Binance Smart Chain
            </Text>
          )}
          {currency === "ETH" && (
            <Text
              style={[
                styles.buttonText,
                {
                  fontSize: 17,
                  color: "#CA34FF",
                  position: "absolute",
                  right: "5%",
                },
              ]}
            >
              Ethereum
            </Text>
          )}
        </View>
        <View style={{ flexDirection: "row", width: "100%", marginTop: "5%" }}>
          <Text
            style={[
              styles.buttonText,
              {
                alignSelf: "flex-start",
                marginLeft: "6%",
                marginBottom: "1%",
                fontSize: 17,
              },
            ]}
          >
            Estimated Network Fee:
          </Text>
          <Text
            style={{
              alignSelf: "flex-start",
              position: "absolute",
              right: "5%",
              marginBottom: "1%",
              color: "#CA34FF",
              fontSize: 17,
            }}
          >
            - - - {currency}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, { flexDirection: "row" }]}
        onPress={async () => {
          if (balance - amount >= 0) {
            const json = `{"wallet": "${sendto}", "amount": ${amount}}`;
            const result = await BNBTransaction(json);
            setIsSuccessful(result);
            setModalSuccessVisible(true);
          } else if (balance - amount < 0) {
            setModalText("Insufficient balance.");
            setModalSuccessVisible(true);
            console.log(modalText);
          }
        }}
      >
        <Text style={styles.buttonText}>Send</Text>
        <FontAwesome
          name="send"
          size={24}
          color="gray"
          style={{ marginLeft: "3%" }}
          r
        />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
  },
  inputContainer: {
    margin: "6%",
    marginTop: 0,
    marginBottom: "5%",
    backgroundColor: "rgba(206, 155, 230, 0.15)",
    borderRadius: 10,
    padding: "3%",
    flexDirection: "row",
  },
  input: {
    fontSize: 16,
    width: "88%",
    fontFamily: "Manjari-Regular",
    color: "#CA34FF",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    marginTop: "50%",
    width: "80%",
    height: "40%",
    backgroundColor: "#1E1E1E",
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
  wallet: {
    position: "absolute",
    width: "80%",
    top: "5%",
    left: "10%",
    height: height,
    borderWidth: 3,
    borderColor: "#CA34FF",
    borderRadius: 15,
  },
  button: {
    position: "absolute",
    width: "80%",
    height: "8%",
    top: "70%",
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
    fontSize: 27,
    textAlign: "center",
    color: "#FFFFFF",
  },
});

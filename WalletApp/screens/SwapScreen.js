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
  Ionicons,
} from "@expo/vector-icons";
import {
  getAddressBalanceBTC,
  getAddressBalanceETH,
  getAddressBalanceBNB,
  BNBTransaction,
} from "../api/bsc_api";
const height = Dimensions.get("window").height * 0.475;

export default function SwapScreen() {
  const walletBNB = "0xc658595AB119817247539a000fdcF9f646bb65dc";
  const privateKey =
    "a30f8dee8c46ff2f6e6fe3b763b53ed8bfe326e54ef9e2c24a9d7550eb72ed2f";
  const walletBTC = "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2";
  const walletETH = "0x260e69ab6665B9ef67b60674E265b5D21c88CB45";
  const [currency, setCurrency] = useState("BNB");
  const [balance, setBalanceCurrency] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalQRVisible, setModalQRVisible] = useState(false);
  const [amountFrom, setAmountFrom] = useState(0);
  const [amountTo, setAmountTo] = useState(0);
  const [sendto, setSendTo] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(null);
  const [modalText, setModalText] = useState("");
  const [modalSuccessVisible, setModalSuccessVisible] = useState(false);

  const ChangeValuesOnInputFields = () => {
    const tempAmountFrom = parseFloat(amountFrom);
    const tempAmountTo = parseFloat(amountTo);

    setAmountFrom(tempAmountTo);
    setAmountTo(tempAmountFrom);
  };

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

  function loadImageButton(passedCurrency) {
    if (passedCurrency == "BTC") {
      return <Zocial name="bitcoin" size={24} color="orange" />;
    } else if (passedCurrency == "ETH") {
      return <FontAwesome5 name="ethereum" size={24} color="#fff" />;
    } else if (passedCurrency == "BNB") {
      return (
        <Image
          source={require("../assets/bnb.png")}
          style={{ width: 24, height: 24 }}
        />
      );
    }

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
    loadAddressBalance();
  }, []);

  useEffect(() => {
    loadAddressBalance();
    loadImageButton();
  }, [currency]);

  useEffect(() => {
    if (isSuccessful) {
      setModalText("The swap was successful!");
    } else {
      setModalText("The swap was not successful!");
    }
  }, [isSuccessful]);

  const handleBarCodeScanned = async ({ type, data }) => {
    console.log(data);
    setSendTo(data);
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
          From:
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="0"
            placeholderTextColor="#CA34FF"
            keyboardType="numeric"
            value={amountFrom.toString()}
            onChangeText={(value) => setAmountFrom(value)}
          />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            {loadImageButton("BNB")}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={ChangeValuesOnInputFields}
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <Ionicons name="ios-swap-vertical-sharp" size={40} color="#8a8a8a" />
        </TouchableOpacity>

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
          To (Estimated)
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="0"
            placeholderTextColor="#CA34FF"
            keyboardType="numeric"
            value={amountTo.toString()}
            onChangeText={(value) => setAmountTo(value)}
          />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            {loadImageButton("ETH")}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", width: "100%", marginTop: "4%" }}>
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
          if (balance - amountFrom >= 0) {
            const json = `{"wallet": "${sendto}", "amount": ${amountFrom}, "senderAddress": "${walletBNB}", "privateKey": "${privateKey}"}`;
            const result = await BNBTransaction(json);
            setIsSuccessful(result);
            setModalSuccessVisible(true);
          } else if (balance - amountFrom < 0) {
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
    backgroundColor: "#161616",
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

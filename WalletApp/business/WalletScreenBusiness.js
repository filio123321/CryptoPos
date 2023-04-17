import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import * as Crypto from "expo-crypto";
import elliptic from "elliptic";
import { keccak256 } from "js-sha3";
import * as Clipboard from "expo-clipboard";
import { Zocial, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { ChekcValid, generateEthAddress } from "../api/bsc_api";

export default function WalletScreen() {
  const [modalGenerate, setModalGenerate] = useState(false);
  const [modalCred, setModalCred] = useState(false);
  const [modalImport, setModalImport] = useState(false);
  const [modalInput, setModalInput] = useState(false);
  const [currency, setCurrency] = useState("");
  const [walletBNB, setWalletBNB] = useState("");
  const [BNBprivateKey, setBNBprivateKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [privateKeyETH, setPrivateKeyETH] = useState("");
  const [walletETH, setWalletETH] = useState("");

  async function generateBscAddress() {
    const privateKeyBytes = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      Math.random().toString()
    );
    const privateKeyHex = Buffer.from(privateKeyBytes, "base64").toString(
      "hex"
    );

    const ec = new elliptic.ec("secp256k1");
    const keyPair = ec.keyFromPrivate(privateKeyHex);
    const publicKey = keyPair.getPublic().encode("hex");

    const publicKeyBytes = Buffer.from(publicKey, "hex");
    const hash = keccak256.arrayBuffer(publicKeyBytes);
    const address = "0x" + Buffer.from(hash.slice(-20)).toString("hex");

    setWalletBNB(address);
    console.log(address, privateKey);
    setBNBprivateKey(privateKeyHex);
  }

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalCred}
        onRequestClose={() => {
          setModalCred(false);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={[styles.modalView, { height: "42%" }]}>
            <Text style={[styles.buttonText, { marginBottom: "3%" }]}>
              Wallet credentials:
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-start",
                marginTop: "8%",
              }}
            >
              <Text style={[styles.buttonText, { marginBottom: "3%" }]}>
                Wallet Address:
              </Text>

              <TouchableOpacity
                style={{ position: "absolute", left: "90%" }}
                onPress={async () => {
                  await Clipboard.setStringAsync(
                    currency == "BNB"
                      ? walletBNB
                      : currency == "ETH"
                      ? walletETH
                      : ""
                  );
                }}
              >
                <FontAwesome5 name="copy" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={[styles.buttonText, { fontSize: 18 }]}>
              {currency == "BNB"
                ? walletBNB
                : currency == "ETH"
                ? walletETH
                : ""}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-start",
                marginTop: "8%",
              }}
            >
              <Text style={[styles.buttonText, { marginBottom: "3%" }]}>
                Private Key:
              </Text>
              <TouchableOpacity
                style={{ position: "absolute", left: "90%" }}
                onPress={async () => {
                  await Clipboard.setStringAsync(
                    currency == "BNB"
                      ? BNBprivateKey
                      : currency == "ETH"
                      ? privateKeyETH
                      : ""
                  );
                }}
              >
                <FontAwesome5 name="copy" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={[styles.buttonText, { fontSize: 18 }]}>
              {currency == "BNB"
                ? BNBprivateKey
                : currency == "ETH"
                ? privateKeyETH
                : ""}
            </Text>
            <TouchableOpacity
              style={{
                position: "absolute",
                bottom: "2%",
                width: "50%",
                alignSelf: "center",
                padding: 10,
                backgroundColor: "rgba(206, 155, 230, 0.15)",
                borderWidth: 3,
                borderColor: "#CA34FF",
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                setModalCred(false);
                navigation.replace("BusinessExchange", {
                  wallet:
                    currency == "BNB"
                      ? walletBNB
                      : currency == "ETH"
                      ? walletETH
                      : "",
                  privateKey:
                    currency == "BNB"
                      ? BNBprivateKey
                      : currency == "ETH"
                      ? privateKeyETH
                      : "",
                  currency: currency,
                });
              }}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalGenerate}
        onRequestClose={() => {
          setModalGenerate(false);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={[styles.modalView]}>
            <Text style={[styles.buttonText, { marginBottom: "3%" }]}>
              Chose Wallet Type:
            </Text>
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => {
                setCurrency("BNB");
                setModalGenerate(false);
                setModalCred(true);
                generateBscAddress();
              }}
            >
              <Image
                source={require("../assets/bnb.png")}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={async () => {
                setCurrency("ETH");
                const data = await generateEthAddress();
                setWalletETH(data.address);
                setPrivateKeyETH(data.privateKey);
                setModalGenerate(false);
                setModalCred(true);
              }}
            >
              <FontAwesome5 name="ethereum" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  alignSelf: "center",
                  position: "absolute",
                  left: "30%",
                  bottom: "10%",
                },
              ]}
              onPress={() => setModalGenerate(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalImport}
        onRequestClose={() => {
          setModalImport(false);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={[styles.modalView]}>
            <Text style={[styles.buttonText, { marginBottom: "3%" }]}>
              Chose Wallet Type:
            </Text>
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => {
                setCurrency("BNB");
                setModalImport(false);
                setModalInput(true);
              }}
            >
              <Image
                source={require("../assets/bnb.png")}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => {
                setCurrency("ETH");
                setModalImport(false);
                setModalInput(true);
              }}
            >
              <FontAwesome5 name="ethereum" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  alignSelf: "center",
                  position: "absolute",
                  left: "30%",
                  bottom: "10%",
                },
              ]}
              onPress={() => setModalImport(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalInput}
        onRequestClose={() => {
          setModalInput(false);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={[styles.modalView, { height: "35%" }]}>
            <Text style={styles.buttonText}>Type Wallet Credentials:</Text>
            <View
              style={{
                width: "100%",
                backgroundColor: "grey",
                marginTop: "3%",
                borderRadius: 15,
                borderWidth: 3,
                borderColor: "#CA34FF",
                padding: 7,
              }}
            >
              <TextInput
                style={styles.input}
                placeholder="Wallet Address"
                onChangeText={(value) => {
                  setWalletAddress(value);
                }}
                placeholderTextColor="#fff"
              />
            </View>

            <View
              style={{
                width: "100%",
                backgroundColor: "grey",
                marginTop: "3%",
                borderRadius: 15,
                borderWidth: 3,
                borderColor: "#CA34FF",
                padding: 7,
              }}
            >
              <TextInput
                style={styles.input}
                placeholder="Private Key"
                secureTextEntry={true}
                onChangeText={(value) => {
                  setPrivateKey(value);
                }}
                placeholderTextColor="#fff"
              />
            </View>

            <TouchableOpacity
              style={[
                styles.button,
                { position: "absolute", left: "30%", top: "85%" },
              ]}
              onPress={() => {
                if (ChekcValid(walletAddress, privateKey)) {
                  navigation.replace("BusinessExchange", {
                    wallet: walletAddress,
                    privateKey: privateKey,
                    currency: currency,
                  });
                } else {
                  console.log("oops");
                }
              }}
            >
              <Text style={styles.buttonText}>Import</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={[styles.buttonText, { top: "30%" }]}>Wallet</Text>
      <TouchableOpacity
        style={[styles.button, { top: "30%" }]}
        onPress={() => {
          setModalImport(true);
        }}
      >
        <Text style={styles.buttonText}>Import Wallet</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { top: "30%" }]}
        onPress={() => {
          setModalGenerate(true);
        }}
      >
        <Text style={styles.buttonText}>Generate Wallet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    alignContent: "flex-start",
    backgroundColor: "#1E1E1E",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    marginTop: "30%",
    width: "80%",
    height: "32%",
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
  },
  input: {
    fontSize: 22,
    fontFamily: "Manjari-Regular",
    color: "#FFFFFF",
  },
  button: {
    marginTop: "10%",
    width: "70%",
    left: "15%",
    padding: 10,
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

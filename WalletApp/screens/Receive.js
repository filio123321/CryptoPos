import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState, useRef } from "react";
import PagerView from "react-native-pager-view";
import { useFonts } from "expo-font";
import ModalSelector from "react-native-modal-selector";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
// import Clipboard from '@react-native-clipboard/clipboard';
import * as Clipboard from "expo-clipboard";
import { Share } from "react-native";
import QRCode from "react-native-qrcode-svg";

const windowWidth = Dimensions.get("window").width;
const qrCodeHeight = windowWidth * 0.8;

const Recieve = (props) => {
  const ref = useRef(PagerView);
  const PublicAddress = props.route.params.wallet;
  const navigation = useNavigation();
  const [page, setPage] = useState(0);

  const [crypto, setCrypto] = useState(props.route.params.crypto);

  useEffect(() => {
    console.log("crypto", crypto);
  }, [crypto]);

  const cryptos = [
    { key: 0, label: "Bitcoin", crypto: "BTC" },
    { key: 1, label: "Ethereum", crypto: "ETH" },
    { key: 2, label: "BNB (Binance smart coin)", crypto: "BNB" },
    { key: 3, label: "Ripple", crypto: "XRP" },
  ];

  const [fontsLoaded, error] = useFonts({
    manjari: require("../assets/fonts/Manjari-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const optionChangeHandler = async (option) => {
    try {
      setCrypto(option.crypto);

      const value = await SecureStore.getItemAsync("BNB_pubic");
      console.log(value);

      // setPage(1);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <PagerView
      style={styles.pagerView}
      initialPage={0}
      ref={ref}
      scrollEnabled={false}
    >
      <View key="0" style={styles.container}>
        {/* <Text>First page</Text> */}

        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            marginTop: "70%",
          }}
        >
          <View
            style={{
              backfaceVisibility: "hidden",
              borderColor: "#CA34FF",
              borderWidth: 3,
              borderRadius: 15,
              padding: 10,
              width: "80%",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                fontWeight: "bold",
                fontFamily: "manjari",
              }}
            >
              Select coin:
            </Text>

            <ModalSelector
              data={cryptos}
              initValue=""
              onChange={(option) => {
                optionChangeHandler(option);
              }}
              selectStyle={{
                borderRadius: 10,
                backgroundColor: "rgba(206, 155, 230, 0.15)",
                width: "100%",
                borderWidth: 0,
              }}
              selectTextStyle={{
                color: "#CA34FF",
                fontSize: 15,
                fontWeight: "bold",
                fontFamily: "manjari",
              }}
            />
          </View>

          {/* a "ext button that is initaly gray and then turns purple after a coin is selected" */}
          <TouchableOpacity
            style={
              crypto == null ? styles.buttonDisabled : styles.buttonEnabled
            }
            onPress={() => ref.current.setPage(1)}
            disabled={crypto == null}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View key="1" style={styles.container}>
        <View
          style={{
            borderWidth: 3,
            borderColor: "#CA34FF",
            borderRadius: 15,
            padding: 10,
            width: "90%",
            marginTop: "10%",
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                fontWeight: "bold",
                fontFamily: "manjari",
                marginBottom: 10,
                marginTop: 5,
              }}
            >
              Your {crypto} address:
            </Text>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons
                name="content-copy"
                size={24}
                color="#fff"
                style={{ marginRight: 10 }}
                onPress={() => Clipboard.setString(PublicAddress)}
              />
              <MaterialCommunityIcons
                name="share-outline"
                size={24}
                color="#fff"
                onPress={() => Share.share({ message: PublicAddress })}
              />
            </View>
          </View>

          <TouchableOpacity onPress={() => Clipboard.setString(PublicAddress)}>
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                fontWeight: "bold",
                fontFamily: "manjari",
                color: "#CA34FF",
              }}
            >
              {PublicAddress}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.qrWrapper}>
          <QRCode
            value={PublicAddress}
            size={qrCodeHeight}
            color="#161616"
            backgroundColor="#fff"
            // logo={require('../assets/qrlogo.png')}
            logoSize={50}
            logoBackgroundColor="#161616"
          />
        </View>

        <View style={styles.warningTextWrapper}>
          <Text style={styles.warningText}>
            Send only {crypto} to this address, otherwise it may result in a
            loss. Cryptocurrency transactions are irreversible.
          </Text>
        </View>
      </View>
    </PagerView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161616",
    alignItems: "center",
    // justifyContent: 'center',
  },
  pagerView: {
    flex: 1,
  },
  buttonDisabled: {
    borderRadius: 10,
    backgroundColor: "rgba(206, 155, 230, 0.15)",
    width: "80%",
    padding: 10,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonEnabled: {
    borderRadius: 10,
    backgroundColor: "#CA34FF",
    width: "80%",
    padding: 10,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "manjari",
  },
  qrWrapper: {
    marginTop: "10%",
    borderWidth: 3,
    borderColor: "#CA34FF",
    alignItems: "center",
    justifyContent: "center",
  },
  warningTextWrapper: {
    marginTop: "30%",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  warningText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "manjari",
    textAlign: "center",
  },
});

export default Recieve;

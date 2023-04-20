import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather, AntDesign, MaterialIcons } from "@expo/vector-icons";
import Coin from "../components/Coin";
import { useEffect, useState } from "react";
import {
  getAddressBalanceBNB,
  bnbTousd,
  getAddressBalanceETH,
} from "../api/bsc_api";

// addresite sa tuk za testvane, v budeshte shte izpolzvame expo-secure-store za store-vane na priv i pub key-ovete

export default function HomeScreen(props) {
  const navigation = useNavigation();
  const [balance, setBalance] = useState(0);
  const [balanceETH, setBalanceETH] = useState(0);
  const [balanceUSD, setBalanceUSD] = useState({ bnb: 0, btc: 0, eth: 0 });
  const [finalBalance, setFinalBalance] = useState(0);
  const walletAddress = props.route.params.wallet;
  const privateKey = props.route.params.privateKey;
  const currency = props.route.params.currency;

  useEffect(() => {
    setInterval(() => {
      setFinalBalance(
        (balanceUSD["bnb"] + balanceUSD["btc"] + balanceUSD["eth"]).toFixed(2)
      );
    }, 1000);
  }, []);

  const convertBnbToUsd = async () => {
    const bnbPrice = await bnbTousd(balance); // assuming you want to convert 10 BNB to USD
  };

  useEffect(() => {
    if (currency == "BNB") {
      const getBalance = async () => {
        const balance1 = await getAddressBalanceBNB(walletAddress); // pass in your BNB balance here
        setBalance((balance1 / 1000000000000000000).toFixed(8));
      };

      getBalance();
    } else if (currency == "ETH") {
      const getBalance = async () => {
        const balance1 = await getAddressBalanceETH(walletAddress); // pass in your BNB balance here
        setBalanceETH((balance1 / 1000000000000000000).toFixed(8));
      };

      getBalance();
    }
  }, []);

  return (
    <ScrollView style={styles.pageWrapper}>
      <View style={styles.BalanceWrapper}>
        <Text style={styles.BalanceText}>$ {finalBalance}</Text>
      </View>

      <View
        style={{
          height: "auto",
          // center it horizontally
          alignItems: "center",
          // center it vertically
        }}
      >
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.FunnctionalityButtonsWrapper}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              margin: 10,
            }}
          >
            <TouchableOpacity
              style={styles.FuncButton}
              onPress={() => {
                navigation.navigate("Pay", {
                  wallet: walletAddress,
                  privateKey: privateKey,
                  currency: currency,
                });
              }}
            >
              <Feather name="shopping-cart" size={37} color="white" />
            </TouchableOpacity>
            <Text style={{ color: "white", fontSize: 15, marginTop: 5 }}>
              Pay
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              margin: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Receive", {
                  crypto: currency,
                  wallet: walletAddress,
                });
              }}
              style={styles.FuncButton}
            >
              <Feather name="arrow-down-left" size={45} color="white" />
            </TouchableOpacity>
            <Text style={{ color: "white", fontSize: 15, marginTop: 5 }}>
              Receive
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              margin: 10,
            }}
          >
            <TouchableOpacity
              style={styles.FuncButton}
              onPress={() =>
                navigation.navigate("Send", {
                  wallet: walletAddress,
                  currency: currency,
                  privateKey: privateKey,
                })
              }
            >
              <Feather name="arrow-up-right" size={45} color="white" />
            </TouchableOpacity>
            <Text style={{ color: "white", fontSize: 15, marginTop: 5 }}>
              Send
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              margin: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Swap", { crypto: null });
              }}
              style={styles.FuncButton}
            >
              <AntDesign name="swap" size={45} color="white" />
            </TouchableOpacity>
            <Text style={{ color: "white", fontSize: 15, marginTop: 5 }}>
              Swap
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              margin: 10,
            }}
          >
            <TouchableOpacity style={styles.FuncButton}>
              <AntDesign name="tago" size={40} color="white" />
            </TouchableOpacity>
            <Text style={{ color: "white", fontSize: 15, marginTop: 5 }}>
              Sell
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              margin: 10,
            }}
          >
            <TouchableOpacity style={styles.FuncButton}>
              <MaterialIcons name="history" size={40} color="white" />
            </TouchableOpacity>
            <Text style={{ color: "white", fontSize: 15, marginTop: 5 }}>
              History
            </Text>
          </View>
        </ScrollView>
      </View>

      <View style={styles.MyCoinsWrpper}>
        <View style={styles.MyCoinsTextWrapper}>
          <Text style={styles.MyCoinsText}>My Coins</Text>

          <TouchableOpacity>
            <Text style={styles.SeeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.OwnedCoinsWrapper}>
          {currency == "BNB" && (
            <Coin
              symbol="BNB"
              balance={balance}
              walletBalance={balanceUSD}
              setWalletBalance={setBalanceUSD}
            />
          )}

          {currency == "ETH" && (
            <Coin
              symbol="ETH"
              balance={balanceETH}
              walletBalance={balanceUSD}
              setWalletBalance={setBalanceUSD}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161616",
    alignItems: "center",
    justifyContent: "center",
  },
  pageWrapper: {
    // backgroundColor: 'blue',
    backgroundColor: "#161616",
    height: "100%",
    width: "100%",
  },
  BalanceWrapper: {
    // backgroundColor: 'purple',
    backgroundColor: "#161616",
    // height: '100%',
    padding: 60,
    width: "100%",
    paddingTop: 50,
    alignItems: "center",
  },
  BalanceText: {
    // text color white, bold, font 20
    color: "white",
    fontWeight: "bold",
    fontSize: 50,
    // font:'sebino',
  },
  BalanceTextCents: {
    // text color white, bold, font 20
    color: "white",
    fontWeight: "bold",
    fontSize: 40,
    // font:'sebino',
  },
  FunnctionalityButtonsWrapper: {
    // row
    flexDirection: "row",
    // backgroundColor: 'red',
    backgroundColor: "#161616",
  },
  FuncButton: {
    // backgroundColor: 'white',
    // make abckgourd color white, but with opaccity 0.7
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    ////////
    // neon border
    borderColor: "#9D00FF",
    borderWidth: 2,
    shadowColor: "#9D00FF",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,

    ////////
    height: 55,
    width: 55,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    // marginHorizontal: 10,
    // transperent background
    // backgroundColor: 'transparent',
    // opacity: 0.5,
    // borderWidth: 1,
  },
  FuncButtonIcon: {
    color: "white",
    fontSize: 50,
  },
  MyCoinsWrpper: {
    // backgroundColor: 'green',
    backgroundColor: "#161616",
    height: "100%",
    width: "100%",
    // paddingTop: 50,
    alignItems: "center",
    paddingTop: 10,
  },
  MyCoinsTextWrapper: {
    // backgroundColor: 'purple',
    // place items on the 2 ends, row, cetntered vertically
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    // backgroundColor: 'red',
  },
  MyCoinsText: {
    // text color white, bold, font 20
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    // font:'sebino',
  },
  SeeAllText: {
    // smaller text, slightly gray
    color: "#A9A9A9",
    fontSize: 15,
    // font:'sebino',
  },
  OwnedCoinsWrapper: {
    // backgroundColor: 'red',
    backgroundColor: "#161616",
    height: "100%",
    width: "100%",
    // paddingTop: 50,
    alignItems: "center",
    paddingTop: 10,
  },
  BalanceChartWrapper: {
    backgroundColor: "//#endregion161616",
    // height: '100%',
    width: "100%",
    // paddingTop: 50,
    alignItems: "center",
    paddingTop: 10,
  },
});

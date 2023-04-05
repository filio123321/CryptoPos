import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";
export default function LoginScreen() {
  const navigation = useNavigation();
  const [fontsLoaded, error] = Font.useFonts({
    "OpenSans-Medium": require("../assets/fonts/OpenSans-Medium.ttf"),
    "OpenSans-Bold": require("../assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  const BusinessRedirect = () => {
    navigation.replace("BusinessExchange");
  };

  const PersonalRedirect = () => {
    navigation.replace("Pay");
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>What is the purpose of this account</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={PersonalRedirect}>
          <Text style={styles.buttonText}>Personal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={BusinessRedirect}>
          <Text style={styles.buttonText}>Business</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginBottom: 30,
    color: "white",
    fontSize: 21,
    fontFamily: "OpenSans-Medium",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    width: "80%",
    backgroundColor: "#c3adf7",
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "OpenSans-Medium",
    fontSize: 17,
  },
});

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";
import React from "react";

export default function BusinessExchange() {
  const [fontsLoaded, error] = Font.useFonts({
    "OpenSans-Medium": require("../assets/fonts/OpenSans-Medium.ttf"),
    "OpenSans-Bold": require("../assets/fonts/OpenSans-Bold.ttf"),
  });
  const [number, onChangeNumber] = React.useState("");

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="0.00"
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
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
  input: {
    borderRadius: 20,
    padding: 8,
    width: "50%",
  },
  button: {
    width: "90%",
    backgroundColor: "blue",
    borderRadius: 20,
    borderWidth: 1,
    position: "absolute",
    bottom: "10%",
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "OpenSans-Medium",
    color: "#fff",
    fontSize: 24,
    padding: 10,
  },
});

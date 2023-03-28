import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
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
  function handleOnChangeNumber(text) {
    onChangeNumber(text);
  }
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      > */}
      <TextInput
        style={styles.input}
        onChangeText={handleOnChangeNumber}
        value={number}
        placeholder="0.00$"
        placeholderTextColor={"#fff"}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
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
    padding: 12,
    borderWidth: 1,
    borderColor: "#fff",
    width: "20%",
    position: "absolute",
    top: "10%",
    fontSize: 18,
    color: "#fff",
  },
  button: {
    width: "90%",
    backgroundColor: "blue",
    borderRadius: 20,
    borderWidth: 1,
    position: "absolute",
    bottom: "20%",
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "OpenSans-Medium",
    color: "#fff",
    fontSize: 24,
    padding: 10,
  },
});

import { StyleSheet, Text, TextInput, View } from "react-native";
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#050505",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 8,
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

import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/splash.png")}
        style={styles.logo}
        alt="Cat Haven Logo"
      />
      <View style={styles.developer}>
        <Text style={styles.text}>Developed by</Text>
        <Text style={styles.developerText}>Devive Guys</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  developer: {
    alignItems: "center",
    position: "absolute",
    bottom: 50,
  },
  text: {
    fontSize: 16,
    fontWeight: "normal",
    marginTop: 20,
  },
  developerText: {
    fontWeight: "bold",
    fontSize: 24,
    textTransform: "uppercase",
  },
});

export default SplashScreen;

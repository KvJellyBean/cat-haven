import React, { useEffect }  from "react";
import { View, ImageBackground, Image, Text, StyleSheet, TouchableOpacity, BackHandler, Alert} from "react-native";

const LandingScreen = ({ navigation }) => {

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "OK", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <ImageBackground source={require("../assets/landing-bg.png")} style={styles.background}>
      <View style={styles.container}>
        <Image source={require("../assets/splash.png")} style={styles.logo} alt="Cat Haven Logo" />
        <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.landingButton}>
          <Text style={styles.landingButtonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")} style={styles.landingButton1}>
          <Text style={styles.landingButtonText1}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 300,
    height: 300,
  },
  landingButton: {
    width: "50%",
    height: 50,
    backgroundColor: "#004AAD",
    borderRadius: 200,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },

  landingButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  landingButton1: {
    width: "50%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 200,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },

  landingButtonText1: {
    color: "#004AAD",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LandingScreen;

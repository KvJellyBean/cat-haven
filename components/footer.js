import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Iconify } from "react-native-iconify";

const Footer = ({ updateLikedStatus }) => {
  const navigation = useNavigation();
  const route = useRoute();

  const handlePress = (pageName) => {
    navigation.navigate(pageName, { updateLikedStatus }); // Navigate to the specified screen
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerButton} onPress={() => handlePress("Home")}>
        <Iconify icon="feather:home" size={30} color={route.name === "Home" ? "#004AAD" : "#777"} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={() => handlePress("PetList")}>
        <Image source={require("../assets/splash.png")} style={styles.footerImage} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={() => handlePress("Favourite")}>
        <Iconify icon="feather:heart" size={30} color={route.name === "Favourite" ? "#004AAD" : "#777"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 15,
    marginBottom: 20,
    elevation: 4,
  },
  footerButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerImage: {
    width: 70,
    height: 40,
  },
});

export default Footer;

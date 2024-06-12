import React from "react";
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const PaymentSuccessModal = ({ isVisible}) => {
    const navigation = useNavigation();
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Image source={require("../assets/failed.png")} style={styles.image} />
          <Text style={styles.message}>Payment Failed!</Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate("Home")}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  message: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#004AAD",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#004AAD",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default PaymentSuccessModal;

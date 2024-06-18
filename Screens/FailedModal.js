import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const PaymentFailedModal = ({ isVisible }) => {
  const navigation = useNavigation();
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Image
              source={require("../assets/failed.png")}
              style={styles.image}
            />
            <Text style={styles.message}>Payment Failed!</Text>
          </View>
          <Text style={styles.errorText}>
            Oops! Something went wrong. Please try again.
          </Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.navigate("Home")}
          >
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
    alignItems: "center",
    overflow: "hidden",
  },
  innerContainer: {
    alignItems: "center",
    backgroundColor: "#FFE5E5",
    width: 310,
    padding: 20,
  },
  errorText: {
    fontSize: 14,
    color: "#000",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 30,
    width: 250,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  message: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#AD0000",
  },
  closeButton: {
    backgroundColor: "#AD0000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 200,
    borderRadius: 5,
    marginBottom: 20,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
});

export default PaymentFailedModal;

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

const PaymentSuccessModal = ({ isVisible }) => {
  const navigation = useNavigation();
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Image
              source={require("../assets/success.png")}
              style={styles.image}
            />
            <Text style={styles.message}>Transaction Success</Text>
          </View>

          <Text style={styles.thanksText}>
            Your new fur-ever friend sends purrs and smiles. Thanks for
            adopting!
          </Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.closeButtonText}>Confirm</Text>
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
    // padding: 20,
    alignItems: "center",
    overflow: "hidden",
  },
  innerContainer: {
    alignItems: "center",
    backgroundColor: "#CFDAFF",
    width: 310,
    padding: 20,
  },
  thanksText: {
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
    color: "#004AAD",
  },
  closeButton: {
    backgroundColor: "#004AAD",
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

export default PaymentSuccessModal;

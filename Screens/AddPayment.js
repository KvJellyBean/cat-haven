import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const AddPayment = ({ isVisible, onSubmit, onHide }) => {
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const navigation = useNavigation();

  const submitForm = () => {
    onSubmit();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onHide}
    >
      <KeyboardAvoidingView style={styles.overlay} behavior="padding">
        <View style={styles.overlayContent}>
          <Text style={styles.overlayTitle}>Add Payment Form</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Name on Card"
            value={nameOnCard}
            onChangeText={setNameOnCard}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Card Number"
            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="numeric"
          />
          <View style={styles.expiryCvv}>
            <View style={styles.expiry}>
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                value={expiryDate}
                onChangeText={setExpiryDate}
              />
            </View>
            <View style={styles.cvv}>
              <TextInput
                style={styles.input}
                placeholder="CVV"
                value={cvv}
                onChangeText={setCvv}
                keyboardType="numeric"
              />
            </View>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter Postal Code"
            value={postalCode}
            onChangeText={setPostalCode}
            keyboardType="numeric"
          />
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={() => navigation.navigate("PaymentSuccess")}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onHide}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "85%",
    alignItems: "center",
  },
  overlayTitle: {
    color: "#004AAD",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 40,
    marginTop: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  expiryCvv: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  expiry: {
    flex: 1,
    marginRight: 5,
  },
  cvv: {
    flex: 1,
    marginLeft: 5,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
    marginBottom: 30,
  },
  continueButton: {
    backgroundColor: "#004AAD",
    padding: 10,
    flex: 1,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 10,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AddPayment;

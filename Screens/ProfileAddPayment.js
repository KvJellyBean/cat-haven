import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const AddPayment = ({ onSubmit }) => {
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
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.overlayContent}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.overlayTitle}>Add Payment Form</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name on Card</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Name on Card"
            value={nameOnCard}
            onChangeText={setNameOnCard}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Card Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Card Number"
            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.expiryCvv}>
          <View style={[styles.inputContainer, styles.expiry]}>
            <Text style={styles.label}>Expiry Date</Text>
            <TextInput
              style={styles.input}
              placeholder="MM/YY"
              value={expiryDate}
              onChangeText={setExpiryDate}
            />
          </View>

          <View style={[styles.inputContainer, styles.cvv]}>
            <Text style={styles.label}>Security Code</Text>
            <TextInput
              style={styles.input}
              placeholder="CVV"
              value={cvv}
              onChangeText={setCvv}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>ZIP / Postal Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Postal Code"
            value={postalCode}
            onChangeText={setPostalCode}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => navigation.navigate("PaymentSuccess")}
          >
            <Text style={styles.buttonText}>Add new payment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  backButton: {
    position: "absolute",
    left: 0,
    top: 25,
  },
  overlayContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  overlayTitle: {
    color: "#004AAD",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 40,
    marginTop: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 30,
  },
  label: {
    color: "#666",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  expiryCvv: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  expiry: {
    flex: 1,
    marginRight: 10,
  },
  cvv: {
    flex: 1,
    marginLeft: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  continueButton: {
    backgroundColor: "#004AAD",
    padding: 12,
    flex: 1,
    marginRight: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "capitalize",
  },
});

export default AddPayment;

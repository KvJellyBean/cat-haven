import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Button, Modal, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AddPaymentModal from "./AddPayment";

const PaymentModal = ({ isVisible, onHide }) => {
  const [isAddPaymentModalVisible, setIsAddPaymentModalVisible] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null); // Menyimpan metode pembayaran yang dipilih
  const navigation = useNavigation();
  const [isMethodSelected, setIsMethodSelected] = useState(false);

  const toggleModal = () => {
    onHide();
    setIsAddPaymentModalVisible(false);
  };

  const showAddPaymentModal = () => {
    setIsAddPaymentModalVisible(true);
  };

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
    setIsMethodSelected(true); // Metode dipilih, aktifkan tombol "Continue"
  };

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={toggleModal}>
        {!isAddPaymentModalVisible && (
          <View style={styles.overlay}>
            <View style={styles.overlayContent}>
              <Text style={styles.overlayTitle}>Payment Method</Text>
              <View style={styles.paymentMethod}>
                <TouchableOpacity
                  style={[styles.method, selectedMethod === "Apple" && styles.activeMethod]} // Menambahkan gaya aktif jika metode dipilih
                  onPress={() => handleSelectMethod("Apple")}
                >
                  <Image source={require("../assets/applepay.png")} style={styles.methodImage} />
                  <View style={styles.methodDetails}>
                    <Text style={styles.methodName}>Apple ID</Text>
                    <Text style={styles.methodInfo}>****4567</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.method, selectedMethod === "MasterCard" && styles.activeMethod]} onPress={() => handleSelectMethod("MasterCard")}>
                  <Image source={require("../assets/mastercard.png")} style={styles.methodImage1} />
                  <View style={styles.methodDetails}>
                    <Text style={styles.methodName}>Master Card</Text>
                    <Text style={styles.methodInfo}>****6356</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.method, selectedMethod === "Visa" && styles.activeMethod]} onPress={() => handleSelectMethod("Visa")}>
                  <Image source={require("../assets/visa.png")} style={styles.methodImage2} />
                  <View style={styles.methodDetails}>
                    <Text style={styles.methodName}>Visa</Text>
                    <Text style={styles.methodInfo}>****5645</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addMethodButton} onPress={showAddPaymentModal}>
                  <Text style={styles.addMethodButtonText}>+ Add Payment Method</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.overlayButtons}>
                <Button
                  title="Continue"
                  onPress={isMethodSelected ? onHide : null} 
                  color="#004AAD"
                  disabled={!isMethodSelected} 
                />

                <Button title="Cancel" onPress={onHide} color="#e23c3c" />
              </View>
            </View>
          </View>
        )}
      </Modal>
      <AddPaymentModal isVisible={isAddPaymentModalVisible} onHide={() => setIsAddPaymentModalVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  overlayTitle: {
    textAlign: "center",
    color: "#004AAD",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  paymentMethod: {
    marginBottom: 20,
  },
  method: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  activeMethod: {
    backgroundColor: "#F0F0F0", // Warna latar belakang untuk metode yang dipilih
  },
  methodImage: {
    width: 80,
    height: 56,
    marginRight: 25,
  },
  methodImage1: {
    width: 80,
    height: 56,
    marginRight: 25,
  },
  methodImage2: {
    width: 80,
    height: 56,
    marginRight: 25,
  },
  methodName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  methodInfo: {
    fontSize: 15,
    color: "#004AAD",
  },
  overlayButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  addMethodButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  addMethodButtonText: {
    fontSize: 16,
    color: "#004AAD",
  },
});

export default PaymentModal;

import React from "react";
import { View, Text, Image, StyleSheet, Button, Modal, TouchableOpacity } from "react-native";

const PaymentModal = ({ isVisible, onHide }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onHide}>
      <View style={styles.overlay}>
        <View style={styles.overlayContent}>
          <Text style={styles.overlayTitle}>Payment Method</Text>
          <View style={styles.paymentMethod}>
            <TouchableOpacity style={styles.method}>
              <Image source={require("../assets/apple.png")} style={styles.methodImage} />
              <View style={styles.methodDetails}>
                <Text style={styles.methodName}>Apple ID</Text>
                <Text style={styles.methodInfo}>****4567</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.method}>
              <Image source={require("../assets/mastercard.png")} style={styles.methodImage1} />
              <View style={styles.methodDetails}>
                <Text style={styles.methodName}>Master Card</Text>
                <Text style={styles.methodInfo}>****6356</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.method}>
              <Image source={require("../assets/visa.png")} style={styles.methodImage} />
              <View style={styles.methodDetails}>
                <Text style={styles.methodName}>Visa</Text>
                <Text style={styles.methodInfo}>****5645</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addMethodButton}>
              <Text style={styles.addMethodButtonText}>+ Add Payment Method</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.overlayButtons}>
            <Button title="Continue" onPress={onHide} color="#004AAD" />
            <Button title="Cancel" onPress={onHide} color="#e23c3c" />
          </View>
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
  methodImage: {
    width: 80,
    height: 80,
    marginRight: 25,
  },
  methodImage1: {
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Menengahkan konten secara horizontal
    marginBottom: 10,
  },
  addMethodButtonText: {
    fontSize: 16,
    color: '#004AAD',
  },
});

export default PaymentModal;

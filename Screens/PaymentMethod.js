import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { paymentMethods } from "../data";
import AddPaymentModal from "./AddPayment";
import PaymentSuccessModal from "./SuccessModal";
import PaymentFailedModal from "./FailedModal";

const PaymentModal = ({
  isVisible,
  onHide,
  onPaymentSuccess,
  onPaymentFailed,
}) => {
  const [isAddPaymentModalVisible, setIsAddPaymentModalVisible] =
    useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isMethodSelected, setIsMethodSelected] = useState(false);
  const [isPaymentSuccessModalVisible, setIsPaymentSuccessModalVisible] =
    useState(false);
  const [isPaymentFailedModalVisible, setIsPaymentFailedModalVisible] =
    useState(false);

  const toggleModal = () => {
    onHide();
    setIsAddPaymentModalVisible(false);
  };

  const showAddPaymentModal = () => {
    setIsAddPaymentModalVisible(true);
  };

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
    setIsMethodSelected(true);
  };

  const handleContinue = () => {
    setIsPaymentSuccessModalVisible(true);
    onPaymentSuccess();
  };

  const handleCancel = () => {
    setIsPaymentFailedModalVisible(true);
    onPaymentFailed();
    onHide();
  };

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={toggleModal}
      >
        {!isAddPaymentModalVisible && (
          <View style={styles.overlay}>
            <View style={styles.overlayContent}>
              <Text style={styles.overlayTitle}>Payment Method</Text>
              <View style={styles.paymentMethod}>
                {paymentMethods.map((method) => (
                  <TouchableOpacity
                    key={method.key}
                    style={[
                      styles.method,
                      selectedMethod === method.method && styles.activeMethod,
                    ]}
                    onPress={() => handleSelectMethod(method.method)}
                  >
                    <Image source={method.logo} style={styles.methodImage} />
                    <View style={styles.methodDetails}>
                      <Text style={styles.methodName}>{method.method}</Text>
                      <Text style={styles.methodInfo}>{method.paymentId}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={styles.addMethodButton}
                  onPress={showAddPaymentModal}
                >
                  <Text style={styles.addMethodButtonText}>
                    + Add Payment Method
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.overlayButtons}>
                <TouchableOpacity
                  style={[styles.button, styles.continueButton]}
                  onPress={isMethodSelected ? handleContinue : null}
                  disabled={!isMethodSelected}
                >
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={handleCancel}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Modal>
      <AddPaymentModal
        isVisible={isAddPaymentModalVisible}
        onHide={() => setIsAddPaymentModalVisible(false)}
      />
      <PaymentSuccessModal isVisible={isPaymentSuccessModalVisible} />
      <PaymentFailedModal
        isVisible={isPaymentFailedModalVisible}
        onHide={() => setIsPaymentFailedModalVisible(false)}
      />
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
    width: "85%",
    height: "80%",
    justifyContent: "space-between",
  },
  overlayTitle: {
    textAlign: "center",
    color: "#004AAD",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  paymentMethod: {
    flex: 1,
    marginBottom: 20,
  },
  method: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
  },
  activeMethod: {
    backgroundColor: "#F0F0F0",
  },
  methodImage: {
    width: 80,
    height: 56,
    marginRight: 25,
  },
  methodDetails: {
    flex: 1,
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
    gap: 10,
    position: "absolute",
    alignSelf: "center",
    bottom: 40,
  },
  button: {
    width: 140,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  continueButton: {
    backgroundColor: "#004AAD",
  },
  cancelButton: {
    backgroundColor: "#e23c3c",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  addMethodButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 20,
    marginHorizontal: 15,
  },
  addMethodButtonText: {
    fontSize: 16,
    color: "#004AAD",
  },
});

export default PaymentModal;

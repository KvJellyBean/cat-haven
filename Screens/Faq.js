import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { faqList } from "../data";

const Faq = ({ isVisible, onClose }) => {
  const [selectedFaq, setSelectedFaq] = useState(null);

  const toggleDescription = (index) => {
    if (selectedFaq === index) {
      setSelectedFaq(null);
    } else {
      setSelectedFaq(index);
    }
  };

  useEffect(() => {
    if (!isVisible) {
      setSelectedFaq(null); // Reset selectedFaq state when modal is closed
    }
  }, [isVisible]);

  const closeModal = () => {
    onClose();
    setSelectedFaq(null); // Reset selectedFaq state when modal is closed
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContent}>
        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>&#10006;</Text>
        </TouchableOpacity>
        <Text style={styles.modalTitle}>FAQ</Text>
        {faqList.map((faq, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => toggleDescription(index)}
            style={styles.faqItem}
          >
            <Text style={styles.faqQuestion}>{faq.question}</Text>
            {selectedFaq === index && (
              <Text style={styles.faqAnswer}>{faq.answer}</Text>
            )}
          </TouchableOpacity>
        ))}

        <View style={styles.watermark}>
          <Text style={styles.watermarkText}>
            Developed by <Text style={{ fontWeight: "bold" }}>DEVIVE GUYS</Text>
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    position: "absolute",
    width: "80%",
    minHeight: "80%",
    top: "8%",
    alignSelf: "center",
    backgroundColor: "#fff",
    marginHorizontal: 30,
    marginVertical: 15,
    paddingVertical: 30,
    paddingBottom: 70,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 28,
    letterSpacing: 2,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: "#004AAD",
  },
  faqItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  faqQuestion: {
    fontWeight: "bold",
    fontSize: 16,
  },
  faqAnswer: {
    marginTop: 5,
  },
  closeButton: {
    position: "absolute",
    top: -20,
    right: -10,
    backgroundColor: "#E50B0B",
    borderRadius: 999,
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 22,
    top: -2,
    fontWeight: "bold",
  },
  watermark: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 10,
    backgroundColor: "#004AAD",
    alignItems: "center",
    borderBottomRightRadius: 20,
  },
  watermarkText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default Faq;

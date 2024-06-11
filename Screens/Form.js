import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AdoptForm = ({ modalVisible, setModalVisible }) => {
  const navigation = useNavigation();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalView}>
        <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
          <Text style={styles.closeText}>×</Text>
        </Pressable>
        <Text style={styles.formTitle}>Adoption Form</Text>
        <ScrollView style={styles.form}>
          <TextInput style={styles.input} placeholder="First Name" />
          <TextInput style={styles.input} placeholder="Last Name" />
          <TextInput style={styles.input} placeholder="Date of Birth" keyboardType="date" />
          <TextInput style={styles.input} placeholder="Type of Pet" />
          <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
          <TextInput style={styles.input} placeholder="Address" />
          <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" />
          <TextInput style={styles.input} placeholder="Do You Have Children?" />
          <TouchableOpacity style={styles.submitButton} onPress={() => navigation.push('PaymentMethod')}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    marginTop: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeText: {
    fontSize: 24,
  },
  formTitle: {
    fontSize: 35,
    marginBottom: 20,
    color: "#004AAD",
    fontWeight: "bold",
  },
  form: {
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#004AAD",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});

export default AdoptForm;

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { collection, doc, setDoc, getDoc } from "firebase/firestore"; // Import necessary Firestore functions
import { db, auth } from "../firebase";

const AdoptForm = ({ petId, pet, modalVisible, setModalVisible }) => {
  const navigation = useNavigation();

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    DOB: null, // Tanggal lahir
    typeofpet: "",
    email: "",
    address: "",
    phoneNumber: "", // Nomor telepon
    haveChildren: "", // Opsional
  });

  const [errors, setErrors] = useState({});
  const [existingForm, setExistingForm] = useState(false);

  useEffect(() => {
    checkExistingForm(); 
  }, []);

  const checkExistingForm = async () => { 
    try {
      const user = auth.currentUser;
      if (!user) return;

      const userFormRef = doc(db, "users", user.uid, "form", petId);
      const docSnap = await getDoc(userFormRef);

      if (docSnap.exists()) {
        setExistingForm(true);
      } else {
        setExistingForm(false);
      }
    } catch (error) {
      console.error("Error checking existing form:", error);
    }
  }

  const handleInputChange = (key, value) => {

    if (key === "phoneNumber") {
      value = value.replace(/[^0-9]/g, "");
    }

    setFormData({ ...formData, [key]: value });
    setErrors({ ...errors, [key]: '' });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    const requiredFields = [
      { key: 'firstName', label: 'First name' },
      { key: 'lastName', label: 'Last name' },
      { key: 'DOB', label: 'Date of birth' },
      { key: 'typeofpet', label: 'Type of pet' },
      { key: 'email', label: 'Email' },
      { key: 'address', label: 'Address' },
      { key: 'phoneNumber', label: 'Phone number' }
    ];
    const newErrors = {};
  
    requiredFields.forEach(field => {
      if (!formData[field.key]) {
        newErrors[field.key] = `${field.label} is required`;
      }
    });
  
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const user = auth.currentUser;
        if (!user) return;
    
        // Reference to the user's form document for the specific pet
        const userFormRef = doc(db, "users", user.uid, "form", petId);
        await setDoc(userFormRef, {
          ...formData,
          petId,
          userId: user.uid,
        });
    
        // Reference to the user's cart document for the specific pet
        const userCartRef = doc(db, "users", user.uid, "cart", petId);
        await setDoc(userCartRef, {
          name: pet.name,
          breed: pet.breed,
          adoptionFee: pet.adoptionFee,
          image: pet.image,
        });
    
        console.log("Form data submitted successfully");
        navigation.navigate('CartPageScreen', { petId: petId });
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };
  

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.DOB;
    setShowDatePicker(false);
    setFormData({ ...formData, DOB: currentDate });
    setErrors({ ...errors, DOB: '' });
  };

  const formatDate = (date) => {
    if (!date) return "Select Date of Birth";
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3'); // Convert to MM/DD/YYYY
  };

  const showAlert = () => {
    Alert.alert(
      "Form Already Submitted",
      "You have already submitted the adoption form for this pet.",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  };

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
          {errors.firstName ? <Text style={styles.errorText}>{errors.firstName}</Text> : null}
          <TextInput
            style={[styles.input, errors.firstName && styles.errorInput]}
            placeholder="First Name"
            onChangeText={(text) => handleInputChange("firstName", text)}
          />

          {errors.lastName ? <Text style={styles.errorText}>{errors.lastName}</Text> : null}
          <TextInput
            style={[styles.input, errors.lastName && styles.errorInput]}
            placeholder="Last Name"
            onChangeText={(text) => handleInputChange("lastName", text)}
          />

          {errors.DOB ? <Text style={styles.errorText}>{errors.DOB}</Text> : null}
          <TouchableOpacity style={[styles.input, errors.DOB && styles.errorInput]} onPress={() => setShowDatePicker(true)}>
            <Text style={[styles.dateText, formData.DOB ? styles.dateTextSelected : styles.dateTextPlaceholder]}>
              {formatDate(formData.DOB)}
            </Text>
          </TouchableOpacity>

          {errors.typeofpet ? <Text style={styles.errorText}>{errors.typeofpet}</Text> : null}
          <TextInput
            style={[styles.input, errors.typeofpet && styles.errorInput]}
            placeholder="Type of Pet"
            onChangeText={(text) => handleInputChange("typeofpet", text)}
          />

          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          <TextInput
            style={[styles.input, errors.email && styles.errorInput]}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(text) => handleInputChange("email", text)}
          />

          {errors.address ? <Text style={styles.errorText}>{errors.address}</Text> : null}
          <TextInput
            style={[styles.input, errors.address && styles.errorInput]}
            placeholder="Address"
            onChangeText={(text) => handleInputChange("address", text)}
          />

          {errors.phoneNumber ? <Text style={styles.errorText}>{errors.phoneNumber}</Text> : null}
          <TextInput
            style={[styles.input, errors.phoneNumber && styles.errorInput]}
            placeholder="Phone Number"
            keyboardType="number-pad"
            onChangeText={(text) => handleInputChange("phoneNumber", text.replace(/[^0-9]/g, ''))}
          />

          <TextInput
            style={styles.input}
            placeholder="Do You Have Children?"
            onChangeText={(text) => handleInputChange("haveChildren", text)}
          />

          <TouchableOpacity style={styles.submitButton} onPress={existingForm ? showAlert : handleSubmit}>
            <Text style={styles.buttonText}>{existingForm ? "Already Submitted" : "Submit"}</Text>
          </TouchableOpacity>
        </ScrollView>
        {showDatePicker && (
          <DateTimePicker
            value={formData.DOB || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
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

  dateText : {
    color: "#626262",
  },

  dateTextPlaceholder: {
    color: "#626262",
  },
  dateTextSelected: {
    color: "#000000",
  },

  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
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

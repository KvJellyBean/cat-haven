import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import catsData from "../assets/data/cats";
import { SelectList } from "react-native-dropdown-select-list";

const AdoptForm = ({
  petId,
  pet,
  isVisible,
  onHide,
  onFormSubmit,
  formStatus,
}) => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    DOB: null,
    typeofpet: "",
    email: "",
    address: "",
    phoneNumber: "",
    haveChildren: "",
  });
  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);

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
        onFormSubmit();
      }
    } catch (error) {
      console.error("Error checking existing form:", error);
    }
  };

  const handleInputChange = (key, value) => {
    if (key === "phoneNumber") {
      value = value.replace(/[^0-9]/g, "");
    } else if (key === "typeofpet") {
      value = value;
    }

    setFormData({ ...formData, [key]: value });
    setErrors({ ...errors, [key]: "" });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    const requiredFields = [
      { key: "firstName", label: "First name" },
      { key: "lastName", label: "Last name" },
      { key: "DOB", label: "Date of birth" },
      { key: "typeofpet", label: "Type of pet" },
      { key: "email", label: "Email" },
      { key: "address", label: "Address" },
      { key: "phoneNumber", label: "Phone number" },
    ];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field.key]) {
        newErrors[field.key] = `${field.label} is required`;
      }
    });

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) return;

      const userFormRef = doc(db, "users", user.uid, "form", petId);
      await setDoc(userFormRef, {
        ...formData,
        petId,
        userId: user.uid,
      });

      const userCartRef = doc(db, "users", user.uid, "cart", petId);
      await setDoc(userCartRef, {
        ...pet,
      });

      console.log("Form data submitted successfully");
      onHide();
      onFormSubmit();
      navigation.navigate("CartPageScreen", { pet });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.DOB;
    setShowDatePicker(false);
    setFormData({ ...formData, DOB: currentDate });
    setErrors({ ...errors, DOB: "" });
  };

  const formatDate = (date) => {
    if (!date) return "Select Date of Birth";
    return date
      .toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/(\d+)\/(\d+)\/(\d+)/, "$2/$1/$3");
  };

  const breedOptions = catsData.map((cat) => cat.breed);
  breedOptions.sort((a, b) => a.localeCompare(b));

  const closeModal = () => {
    setFormData({
      firstName: "",
      lastName: "",
      DOB: null,
      typeofpet: "",
      email: "",
      address: "",
      phoneNumber: "",
      haveChildren: "",
    });
    setErrors({});
    setShowDatePicker(false);
    onHide();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onHide}
    >
      <View style={styles.modalView}>
        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>&#10006;</Text>
        </TouchableOpacity>
        <Text style={styles.formTitle}>Adoption Form</Text>
        <ScrollView style={styles.form}>
          {errors.firstName && (
            <Text style={styles.errorText}>{errors.firstName}</Text>
          )}
          <TextInput
            style={[styles.input, errors.firstName && styles.errorInput]}
            placeholder="Enter your first name"
            onChangeText={(text) => handleInputChange("firstName", text)}
          />
          {errors.lastName && (
            <Text style={styles.errorText}>{errors.lastName}</Text>
          )}
          <TextInput
            style={[styles.input, errors.lastName && styles.errorInput]}
            placeholder="Enter your last name"
            onChangeText={(text) => handleInputChange("lastName", text)}
          />
          {errors.DOB && <Text style={styles.errorText}>{errors.DOB}</Text>}
          <TouchableOpacity
            style={[styles.input, errors.DOB && styles.errorInput]}
            onPress={() => setShowDatePicker(true)}
          >
            <Text
              style={[
                styles.dateText,
                formData.DOB
                  ? styles.dateTextSelected
                  : styles.dateTextPlaceholder,
              ]}
            >
              {formatDate(formData.DOB)}
            </Text>
          </TouchableOpacity>
          {errors.typeofpet && (
            <Text style={styles.errorText}>{errors.typeofpet}</Text>
          )}
          <SelectList
            data={breedOptions}
            placeholder="Select type of cat"
            style={[styles.input, errors.typeofpet && styles.errorInput]}
            setSelected={(selected) => handleInputChange("typeofpet", selected)}
            search={false}
            boxStyles={[styles.input, errors.typeofpet && styles.errorInput]}
            dropdownStyles={styles.selectlist}
            maxHeight={100}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          <TextInput
            style={[styles.input, errors.email && styles.errorInput]}
            placeholder="Enter your email address"
            keyboardType="email-address"
            onChangeText={(text) => handleInputChange("email", text)}
          />
          {errors.address && (
            <Text style={styles.errorText}>{errors.address}</Text>
          )}
          <TextInput
            style={[styles.input, errors.address && styles.errorInput]}
            placeholder="Enter your address"
            onChangeText={(text) => handleInputChange("address", text)}
          />
          {errors.phoneNumber && (
            <Text style={styles.errorText}>{errors.phoneNumber}</Text>
          )}
          <TextInput
            style={[styles.input, errors.phoneNumber && styles.errorInput]}
            placeholder="Enter your phone number"
            keyboardType="number-pad"
            onChangeText={(text) =>
              handleInputChange("phoneNumber", text.replace(/[^0-9]/g, ""))
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Do You Have Children?"
            onChangeText={(text) => handleInputChange("haveChildren", text)}
          />
          <TouchableOpacity
            style={[
              styles.submitButton,
              formStatus ? styles.disabledButton : null,
            ]}
            onPress={() => {
              if (formStatus) {
                Alert.alert(
                  "Form Submitted",
                  "Your form has been submitted. You can only submit one form per pet.",
                  [{ text: "OK", onPress: onHide }]
                );
              } else {
                handleSubmit();
              }
            }}
            disabled={formStatus}
          >
            <Text style={styles.buttonText}>Submit</Text>
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
    top: -20,
    right: 0,
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
  formTitle: {
    fontSize: 35,
    marginBottom: 20,
    color: "#004AAD",
    fontWeight: "bold",
  },
  selectlist: {
    width: "100%",
    marginBottom: 10,
    marginTop: 10,
  },
  form: {
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 10,
    paddingHorizontal: 25,
    marginBottom: 10,
  },
  selectlist: {
    borderWidth: 1,
    marginTop: -10,
    marginBottom: 10,
  },
  dateText: {
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

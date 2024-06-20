import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { breed, age, location, weightCategory } from "../data";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function FilterScreen() {
  const navigation = useNavigation();
  const [selectedBreed, setSelectedBreed] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedWeightCategory, setSelectedWeightCategory] = useState("");

  const handleSelectOption = (option) => {
    setSelectedGender(option);
  };

  const applyFilters = () => {
    const filters = {
      breed: selectedBreed,
      gender: selectedGender,
      location: selectedLocation,
      age: selectedAge,
      weightCategory: selectedWeightCategory,
    };
    navigation.navigate("PetList", { filters });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Filter</Text>
        <Text style={styles.label}>Breed</Text>
        <SelectList
          data={breed}
          setSelected={setSelectedBreed}
          boxStyles={{ width: 325 }}
          placeholder="Select a breed"
        />

        <Text style={styles.label}>Sex</Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[styles.optionButton, selectedGender === "Male" && styles.selectedOption]}
            onPress={() => handleSelectOption("Male")}
          >
            <Text style={[styles.optionText, selectedGender === "Male" && styles.selectedOptionText]}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedGender === "Female" && styles.selectedOption]}
            onPress={() => handleSelectOption("Female")}
          >
            <Text style={[styles.optionText, selectedGender === "Female" && styles.selectedOptionText]}>Female</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Location</Text>
        <SelectList
          data={location}
          setSelected={setSelectedLocation}
          boxStyles={{ width: 325 }}
          placeholder="Select a location"
        />

        <Text style={styles.label}>Age</Text>
        <SelectList
          data={age}
          setSelected={setSelectedAge}
          boxStyles={{ width: 325 }}
          placeholder="Select the age"
        />

        <Text style={styles.label}>Weight (size)</Text>
        <SelectList
          data={weightCategory}
          setSelected={setSelectedWeightCategory}
          boxStyles={{ width: 325 }}
          placeholder="Select the weight"
        />

        <TouchableOpacity onPress={applyFilters} style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply Filter</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 30,
  },
  backButton: {
    top: 38,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#004AAD',
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 50,
  },
  label: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: "row",
  },
  optionButton: {
    width: 100,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#004AAD",
    marginRight: 10,
  },
  optionText: {
    color: "#004AAD",
    fontSize: 18,
    fontWeight: "bold",
  },
  selectedOption: {
    backgroundColor: "#004AAD",
  },
  selectedOptionText: {
    color: "#fff",
  },
  applyButton: {
    width: '50%',
    height: 50,
    backgroundColor: '#004AAD',
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 70,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

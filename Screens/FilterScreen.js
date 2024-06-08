import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { species, age, weight, location } from "../data";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function FilterScreen() {

    const navigation = useNavigation();

    const [selectedOption, setSelectedOption] = useState("");

    const handleSelectOption = (option) => {
        setSelectedOption(option);
    };

    const [selected, setSelected] = React.useState("");

    return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Filter</Text>
      <Text style={styles.Breed}>Breed</Text>

      <SelectList 
        style = {styles.dropdown} 
        data = {species}  
        setSelected = {setSelected} 
        boxStyles={{width: 325}}
        placeholder="Select a breed"
      />
      
      <Text style={styles.Sex}>Sex</Text>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedOption === "Male" && styles.selectedOption,
          ]}
          onPress={() => handleSelectOption("Male")}
        >
          <Text
            style={[
              styles.optionText,
              selectedOption === "Male" && styles.selectedOptionText,
            ]}
          >
            Male
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedOption === "Female" && styles.selectedOption,
          ]}
          onPress={() => handleSelectOption("Female")}
        >
          <Text
            style={[
              styles.optionText,
              selectedOption === "Female" && styles.selectedOptionText,
            ]}
          >
            Female
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.location}>Location</Text>

      <SelectList 
        style = {styles.dropdown} 
        data = {location}  
        setSelected = {setSelected} 
        boxStyles={{width: 325}}
        placeholder="Select a location"
      />

      <Text style={styles.age}>Age</Text>

      <SelectList 
        style = {styles.dropdown} 
        data = {age}  
        setSelected = {setSelected} 
        boxStyles={{width: 325}}
        placeholder="Select the age"
      />

      <Text style={styles.weight}>Weight (size)</Text>

      <SelectList 
        style = {styles.dropdown} 
        data = {weight}  
        setSelected = {setSelected} 
        boxStyles={{width: 325}}
        placeholder="Select the weight"
      />

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.applyButton}>
        <Text style={styles.applyButtonText}>Apply Filter</Text>
      </TouchableOpacity>
    </View>
    );
};

const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: 30,
    },

    backButton: {
      alignSelf: 'left',
      top: 70,
      right: 310,
    },

    backButton: {
      position: 'absolute',
      top: 73,
      left: 30,
    },
  
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#004AAD',
      textAlign: 'center',
      alignSelf: 'center',
      marginBottom: 50,
    },

    Breed: {
      fontSize: 18,
      color: '#000000',
      fontWeight: 'bold',
      textAlign: 'left',
      marginBottom: 10,
    },

    Sex: {
      fontSize: 18,
      color: '#000000',
      fontWeight: 'bold',
      textAlign: 'left',
      marginTop: 20,
      marginBottom: 10,
    },

    optionsContainer: {
      flexDirection: "row", // Mengatur pilihan menjadi sejajar horizontal
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
      marginRight: 10, // Menambahkan jarak antara pilihan
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

    location: {
      fontSize: 18,
      color: '#000000',
      fontWeight: 'bold',
      textAlign: 'left',
      marginBottom: 10,
    },

    age: {
      fontSize: 18,
      color: '#000000',
      fontWeight: 'bold',
      textAlign: 'left',
      marginTop: 20,
      marginBottom: 10,
    },

    weight: {
      fontSize: 18,
      color: '#000000',
      fontWeight: 'bold',
      textAlign: 'left',
      marginTop: 20,
      marginBottom: 10,
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
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SelectList } from 'react-native-dropdown-select-list';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const locations = [
    { key: '1', value: 'Indonesia' },
    { key: '2', value: 'USA' },
    { key: '3', value: 'UK' },
    { key: '4', value: 'Turkei' },
    { key: '5', value: 'China' },
    { key: '6', value: 'Taiwan' },
    { key: '7', value: 'Japan' },
    { key: '8', value: 'Korea' },
    { key: '9', value: 'Philipnes' },
    { key: '10', value: 'Albania' },
    { key: '11', value: 'Papua Newgiune' },
    { key: '12', value: 'Australia' },
    { key: '13', value: 'Malaysia' },
    { key: '14', value: 'Singapura' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.pop()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Edit Profile</Text>
      <Image
        source={{ uri: "https://via.placeholder.com/100" }} // Replace with actual image URL
        style={styles.profileImage}
      />

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Hillary Clinton"
        placeholderTextColor="#626262"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <Text style={styles.label}>Status</Text>
      <TextInput
        style={styles.input}
        placeholder="I love all animals"
        placeholderTextColor="#626262"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <Text style={styles.label}>Date of Birth</Text>
      <TextInput
        style={styles.input}
        placeholder="23/05/1995"
        placeholderTextColor="#626262"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <Text style={styles.location}>Location</Text>
      <SelectList 
        setSelected={setLocation}
        data={locations}
        boxStyles={styles.dropdown}
        placeholder="Select a location"
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    position: "relative"
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#004AAD",
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  location: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: "#F1F4FF",
  },
  dropdown: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: "#F1F4FF",
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#004AAD",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

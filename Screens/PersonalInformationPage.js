import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

export default function EditProfile({ route }) {
  const navigation = useNavigation();
  const { user, setUser } = route.params;
  const [theUser, setTheUser] = useState(user);
  const auth = getAuth();
  const firestore = getFirestore(); // Instance Firestore

  const handleSaveChanges = async () => {
    try {
      // Update display name in Firebase Auth
      await updateProfile(auth.currentUser, {
        displayName: theUser.username,
      });

      // Set user data in Firestore
      const userRef = doc(firestore, "users", auth.currentUser.uid);
      await setDoc(userRef, {
        username: theUser.username,
        status: theUser.status,
        location: theUser.location,
        dateOfBirth: theUser.dateOfBirth,
        image: theUser.image,
      });
      setUser(theUser);
      navigation.pop(); // Navigate back after saving
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
      </View>
      <Image
        source={theUser.image} // Replace with actual image URL
        style={styles.profileImage}
      />

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="#626262"
        value={theUser.username}
        onChangeText={(text) => setTheUser({ ...theUser, username: text })}
      />

      <Text style={styles.label}>Status</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your profile status (e.g. I love cats!)"
        placeholderTextColor="#626262"
        value={theUser.status}
        onChangeText={(text) => setTheUser({ ...theUser, status: text })}
      />

      <Text style={styles.label}>Date of Birth</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your date of birth (e.g. 01/01/2000)"
        placeholderTextColor="#626262"
        value={theUser.dateOfBirth}
        onChangeText={(text) => setTheUser({ ...theUser, dateOfBirth: text })}
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your location (e.g. Jakarta, Indonesia)"
        placeholderTextColor="#626262"
        value={theUser.location}
        onChangeText={(text) => setTheUser({ ...theUser, location: text })}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleSaveChanges}>
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
    // justifyContent: "center",
    padding: 30,
    position: "relative",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginTop: 50,
    marginBottom: 20,
  },
  backButton: {
    position: "absolute",
    top: 5,
    left: 0,
  },
  title: {
    fontSize: 30,
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

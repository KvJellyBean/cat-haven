import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Import default profile image from assets
import defaultProfileImage from "../assets/Kucing.jpg";

export default function EditProfile({ route }) {
  const navigation = useNavigation();
  const { user, setUser } = route.params;
  const [theUser, setTheUser] = useState(user);
  const auth = getAuth();
  const firestore = getFirestore();

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
            image: theUser.image, // Ensure image URL is updated
        });
        setUser(theUser);
        navigation.pop(); // Navigate back after saving
    } catch (error) {
        console.error("Error updating profile: ", error);
        Alert.alert('Error', 'Failed to update profile. Please try again.');
    }
};


  const handleChooseImage = async () => {
    try {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert(
                "Permission Denied",
                "Permission to access camera is required!"
            );
            return;
        }

        const pickerResult = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log('Picker Result:', pickerResult);

        if (!pickerResult.canceled) {
            const uri = pickerResult.assets[0].uri;
            console.log(`Image URI: ${uri}`);
            // Upload image to Firebase Storage
            await uploadImageAsync(uri);
        }
    } catch (error) {
        console.error("Error choosing image: ", error);
        Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
};


const uploadImageAsync = async (uri) => {
  try {
      if (!uri) {
          throw new Error('Image URI is null or undefined');
      }

      console.log(`Uploading image with URI: ${uri}`);

      const response = await fetch(uri);
      console.log(`Fetch response status: ${response.status}`);
      if (!response.ok) {
          throw new Error(`Fetch response not ok: ${response.statusText}`);
      }
      const blob = await response.blob();

      const storage = getStorage();
      const fileName = `profile_images/${user.uid}-${Date.now()}`; // Create a unique file name
      const storageRef = ref(storage, fileName);
      const snapshot = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);

      console.log(`Image uploaded successfully: ${downloadURL}`);
      setTheUser({ ...theUser, image: downloadURL });
  } catch (error) {
      console.error('Error uploading image:', error.message);
      Alert.alert('Error', `Failed to upload image: ${error.message}. Please check your network and try again.`);
  }
};



  // Function to determine profile image source
  const getProfileImageSource = () => {
    const { image } = theUser;
    if (image && typeof image === 'string') {
      return { uri: image };
    } else {
      return defaultProfileImage; // Use default image if user's image is not available
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
      <TouchableOpacity onPress={handleChooseImage}>
        <Image
          source={getProfileImageSource()}
          style={styles.profileImage}
        />
      </TouchableOpacity>

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
  input: {
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
});

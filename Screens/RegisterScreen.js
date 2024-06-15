import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { app } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const auth = getAuth(app);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false);

  const registerUser = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      console.log("Username updated:", name);
      console.log("User registered:", userCredential.user);

      setRegistered(true);
      setTimeout(() => {
        navigation.navigate("Login");
      }, 2000);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      setError("Password and confirm password do not match");
      setTimeout(() => setError(""), 6000);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setTimeout(() => setError(""), 6000);
      return;
    }

    if (!password) {
      setError("Please enter a password");
      setTimeout(() => setError(""), 6000);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setTimeout(() => setError(""), 6000);
      return;
    }

    if (!name) {
      setError("Please enter a username");
      setTimeout(() => setError(""), 6000);
      return;
    }

    setError("");
    registerUser(email, password, name);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Create an account so you can explore and find your pawmates
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          placeholderTextColor="#626262"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor="#626262"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor="#626262"
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          placeholderTextColor="#626262"
          secureTextEntry
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity onPress={handleSignUp} style={styles.signupButton}>
          <Text style={styles.signupButtonText}>Sign up</Text>
        </TouchableOpacity>

        {registered && (
          <Text style={styles.successMessage}>
            Registration successful! You can now login.
          </Text>
        )}

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.haveAccount}>Already have an account</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#004AAD",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#000000",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: "#F1F4FF",
  },
  signupButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#004AAD",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  haveAccount: {
    fontSize: 18,
    color: "#000",
    marginBottom: 30,
    fontWeight: "bold",
  },
  continueText: {
    color: "#004AAD",
    marginBottom: 20,
    fontWeight: "bold",
    marginBottom: 30,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },
  icon: {
    marginLeft: 20,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  successMessage: {
    color: "green",
    fontSize: 16,
    marginBottom: 10,
  },
});

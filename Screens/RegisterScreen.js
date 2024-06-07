import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { app } from "../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const auth = getAuth(app);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false);

  const registerUser = async (email, password, retryCount = 0) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User registered:", userCredential.user);
      setRegistered(true);
      setTimeout(() => {
        navigation.navigate("Login");
      }, 2000);
    } catch (error) {
      if (error.code === "auth/network-request-failed" && retryCount < 3) {
        console.warn("Network request failed, retrying...", retryCount);
        setTimeout(() => registerUser(email, password, retryCount + 1), 1000);
      } else {
        console.error("Error registering user:", error);
      }
    }
  };

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      setError("Password and confirm password do not match");
      return;
    }
    setError("");
    registerUser(email, password);
  };

  return (
    <View style={styles.container}>
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

      <Text style={styles.continueText}>Or continue with</Text>

      <View style={styles.socialIcons}>
        <FontAwesome name="google" size={24} color="black" />
        <FontAwesome
          name="facebook"
          size={24}
          color="black"
          style={styles.icon}
        />
        <FontAwesome
          name="twitter"
          size={24}
          color="black"
          style={styles.icon}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

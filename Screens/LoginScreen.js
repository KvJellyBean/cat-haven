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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const auth = getAuth();
  
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
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user) {
        await AsyncStorage.setItem("isLoggedIn", "true");
        const token = await user.getIdToken();
        await AsyncStorage.setItem("userToken", token);
        await AsyncStorage.setItem("userData", JSON.stringify(user));
        await AsyncStorage.setItem("userEmail", email); // Simpan email
        await AsyncStorage.setItem("userPassword", password); // Simpan password
        await AsyncStorage.getItem("isLoggedIn");
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Email or password are incorrect");
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Login here</Text>
        <Text style={styles.subtitle}>Welcome back you've</Text>
        <Text style={styles.p1}>been missed!</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#626262"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#626262"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity
          onPress={() =>
            navigation.push("ForgotPassword", {
              TitleText: "Forgot Password",
            })
          }
          style={styles.forgotPasswordContainer}
        >
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.push("Register")}>
          <Text style={styles.createAccount}>Create new account</Text>
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
    marginTop: 50,
  },
  subtitle: {
    fontSize: 18,
    color: "#000000",
    textAlign: "center",
    fontWeight: "bold",
  },
  p1: {
    fontSize: 18,
    color: "#000000",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 80,
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: "#F1F4FF",
  },
  forgotPasswordContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 30,
    marginTop: 10,
  },
  forgotPassword: {
    fontWeight: "bold",
    color: "#1D4ED8",
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#004AAD",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  createAccount: {
    fontSize: 18,
    color: "#000",
    marginBottom: 70,
    fontWeight: "bold",
  },
  continueText: {
    color: "#004AAD",
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
});

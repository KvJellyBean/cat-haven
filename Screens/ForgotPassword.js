import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function LoginScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { TitleText } = route.params;
  const [email, setEmail] = useState("");
  const handleResetPassword = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email.");
      return;
    }

    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      navigation.navigate("emailVerification", { email });
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        Alert.alert(
          "Error",
          "Invalid email format. Please enter a valid email."
        );
      } else {
        console.error("Error sending password reset email:", error);
        Alert.alert(
          "Error",
          "Failed to send password reset email. Please try again later."
        );
      }
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>{TitleText}</Text>
          </View>

          <Text style={styles.subtitle}>
            Please enter your email to reset the password
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#626262"
            onChangeText={(text) => setEmail(text)}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={handleResetPassword}
            style={styles.resetpassButton}
          >
            <Text style={styles.resetpassButtonText}>Reset Password</Text>
          </TouchableOpacity>

          <Text style={styles.footerHeader}>Developed by</Text>
          <Text style={styles.footerTitle}>DEVIVE GUYS</Text>
        </View>
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
  innerContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  backButton: {
    position: "absolute",
    left: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#004AAD",
  },
  subtitle: {
    fontSize: 18,
    color: "#000000",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 50,
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: "#F1F4FF",
  },
  resetpassButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#004AAD",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 330,
  },
  resetpassButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerHeader: {
    fontSize: 18,
    color: "#494949",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
  },
  footerTitle: {
    fontSize: 18,
    color: "#494949",
    textAlign: "center",
    fontWeight: "bold",
  },
});

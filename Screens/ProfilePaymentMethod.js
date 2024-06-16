import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { paymentMethods } from "../data";

export default function ProfilePaymentMethod() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Payment Method</Text>
      </View>

      <View style={styles.paymentMethodsSection}>
        {paymentMethods.map((method) => (
          <View key={method.key} style={styles.paymentMethod}>
            <Image source={method.logo} style={styles.paymentLogo} />
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentMethodText}>{method.method}</Text>
              <Text style={styles.paymentIdText}>{method.paymentId}</Text>
            </View>
            <Image
              source={require("../assets/back.png")}
              style={styles.arrowIcon}
            />
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.addPaymentMethod}
        onPress={() => navigation.navigate("AddPayment")}
      >
        <Ionicons name="add" size={18} color="#004AAD" />
        <View style={styles.paymentInfo}>
          <Text style={{ color: "#004AAD", fontWeight: "500", fontSize: 16 }}>
            {" "}
            Add Payment Method
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
    marginTop: 50,
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#004AAD",
  },
  paymentMethodsSection: {
    width: "100%",
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },
  paymentLogo: {
    width: 50,
    height: 50,
    marginRight: 25,
    resizeMode: "contain",
  },
  paymentInfo: {
    flex: 1,
  },
  paymentMethodText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  paymentIdText: {
    fontSize: 16,
    color: "#004AAD",
  },
  arrowIcon: {
    width: 15,
    height: 15,
    right: 10,
    tintColor: "black",
    transform: [{ rotate: "180deg" }],
  },
  addPaymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginTop: 10,
  },
});

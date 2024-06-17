import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { collection, doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

const CartPageScreen = ({ navigation, route}) => {
  const [cartData, setCartData] = useState(null); // State untuk menyimpan data dari Firestore

  const { petId } = route.params;

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const userCartRef = doc(db, "users", user.uid, "cart", petId); // Sesuaikan dengan struktur dokumen Anda
        const cartDoc = await getDoc(userCartRef);

        if (cartDoc.exists()) {
          setCartData(cartDoc.data()); // Set data ke dalam state cartData
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, []); // Empty dependency array untuk menjalankan useEffect hanya sekali saat komponen dimount

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Cart</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {cartData ? (
          <View style={styles.item}>
            <Image source={{ uri: cartData.image }} style={styles.animalImage} />
            <View style={styles.details}>
              <Text style={styles.animalName}>{cartData.name}</Text>
              <Text style={styles.animalType}>{cartData.breed}</Text>
              <Text style={styles.price}>Rp. {cartData.adoptionFee}</Text>
            </View>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </ScrollView>

      {cartData && (
        <>
          <View style={styles.adoptionFeesHeader}>
            <Text style={styles.adoptionFeePrice}>Adoption Fees:</Text>
            <Text style={styles.adoptionFeePrice}>Rp. {cartData.adoptionFee}</Text>
          </View>
          <View style={styles.adoptionFees}>
            <View style={styles.totalPriceSection}>
              <Text style={styles.totalPriceAmount}>Total:</Text>
              <Text style={styles.totalPriceAmount}>Rp. {cartData.adoptionFee}</Text>
            </View>
            <TouchableOpacity style={styles.adoptButton} onPress={toggleModal}>
              <Text style={styles.adoptButtonText}>Adopt</Text>
            </TouchableOpacity>
          </View>

          <PaymentMethod isVisible={isModalVisible} onHide={toggleModal} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  header: {
    paddingTop: 40,
    marginBottom: 40,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "#004AAD",
    textAlign: "center",
    fontSize: 34,
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    left: 0,
    top: 50,
  },
  scrollView: {
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  animalImage: {
    width: 180,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  animalName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  animalType: {
    fontSize: 16,
    color: "#666",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 40,
  },
  adoptionFees: {
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingTop: 20,
  },
  adoptionFeesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  adoptionFeePrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalPriceSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalPriceAmount: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 30,
  },
  adoptButton: {
    backgroundColor: "#004AAD",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  adoptButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CartPageScreen;

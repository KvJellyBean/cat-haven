import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert, // Import Alert for showing alert messages
} from "react-native";
import PaymentMethod from "./PaymentMethod";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase";

const CartPageScreen = ({ route }) => {
  const navigation = useNavigation();
  const { pet } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const querySnapshot = await getDocs(
          collection(db, "users", user.uid, "cart")
        );
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setCartItems(items);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const adoptionFee = cartItems.reduce((total, item) => {
    return total + parseFloat(item.adoptionFee);
  }, 0);

  const taxAmount = adoptionFee * 0.11;

  const totalAmount = adoptionFee + taxAmount;

  const handleRemoveItem = async (index) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const docIdToDelete = cartItems[index].id; // Retrieve document ID to delete

      // Delete item from Firestore cart collection
      await deleteDoc(doc(db, `users/${user.uid}/cart/${docIdToDelete}`));

      // Check and delete corresponding form document if exists
      const formRef = doc(db, `users/${user.uid}/form/${docIdToDelete}`);
      const formSnap = await getDoc(formRef);
      if (formSnap.exists()) {
        await deleteDoc(formRef);
        console.log(`Form for pet ${docIdToDelete} deleted successfully`);
      } else {
        console.log(`No form found for pet ${docIdToDelete}`);
      }

      // Remove item from local state (cartItems)
      const updatedCartItems = [...cartItems];
      updatedCartItems.splice(index, 1);
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleAdoptButtonPress = () => {
    // Handle adopt button press logic here
    if (cartItems.length === 0) {
      // Show alert that cart is empty
      Alert.alert("Cart is Empty", "Please add items to your cart first.");
    } else {
      // Toggle modal or navigate to payment screen
      toggleModal();
    }
  };

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

      {cartItems.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Cart is Empty</Text>
        </View>
      ) : (
        <>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {/* Render cart items here */}
            {cartItems.map((item, index) => (
              <View style={styles.item} key={index}>
                <Image source={item.image} style={styles.animalImage} />
                <View style={styles.details}>
                  <Text style={styles.animalName}>{item.name}</Text>
                  <Text style={styles.animalType}>{item.breed}</Text>
                  <Text style={styles.price}>
                    IDR. {parseFloat(item.adoptionFee).toLocaleString("id-ID")}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveItem(index)}
                >
                  <Ionicons name="trash-outline" size={24} color="#AD0000" />
                </TouchableOpacity>
              </View>
            ))}
            <View style={styles.item}>
              <Image
                source={require("../assets/food.png")}
                style={styles.animalImage}
              />
              <View style={styles.details}>
                <Text style={styles.animalName}>Cat Supply</Text>
                <Text style={styles.animalType}>Free Cat Supply</Text>
                <Text style={styles.price}>Free</Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.bottom}>
            <View style={styles.adoptionFeesHeader}>
              <Text style={styles.adoptionFeePrice}>Adoption Fees:</Text>
              <Text style={styles.adoptionFeePrice}>
                IDR. {adoptionFee.toLocaleString("id-ID")}
              </Text>
            </View>
            <View style={styles.adoptionFeesHeader}>
              <Text style={styles.adoptionFeePrice}>Tax 11%:</Text>
              <Text style={styles.adoptionFeePrice}>
                IDR. {taxAmount.toLocaleString("id-ID")}
              </Text>
            </View>
            <View style={styles.adoptionFees}>
              <View style={styles.totalPriceSection}>
                <Text style={styles.totalPriceAmount}>Total:</Text>
                <Text style={styles.totalPriceAmount}>
                  IDR. {totalAmount.toLocaleString("id-ID")}
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.adoptButton,
                  cartItems.length === 0 ? styles.disabledButton : null,
                ]}
                onPress={handleAdoptButtonPress}
                disabled={cartItems.length === 0} // Disable the button if cart is empty
              >
                <Text style={styles.adoptButtonText}>Adopt</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}

      <PaymentMethod isVisible={isModalVisible} onHide={toggleModal} />
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
    marginBottom: 30,
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
    resizeMode: "cover",
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
  bottom: {
    backgroundColor: "#ffffff",
    borderColor: "#ccc",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#666",
    textAlign: "center",
  },
  removeButton: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
});

export default CartPageScreen;

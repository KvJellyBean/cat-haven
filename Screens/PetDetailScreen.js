import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Iconify } from "react-native-iconify";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import AdoptForm from "./Form";

const PetDetailScreen = ({ route, navigation }) => {
  const { pet: initialPet, updateLikedStatus } = route.params;
  const [pet, setPet] = useState(initialPet);
  const [isLiked, setIsLiked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const HeartOutlineIcon = () => (
    <Iconify
      icon="fe:heart-o"
      size={25}
      color="#777"
      style={styles.heartIcon}
    />
  );

  const HeartFilledIcon = () => (
    <Iconify icon="fe:heart" size={25} color="red" />
  );

  useEffect(() => {
    fetchLikedStatus();
    checkFormStatus();
  }, [pet.id]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // Fetch updated form status when returning to this screen
      checkFormStatus();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchLikedStatus = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const userFavoritesRef = doc(db, "users", user.uid, "favorites", pet.id);
      const petDoc = await getDoc(userFavoritesRef);

      setIsLiked(petDoc.exists());
    } catch (error) {
      console.error("Error fetching liked status:", error);
    }
  };

  const toggleLike = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const userFavoritesRef = doc(db, "users", user.uid, "favorites", pet.id);

      if (!isLiked) {
        await setDoc(userFavoritesRef, {
          ...pet,
        });
      } else {
        await deleteDoc(userFavoritesRef);
      }

      setIsLiked(!isLiked);
      updateLikedStatus(pet.id, !isLiked);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const checkFormStatus = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const userFormRef = doc(db, "users", user.uid, "form", pet.id);
      const docSnap = await getDoc(userFormRef);

      setFormSubmitted(docSnap.exists());
    } catch (error) {
      console.error("Error checking form status:", error);
    }
  };

  const handleAdoptButtonPress = () => {
    if (formSubmitted) {
      navigation.navigate("CartPageScreen", { pet });
    } else {
      setIsModalVisible(true);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={pet.image} style={styles.image} />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Iconify
          icon="material-symbols-light:arrow-back-ios"
          size={30}
          color="#1e1e1e"
        />
      </TouchableOpacity>

      <View style={styles.detailsContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.petName}>{pet.name}</Text>
          <TouchableOpacity style={styles.likeButton} onPress={toggleLike}>
            {isLiked ? <HeartFilledIcon /> : <HeartOutlineIcon />}
          </TouchableOpacity>
        </View>
        <Text style={styles.petBreed}>{pet.breed}</Text>
        <Text style={styles.petLocation}>{pet.location}</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>{pet.gender}</Text>
            <Text style={styles.infoTitle}>Gender</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>{pet.age}</Text>
            <Text style={styles.infoTitle}>Age</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>{pet.weight}</Text>
            <Text style={styles.infoTitle}>Weight</Text>
          </View>
        </View>

        <Text style={styles.aboutTitle}>About</Text>
        <Text style={styles.description}>{pet.description}</Text>

        <View style={styles.adoptionFeeContainer}>
          <Text style={styles.adoptionFeeText}>
            Adoption Fee: IDR. {pet.adoptionFee.toLocaleString("id-ID")}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.adoptButton}
          onPress={handleAdoptButtonPress}
        >
          <Text style={styles.adoptButtonText}>
            {formSubmitted ? "Check Your Cart" : "Adopt Pet"}
          </Text>
        </TouchableOpacity>

        <AdoptForm
          petId={pet.id}
          pet={pet}
          isVisible={isModalVisible}
          onHide={() => setIsModalVisible(false)}
          onFormSubmit={checkFormStatus}
          formStatus={formSubmitted}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 30,
  },
  image: {
    width: "100%",
    height: 500,
  },
  detailsContainer: {
    padding: 30,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -60,
  },
  heartIcon: {},
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  petName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#49494A",
    marginBottom: 10,
  },
  likeButton: {
    padding: 5,
  },
  petBreed: {
    fontSize: 18,
    color: "#666",
    marginBottom: 5,
  },
  petLocation: {
    fontSize: 16,
    color: "#49494A",
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  infoBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginHorizontal: 5,
  },
  infoText: {
    fontSize: 22,
    color: "#004AAD",
    fontWeight: "bold",
    textAlign: "center",
  },
  infoTitle: {
    fontSize: 16,
    color: "#004AAD",
  },
  aboutTitle: {
    fontSize: 25,
    color: "#49494A",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#888",
    marginBottom: 20,
  },
  adoptButton: {
    backgroundColor: "#004AAD",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  adoptButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  adoptionFeeContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  adoptionFeeText: {
    fontSize: 18,
    color: "#666",
  },
});

export default PetDetailScreen;

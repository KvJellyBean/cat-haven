import React, { useState } from "react";
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Iconify } from "react-native-iconify";
import Form from "./Form"

const PetDetailScreen = ({ route, navigation }) => {
  const { pet } = route.params;

  const HeartOutlineIcon = () => <Iconify icon="fe:heart-o" size={25} color="#777" style={styles.heartIcon} />;

  // Komponen untuk ikon hati diisi
  const HeartFilledIcon = () => <Iconify icon="fe:heart" size={25} color="red" />;

  const [isLiked, setIsLiked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={pet.image} style={styles.image} />
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Iconify icon="material-symbols-light:arrow-back-ios" size={30} color="#1e1e1e" />
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

        <TouchableOpacity style={styles.adoptButton} onPress={toggleModal}>
          <Text style={styles.adoptButtonText}>Adopt Pet</Text>
        </TouchableOpacity>


        <Form modalVisible={isModalVisible} setModalVisible={setIsModalVisible} />
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
    left: 35,
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
  heartIcon: {
    
  },
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
  },
  adoptButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PetDetailScreen;
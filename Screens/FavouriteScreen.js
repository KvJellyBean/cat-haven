import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Iconify } from "react-native-iconify";

import { useNavigation } from "@react-navigation/native";

const cats = [
  { id: "1", name: "Samantha", breed: "British Short Hair", location: "Bogor, Jawa Barat" },
  { id: "2", name: "Kelly", breed: "Munchkin", location: "Semarang, Jawa Tengah" },
  { id: "3", name: "Hanson", breed: "Brandal", location: "Bandung, Jawa Barat" },
  { id: "4", name: "Marvel", breed: "Kocak", location: "Surabaya, Jawa Timur" },
  { id: "5", name: "Aristo", breed: "Cicak", location: "Banten, Banten" },
  { id: "6", name: "Louis", breed: "Huahahah", location: "TJ Priuk, Jakarta Utara" },
  { id: "7", name: "Steven", breed: "KEKEKKEKEKE", location: "Blok M, Jakarta Selatan" },
  { id: "8", name: "Denial", breed: "Dokeaowowko", location: "Ancol, Jakarta Utara" },
];

export default function FavouriteScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Favourites</Text>
      </View>

      <FlatList
        data={cats}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View style={styles.adoptCard}>
              <Image source={require("../assets/Kucing.jpg")} style={styles.catImage} />
              <View style={styles.likeContainer}>
                <TouchableOpacity style={styles.likeButton}>
                  <View style={styles.likeButtonBackground}>
                    <Iconify icon="feather:heart" size={24} color="#777" style={[styles.heartIcon, item.liked ? styles.heartIconActive : null]} />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.petInfo}>
                <View style={styles.petDetails}>
                  <Text style={styles.petName}>{item.name}</Text>
                  <Text style={styles.petBreed}>{item.breed}</Text>
                  <View style={styles.petLocationContainer}>
                    <Iconify icon="feather:map-pin" size={18} color="#777" />
                    <Text style={styles.petLocation}>{item.location}</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2} // Set number of columns to 2
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.push("Home")}>
          <Iconify icon="feather:home" size={30} color="#777" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate("PetList")}>
          <Image source={require("../assets/splash.png")} style={styles.footerImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} >
          <Iconify icon="feather:heart" size={30} color="#777" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#f7f7f7",
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#004AAD",
  },

  adoptCard: {
    width: 170,
    height: 250,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 5,
    marginTop: 30,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  catImage: {
    width: "100%",
    height: "70%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  petInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  petDetails: {
    flex: 1,
  },
  petName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  petBreed: {
    fontSize: 14,
  },
  petLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  petLocation: {
    fontSize: 12,
    color: "#777",
    marginLeft: 5,
  },

  likeContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  likeButton: {
    padding: 5,
  },
  likeButtonBackground: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
  },
  heartIconActive: {
    color: "red",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 15,
    marginBottom: 50,
    elevation: 4,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  footerButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerImage: {
    width: 70,
    height: 40,
  },
  footerIcon: {
    fontSize: 24,
  },
});

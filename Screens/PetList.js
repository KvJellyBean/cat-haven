import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Dimensions, TextInput } from "react-native";
import { Iconify } from "react-native-iconify";

const cats = [
  { id: "1", name: "Samantha", breed: "British Short Hair", location: "Bogor, Jawa Barat" },
  { id: "2", name: "Kelly", breed: "Munchkin", location: "Semarang, Jawa Tengah" },
  { id: "3", name: "Hanson", breed: "Brandal", location: "Bandung, Jawa Barat" },
  { id: "4", name: "Marvel", breed: "Kocak", location: "Surabaya, Jawa Timur" },
  { id: "5", name: "Aristo", breed: "Cicak", location: "Banten, Banten" },
  { id: "6", name: "Louis", breed: "Huahahah", location: "TJ Priuk, Jakarta Utara" },
  { id: "7", name: "Steven", breed: "KEKEKKEKEKE", location: "Blok M, Jakarta Selatan" },
  { id: "8", name: "Denial", breed: "Dokeaowowko", location: "Ancol, Jakarta Utara" },
  { id: "9", name: "Gilbert", breed: "American", location: "Serang, Banten" },
  { id: "10", name: "Cadera", breed: "African", location: "Banjarmasin, Kalimantan Timur" },
  { id: "11", name: "Kobiy", breed: "Austria", location: "Bangka, Pangkal Pinang" },
];

const numColumns = 2;
const itemsPerPage = 6;
const totalPages = Math.ceil(cats.length / itemsPerPage);

export default function PetList() {
  const [currentPage, setCurrentPage] = useState(1);

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <TouchableOpacity key={i} onPress={() => setCurrentPage(i)}>
          <View style={styles.pageNumberContainer}>
            <Text style={styles.pageNumberText}>{i}</Text>
          </View>
        </TouchableOpacity>
      );
    }
    return pages;
  };

  const renderCardsForPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return cats.slice(startIndex, endIndex);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Iconify icon="material-symbols-light:arrow-back-ios" size={30} color="#1e1e1e" />
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <View style={styles.searchIconContainer}>
          <Iconify icon="feather:search" size={25} color="#ccc" style={styles.searchIcon} />
        </View>
        <TextInput placeholder="Search your cat..." style={styles.searchInput} />
        <TouchableOpacity>
          <View style={styles.filterButton}>
            <Iconify icon="mdi:slider" size={25} color="#fff" style={styles.sliderIcon} />
          </View>
        </TouchableOpacity>
      </View>

      <FlatList
        data={renderCardsForPage()}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View style={styles.adoptCard}>
              <Image source={require("../assets/Kucing.jpg")} style={styles.catImage} />
              <View style={styles.likeContainer}>
                <View style={styles.likeButtonBackground}>
                  <TouchableOpacity style={styles.likeButton}>
                    <Iconify icon="feather:heart" size={24} color="#777" style={[styles.heartIcon, item.liked ? styles.heartIconActive : null]} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.petInfo}>
                <View style={styles.petDetails}>
                  <Text style={styles.petName}>{item.name}</Text>
                  <Text style={styles.petBreed}>{item.breed}</Text>
                  <View style={styles.petLocationContainer}>
                    <Iconify icon="feather:map-pin" size={12} color="#777" />
                    <Text style={styles.petLocation}>{item.location}</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
      />

      <View style={styles.paginationContainer}>{renderPagination()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f7f7f7",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 35,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    marginTop: 30,
    marginHorizontal: 60,
  },
  searchIconContainer: {
    position: "absolute",
    left: 10,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    padding: 8,
    paddingLeft: 50,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 5,
  },
  filterButton: {
    padding: 9,
    marginLeft: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  sliderIcon: {
    transform: [{ rotate: "90deg" }, { scaleX: -1 }],
    color: "#777777",
  },
  adoptCard: {
    height: 200,
    width: 170,
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
    fontSize: 13,
    fontWeight: "bold",
  },
  petBreed: {
    fontSize: 11,
    marginBottom: 2,
  },
  petLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  petLocation: {
    fontSize: 9,
    color: "#777",
    marginLeft: 5,
  },
  likeContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  likeButton: {
    padding: 2,
  },
  likeButtonBackground: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
  },
  heartIconActive: {
    color: "#666",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    // backgroundColor: "red",
  },
  pageNumberContainer: {
    width: 24,
    height: 24,
    margin: 2,
    borderRadius: 12,
    backgroundColor: "#004AAD",
    justifyContent: "center",
    alignItems: "center",
  },

  pageNumberText: {
    fontSize: 13,
    color: "#fff",
  },
});

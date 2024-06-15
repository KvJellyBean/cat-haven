import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";
import { Iconify } from "react-native-iconify";
import { useNavigation, useRoute } from "@react-navigation/native";
import catsData from "../assets/data/cats.js";

const numColumns = 2;
const itemsPerPage = 6;

export default function PetList() {
  const navigation = useNavigation();
  const route = useRoute();
  const { pet } = route.params;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCats, setFilteredCats] = useState(catsData);

  useEffect(() => {
    setFilteredCats(
      catsData.filter(
        (cat) =>
          cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cat.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cat.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredCats.length / itemsPerPage);

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <TouchableOpacity key={i} onPress={() => setCurrentPage(i)}>
          <View
            style={[
              styles.pageNumberContainer,
              currentPage === i
                ? styles.pageNumberContainerActive
                : styles.pageNumberContainerInactive,
            ]}
          >
            <Text
              style={[
                styles.pageNumberText,
                currentPage === i
                  ? styles.pageNumberTextActive
                  : styles.pageNumberTextInactive,
              ]}
            >
              {i}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    return pages;
  };

  const renderCardsForPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCats.slice(startIndex, endIndex);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
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

        <View style={styles.searchIconContainer}>
          <Iconify
            icon="feather:search"
            size={25}
            color="#ccc"
            style={styles.searchIcon}
          />
        </View>
        <TextInput
          placeholder="Search your cat..."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity>
          <View style={styles.filterButton}>
            <Iconify
              icon="mdi:slider"
              size={25}
              color="#fff"
              style={styles.sliderIcon}
            />
          </View>
        </TouchableOpacity>
      </View>

      <FlatList
        data={renderCardsForPage()}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View style={styles.adoptCard}>
              <Image source={item.image} style={styles.catImage} />
              <View style={styles.likeContainer}>
                <View style={styles.likeButtonBackground}>
                  <TouchableOpacity style={styles.likeButton}>
                    <Iconify
                      icon="feather:heart"
                      size={24}
                      color="#777"
                      style={[
                        styles.heartIcon,
                        item.liked ? styles.heartIconActive : null,
                      ]}
                    />
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
    padding: "5%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f7f7f7",
    position: "relative",
  },
  searchContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    paddingHorizontal: 10,
  },
  searchIconContainer: {
    position: "absolute",
    left: 55,
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
    width: 160,
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
    marginTop: 5,
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
  },
  pageNumberContainer: {
    width: 24,
    height: 24,
    margin: 2,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  pageNumberContainerActive: {
    backgroundColor: "#004AAD",
  },
  pageNumberContainerInactive: {
    backgroundColor: "#fff",
  },
  pageNumberText: {
    fontSize: 13,
    color: "#fff",
  },
  pageNumberTextActive: {
    color: "#fff",
  },
  pageNumberTextInactive: {
    color: "#000",
  },
});

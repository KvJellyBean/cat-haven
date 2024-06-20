import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";
import { Iconify } from "react-native-iconify";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import catsData from "../assets/data/cats";
import { location as locations } from "../data.js";
import { breed as breeds } from "../data.js";
import { weightCategory as weightCategories } from "../data.js";

const numColumns = 2;
const itemsPerPage = 6;

const HeartOutlineIcon = () => (
  <Iconify icon="fe:heart-o" size={25} color="#777" style={styles.heartIcon} />
);
const HeartFilledIcon = () => <Iconify icon="fe:heart" size={25} color="red" />;

export default function PetList() {
  const navigation = useNavigation();
  const route = useRoute();
  const { filters } = route.params || {};
  const { updateLikedStatus } = route.params || {};
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCats, setFilteredCats] = useState(catsData);
  const [favoritePets, setFavoritePets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const userFavoritesRef = collection(db, "users", user.uid, "favorites");
        const snapshot = await getDocs(userFavoritesRef);

        if (!snapshot.empty) {
          const favorites = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setFavoritePets(favorites);
        } else {
          setFavoritePets([]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    console.log("Applying filters:", filters);

    let filtered = catsData;

    if (filters) {
      const {
        breed: breedKey,
        gender,
        location: locationKey,
        age,
        weightCategory: weightKey,
      } = filters;

      if (breedKey && breedKey !== "") {
        // Find the actual breed value from breeds array based on the breed key
        const breedObject = breeds.find((item) => item.key === breedKey);
        if (breedObject) {
          const breedValue = breedObject.value;
          filtered = filtered.filter((cat) =>
            cat.breed.toLowerCase().includes(breedValue.toLowerCase())
          );
        }
      }
      if (gender && gender !== "") {
        // Change 'gender' to 'sex' since 'gender' is not a property in catsData
        filtered = filtered.filter(
          (cat) => cat.gender.toLowerCase() === gender.toLowerCase()
        );
      }
      if (locationKey && locationKey !== "") {
        // Find the actual location value from locations array
        const location =
          locations.find((loc) => loc.key === locationKey)?.value || "";
        filtered = filtered.filter((cat) =>
          cat.location.toLowerCase().includes(location.toLowerCase())
        );
      }
      if (age && age !== "") {
        filtered = filtered.filter((cat) =>
          cat.age.toLowerCase().includes(age.toLowerCase())
        );
      }

      if (weightKey && weightKey !== "") {
        // Change 'weight' to 'weightCategory' since 'weight' is not a property in catsData
        const weightCategoryObject = weightCategories.find(
          (item) => item.key === weightKey
        );
        if (weightCategoryObject) {
          const weightValue = weightCategoryObject.value;
          filtered = filtered.filter((cat) =>
            cat.weightCategory.toLowerCase().includes(weightValue.toLowerCase())
          );
        }
      }
    }

    console.log("Filtered cats:", filtered);

    if (searchQuery) {
      filtered = filtered.filter(
        (cat) =>
          cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cat.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cat.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    console.log("Filtered cats after search:", filtered);

    setFilteredCats(filtered);
  }, [filters, searchQuery]);

  // Ensure filteredCats is defined before accessing its length
  const totalPages = filteredCats
    ? Math.ceil(filteredCats.length / itemsPerPage)
    : 0;

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

  const toggleLike = async (petId) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const userFavoritesRef = doc(db, "users", user.uid, "favorites", petId);

      const isAlreadyFavorite = favoritePets.some((pet) => pet.id === petId);

      if (!isAlreadyFavorite) {
        const pet = filteredCats.find((item) => item.id === petId);
        if (!pet) {
          console.error("Pet not found in filteredCats array");
          return;
        }

        const data = {
          name: pet.name || "",
          breed: pet.breed || "",
          location: pet.location || "",
          gender: pet.gender || "",
          age: pet.age || "",
          weight: pet.weight || "",
          description: pet.description || "",
          adoptionFee: pet.adoptionFee || 0,
          image: pet.image || "",
          weightCategory: pet.weightCategory || "",
        };

        await setDoc(userFavoritesRef, data);
        setFavoritePets([...favoritePets, { id: petId, ...pet }]);
      } else {
        await deleteDoc(userFavoritesRef);
        const updatedFavorites = favoritePets.filter((pet) => pet.id !== petId);
        setFavoritePets(updatedFavorites);
      }

      updateLikedStatus(petId, !isAlreadyFavorite);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
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
        <TouchableOpacity onPress={() => navigation.navigate("Filter")}>
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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Detail", {
                pet: item,
                updateLikedStatus: toggleLike,
              })
            }
          >
            <View style={styles.adoptCard}>
              <Image source={item.image} style={styles.catImage} />
              <View style={styles.likeContainer}>
                <View style={styles.likeButtonBackground}>
                  <TouchableOpacity
                    style={styles.likeButton}
                    onPress={() => toggleLike(item.id)}
                  >
                    {favoritePets.some((pet) => pet.id === item.id) ? (
                      <HeartFilledIcon />
                    ) : (
                      <HeartOutlineIcon />
                    )}
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
  searchIcon: {
    color: "#777",
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
    padding: 3,
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
    backgroundColor: "#fff",
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
    color: "#004AAD",
  },
  pageNumberContainerActive: {
    backgroundColor: "#004AAD",
  },
  pageNumberTextActive: {
    color: "#fff",
  },
});

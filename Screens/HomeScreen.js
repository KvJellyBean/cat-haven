import React, { useState, useRef, useEffect } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, FlatList, StyleSheet, ImageBackground, Animated } from "react-native";
import { Iconify } from "react-native-iconify";
import { useNavigation } from "@react-navigation/native";
import { getAuth} from "firebase/auth";
import { doc, setDoc, getDocs,deleteDoc, getDoc, collection } from "firebase/firestore";
import Footer from "../components/footer.js";
import cats from "../assets/data/cats";
import { db } from "../firebase"; // Assuming you have firebase.js setup correctly

export default function HomeScreen() {
  const HeartOutlineIcon = () => <Iconify icon="fe:heart-o" size={25} color="#777" style={styles.heartIcon} />;

  // Komponen untuk ikon hati diisi
  const HeartFilledIcon = () => <Iconify icon="fe:heart" size={25} color="red" />;

  const [likeStatus, setLikeStatus] = useState({});

  const [username, setUsername] = useState("");
  const authInstance = getAuth();


  useEffect(() => {
    const fetchUserFavorites = async () => {
      try {
        const user = authInstance.currentUser;
        if (!user) throw new Error("User not authenticated");
  
        const userFavoritesRef = collection(db, "users", user.uid, "favorites");
        const snapshot = await getDocs(userFavoritesRef);
  
        let updatedStatus = {};
        snapshot.forEach((doc) => {
          updatedStatus[doc.id] = true; // Assuming all documents in favorites are liked
        });
  
        setLikeStatus(updatedStatus);
  
        // Set username directly based on user object
        setUsername(user.displayName || "User");
  
      } catch (error) {
        console.error("Error fetching user favorites:", error);
      }
    };
  
    fetchUserFavorites();
  
  }, []);
  

  const toggleLike = async (id) => {
    try {
      const user = authInstance.currentUser;
      if (!user) throw new Error("User not authenticated");

      const userFavoritesRef = collection(db, "users", user.uid, "favorites");
      const petRef = doc(userFavoritesRef, id);
      const petSnapshot = await getDoc(petRef);

      if (petSnapshot.exists()) {
        // Pet already liked, remove from favorites
        await deleteDoc(petRef);
        updateLikedStatus(id, false); // Update like status in HomeScreen
      } else {
        // Pet not liked, add to favorites
        await setDoc(
          petRef,
          cats.find((pet) => pet.id === id)
        );
        updateLikedStatus(id, true); // Update like status in HomeScreen
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  // Update liked status function
  const updateLikedStatus = async (id, liked) => {
    try {
      const user = authInstance.currentUser;
      if (!user) throw new Error("User not authenticated");

      const userFavoritesRef = doc(collection(db, "users", user.uid, "favorites"), id);

      if (liked) {
        await setDoc(userFavoritesRef, cats.find((pet) => pet.id === id));
      } else {
        await deleteDoc(userFavoritesRef);
      }

      setLikeStatus((prevStatus) => ({
        ...prevStatus,
        [id]: liked,
      }));
    } catch (error) {
      console.error("Error updating liked status:", error);
    }
  };

  const navigation = useNavigation();

  const [currentPage, setCurrentPage] = useState(0);
  const flatListRef = useRef();
  const animatedValues = useRef(cats.map(() => new Animated.Value(10))).current;

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentPage = Math.round(scrollPosition / 190);
    setCurrentPage(currentPage);
  };

  useEffect(() => {
    animatedValues.forEach((animatedValue, index) => {
      Animated.timing(animatedValue, {
        toValue: currentPage === index ? 20 : 10,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  }, [currentPage]);

  const navigateToPetDetail = (pet) => {
    navigation.navigate('Detail', { pet, updateLikedStatus: updateLikedStatus });

    
  };
  const navigateToPetList = (pet) => {
    navigation.navigate("PetList", { pet });
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome, {username} </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image source={require("../assets/splash.png")} style={styles.profileImage} />
        </TouchableOpacity>
      </View>

      <View style={styles.adoptBanner}>
        <ImageBackground source={require("../assets/banner.png")} style={styles.bannerBackground} resizeMode="cover">
          <View style={styles.adoptButtonContainer}>
            <Text style={styles.adoptNowText}>Adopt Now!</Text>
            <Text style={styles.adoptNowText}>Free Cat Supply!</Text>
            <TouchableOpacity style={styles.adoptNowButton} onPress={() => navigateToPetList()}>
              <Text style={styles.adoptNowButtonText}>Adopt Now!</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchIconContainer}>
          <Iconify icon="feather:search" size={30} color="#ccc" style={styles.searchIcon} />
        </View>
        <TextInput placeholder="Search your cat..." style={styles.searchInput} onPress={() => navigateToPetList()} />
        <TouchableOpacity onPress={() => navigation.navigate("Filter")}>
          <View style={styles.filterButton}>
            <Iconify icon="mdi:slider" size={25} color="#fff" style={styles.sliderIcon} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.adoptContainer}>
        <View style={styles.adoptHeader}>
          <Text style={styles.adoptTitle}>Adopt a Cat</Text>
          <TouchableOpacity onPress={() => navigateToPetList()}>
            <Text style={styles.adoptSeeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={cats.slice(0, 3)} // Hanya mengambil 3 data pertama
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigateToPetDetail(item)}>
              <View style={styles.adoptCard}>
                <Image source={item.image} style={styles.catImage} />
                <View style={styles.likeContainer}>
                  <View style={styles.likeButtonBackground}>
                    <TouchableOpacity style={styles.likeButton} onPress={() => toggleLike(item.id)}>
                      {likeStatus[item.id] ? <HeartFilledIcon /> : <HeartOutlineIcon />}
                    </TouchableOpacity>
                  </View>
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
          contentContainerStyle={{ paddingLeft: 3 }}
          showsHorizontalScrollIndicator={false}
          snapToInterval={190}
          decelerationRate="fast"
          ref={flatListRef}
          onScroll={handleScroll}
          pagingEnabled
        />

        <View style={styles.pageIndicatorContainer}>
          {cats.slice(0, 3).map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.pageIndicatorDot,
                currentPage === index && styles.pageIndicatorDotActive,
                {
                  width: animatedValues[index],
                  marginLeft: index === 0 ? 0 : 5, // Atur margin kiri untuk dot pertama agar tidak bergeser
                },
              ]}
            />
          ))}
        </View>
      </View>

      <Footer updateLikedStatus={updateLikedStatus} />
    </View>
  );
}

const styles = StyleSheet.create({
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
    padding: 3,
  },
  heartIconActive: {
    color: "red",
  },

  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#f7f7f7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 35,
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#004AAD",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 200,
    borderWidth: 0.5,
    borderColor: "#000",
  },
  adoptBanner: {
    marginVertical: 25,
  },
  bannerBackground: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    overflow: "hidden",
  },
  adoptButtonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    padding: 20,
  },
  adoptNowText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  adoptNowButton: {
    backgroundColor: "#FFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  adoptNowButtonText: {
    color: "#004AAD",
    fontSize: 16,
    fontWeight: "bold",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    marginTop: 8,
  },

  searchIconContainer: {
    position: "absolute",
    left: 10,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    paddingLeft: 50,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 5,
  },
  filterButton: {
    padding: 15,
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

  adoptContainer: {
    flex: 1,
    marginTop: 30,
  },
  adoptHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  adoptTitle: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#004AAD",
  },
  adoptSeeAll: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#777777",
  },

  adoptCard: {
    width: 200,
    height: 270,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginRight: 20,
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
  },
  locationIcon: {
    marginRight: 5,
  },
  petDetails: {
    flex: 1,
    paddingLeft: 10,
  },
  petName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  petBreed: {
    fontSize: 14,
  },
  petLocationContainer: {
    paddingTop: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  petLocation: {
    fontSize: 12,
    color: "#777",
    marginLeft: 5,
  },

  pageIndicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  pageIndicatorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  pageIndicatorDotActive: {
    backgroundColor: "#004AAD",
  },
});

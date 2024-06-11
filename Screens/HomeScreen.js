import React, { useState, useRef, useEffect } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, FlatList, StyleSheet, ImageBackground, Animated } from "react-native";
import { Iconify } from "react-native-iconify";
import { useNavigation } from "@react-navigation/native";

const cats = [
  {
    id: "1",
    name: "Samantha",
    breed: "British Short Hair",
    location: "Bogor, Jawa Barat",
    image: require("../assets/Kucing.jpg"),
    gender: "Female",
    age: "2 years",
    weight: "3.5 kg",
    description: "Samantha is a lovely British Short Hair cat looking for a home. Samantha is a friendly British Short Hair cat with a friendly face. ",
  },
  {
    id: "2",
    name: "Kelly",
    breed: "Munchkin",
    location: "Semarang, Jawa Tengah",
    image: require("../assets/Kucing3.jpg"),
    gender: "Female",
    age: "1 year",
    weight: "2.8 kg",
    description: "Kelly is an adorable Munchkin cat looking for a family. Kelly is a friendly Munchkin cat with a friendly face. ",
  },
  {
    id: "3",
    name: "Hanson",
    breed: "Bengal",
    location: "Semarang, Jawa Tengah",
    image: require("../assets/Kucing2.jpg"),
    gender: "Male",
    age: "3 years",
    weight: "4.2 kg",
    description: "Hanson, the playful Brandal cat, is eagerly seeking a forever home. Hanson is a playful Brandal cat ready for adoption. Ready for adoption, Hanson is a spirited Brandal cat with a playful demeanor. ",
  },
];

export default function HomeScreen() {
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
    navigation.navigate("Detail", { pet });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome, Emily</Text>
        <Image source={require("../assets/splash.png")} style={styles.profileImage} />
      </View>

      <View style={styles.adoptBanner}>
        <ImageBackground source={require("../assets/banner.png")} style={styles.bannerBackground} resizeMode="cover">
          <View style={styles.adoptButtonContainer}>
            <Text style={styles.adoptNowText}>Adopt Now!</Text>
            <Text style={styles.adoptNowText}>Free Cat Supply!</Text>
            <TouchableOpacity style={styles.adoptNowButton}>
              <Text style={styles.adoptNowButtonText}>Adopt Now!</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchIconContainer}>
          <Iconify icon="feather:search" size={30} color="#ccc" style={styles.searchIcon} />
        </View>
        <TextInput placeholder="Search your cat..." style={styles.searchInput} />
        <TouchableOpacity onPress={() => navigation.push("Filter")}>
          <View style={styles.filterButton}>
            <Iconify icon="mdi:slider" size={25} color="#fff" style={styles.sliderIcon} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.adoptContainer}>
        <View style={styles.adoptHeader}>
          <Text style={styles.adoptTitle}>Adopt a Cat</Text>
          <TouchableOpacity>
            <Text style={styles.adoptSeeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={cats}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigateToPetDetail(item)}>
              <View style={styles.adoptCard}>
                <Image source={item.image} style={styles.catImage} />
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
          contentContainerStyle={{ paddingLeft: 3 }}
          showsHorizontalScrollIndicator={false}
          snapToInterval={190}
          decelerationRate="fast"
          ref={flatListRef}
          onScroll={handleScroll}
          pagingEnabled
        />

        <View style={styles.pageIndicatorContainer}>
          {cats.map((_, index) => (
            <Animated.View key={index} style={[styles.pageIndicatorDot, currentPage === index && styles.pageIndicatorDotActive, { width: animatedValues[index] }]} />
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Iconify icon="feather:home" size={30} color="#777" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.push("PetList")}>
          <Image source={require("../assets/splash.png")} style={styles.footerImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Iconify icon="feather:heart" size={30} color="#777" />
        </TouchableOpacity>
      </View>
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
    padding: 5,
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

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 15,
    marginBottom: 20,
    elevation: 4,
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

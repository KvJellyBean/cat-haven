import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Iconify } from "react-native-iconify";
import { collection, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase"; // Adjust this import based on your Firebase setup
import Footer from "../components/footer";

const HeartFilledIcon = () => <Iconify icon="fe:heart" size={25} color="red" />;

export default function FavouriteScreen({route}) {
  const { updateLikedStatus } = route.params;
  const navigation = useNavigation();
  const [favoritePets, setFavoritePets] = useState([]);

  useEffect(() => {
    const fetchFavoritePets = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const userFavoritesRef = collection(db, 'users', user.uid, 'favorites');
        const unsubscribe = onSnapshot(userFavoritesRef, (snapshot) => {
          const pets = [];
          snapshot.forEach((doc) => {
            pets.push({ id: doc.id, ...doc.data(), liked: true }); // Set 'liked' to true for each favorite pet
          });
          setFavoritePets(pets);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching favorite pets:', error);
      }
    };

    fetchFavoritePets();
  }, []);

  const toggleLike = async (id) => {
    try {
      const user = auth.currentUser;
      if (!user) return;
  
      const userFavoritesRef = collection(db, 'users', user.uid, 'favorites');
      const petRef = doc(userFavoritesRef, id);
      
      await deleteDoc(petRef); // Remove the pet from favorites in Firestore
  
      // Update local state to reflect the removal from favorites
      setFavoritePets(prevPets => prevPets.map(pet => ({
        ...pet,
        liked: pet.id === id ? false : pet.liked // Set 'liked' to false for the removed pet
      })));
  
      // Update liked status in HomeScreen
      updateLikedStatus(id, false); // Call the function passed as prop
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };
  

  const renderPetItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("Detail", { pet: item })}>
      <View style={styles.adoptCard}>
        <Image source={item.image} style={styles.catImage} />
        <View style={styles.likeContainer}>
          <TouchableOpacity style={styles.likeButton} onPress={() => toggleLike(item.id)}>
            <View style={styles.likeButtonBackground}>
              {item.liked ? <HeartFilledIcon /> : <Iconify icon="feather:heart" size={24} color="#777" style={styles.heartIcon} />}
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
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Favourites</Text>
      </View>

      <FlatList
        data={favoritePets}
        renderItem={renderPetItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
      />

      <Footer />
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
  heartIcon: {
    color: "#777",
  },

  flatListContent: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 20,
  },
});

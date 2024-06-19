import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Sesuaikan path ini dengan lokasi Anda
import { getAuth } from "firebase/auth";

export default function HistoryScreen() {
  const auth = getAuth();
  const navigation = useNavigation();
  const [historyEntries, setHistoryEntries] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest"); // State to manage sort order
  const [isLoading, setIsLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const querySnapshot = await getDocs(
          collection(db, "users", user.uid, "history")
        );
        const entries = [];
        querySnapshot.forEach((doc) => {
          entries.push({ id: doc.id, ...doc.data() });
        });

        // Sort entries based on the current sort order
        entries.sort((a, b) => {
          return sortOrder === "newest"
            ? new Date(b.date) - new Date(a.date)
            : new Date(a.date) - new Date(b.date);
        });

        setHistoryEntries(entries);
        setIsLoading(false); // Set loading state to false after fetching data
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, [sortOrder]); // Re-fetch data when sortOrder changes

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "newest" ? "oldest" : "newest"));
  };

  // Render empty history text if historyEntries is empty
  const renderEmptyHistory = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>History is Empty</Text>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Transaction History</Text>
      </View>

      {/* Sort button container, rendered only if historyEntries is not empty */}
      {!isLoading && historyEntries.length > 0 && (
        <View style={styles.sortButtonContainer}>
          <TouchableOpacity onPress={toggleSortOrder} style={styles.sortButton}>
            <View style={styles.sortButtonWrapper}>
              <Ionicons
                name={
                  sortOrder === "newest"
                    ? "arrow-up-circle-outline"
                    : "arrow-down-circle-outline"
                }
                size={24}
                color="#004AAD"
              />
              <Text style={styles.sortButtonText}>
                Sort by {sortOrder === "newest" ? "Oldest" : "Newest"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {/* Render empty history text if historyEntries is empty */}
      {isLoading ? (
        <Text>Loading...</Text>
      ) : historyEntries.length === 0 ? (
        renderEmptyHistory()
      ) : (
        <View style={styles.historySection}>
          {historyEntries.map((entry, index) => (
            <View key={`${entry.id}-${index}`} style={styles.historyEntry}>
              <View style={styles.historyInfo}>
                <Text style={styles.historyDate}>{formatDate(entry.date)}</Text>
                <Text style={styles.historyDescription}>
                  {entry.name} Adoption
                </Text>
              </View>
              <View style={styles.historyDetails}>
                <Text style={styles.historyAdoptionFee}>
                  IDR.{" "}
                  {(
                    entry.adoptionFee +
                    entry.adoptionFee * 0.11
                  ).toLocaleString("id-ID")}
                </Text>
                <Text
                  style={[
                    styles.historyStatus,
                    entry.status === "Completed"
                      ? styles.completed
                      : entry.status === "Cancelled"
                      ? styles.cancelled
                      : styles.pending,
                  ]}
                >
                  {entry.status}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 40,
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
  title: {
    fontSize: 29,
    fontWeight: "bold",
    textAlign: "center",
    color: "#004AAD",
    marginRight: -10,
  },
  sortButtonContainer: {
    marginBottom: 20,
  },
  sortButton: {
    padding: 10,
  },
  sortButtonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#004AAD",
    borderRadius: 5,
    paddingHorizontal: 10,
    padding: 5,
  },
  sortButtonText: {
    fontSize: 16,
    color: "#004AAD",
    textAlign: "center",
    marginLeft: 5,
  },
  historySection: {
    width: "100%",
  },
  historyEntry: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },
  historyInfo: {
    flex: 1,
  },
  historyDate: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  historyDescription: {
    fontSize: 16,
    color: "#555",
  },
  historyDetails: {
    alignItems: "flex-end",
  },
  historyAdoptionFee: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#004AAD",
  },
  historyStatus: {
    fontSize: 14,
    marginTop: 4,
  },
  completed: {
    color: "green",
  },
  pending: {
    color: "orange",
  },
  cancelled: {
    color: "red",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#666",
    textAlign: "center",
  },
});

// Fungsi untuk memformat tanggal dari format Firestore
const formatDate = (timestamp) => {
  const date = new Date(timestamp);

  const options = {
    weekday: "long", // Menggunakan singkatan hari (e.g., Wed)
    day: "numeric", // Menggunakan angka untuk tanggal (e.g., 19)
    month: "short", // Menggunakan singkatan bulan (e.g., Jun)
    year: "numeric", // Menggunakan angka untuk tahun (e.g., 2024)
  };

  return date.toLocaleDateString("en-US", options);
};

export { formatDate }; // Export fungsi formatDate untuk digunakan di luar file

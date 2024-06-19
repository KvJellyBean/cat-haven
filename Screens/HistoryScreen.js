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
        setHistoryEntries(entries);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, []);

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

      <View style={styles.historySection}>
        {historyEntries.map((entry) => (
          <View key={entry.id} style={styles.historyEntry}>
            <View style={styles.historyInfo}>
              <Text style={styles.historyDate}>{formatDate(entry.date)}</Text>
              <Text style={styles.historyDescription}>
                {entry.name} Adoption
              </Text>
            </View>
            <View style={styles.historyDetails}>
              <Text style={styles.historyAdoptionFee}>
                IDR.{" "}
                {(entry.adoptionFee + entry.adoptionFee * 0.11).toLocaleString(
                  "id-ID"
                )}
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
    marginTop: 50,
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#004AAD",
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

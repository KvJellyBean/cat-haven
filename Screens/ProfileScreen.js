import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProfilePage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.profilePage}>
      <View style={styles.header} />

      <TouchableOpacity style={styles.back} onPress={() => navigation.pop()}>
        <Image style={styles.icon} source={require("../assets/back.png")} />
      </TouchableOpacity>

      <View style={styles.userProfile}>
        <View style={styles.userProfileBackground} />
        <Image
          style={styles.profileImage}
          source={require("../assets/banner.png")}
        />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>Your Full Name</Text>
          <Text style={styles.userBio}>I love all animal</Text>
        </View>
      </View>

      <Text style={styles.profileTitle}>My Profile</Text>

      <View style={styles.profileMenu}>
        <View style={styles.menuCard}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("PersonalInformationPage")}
          >
            <Image
              style={styles.menuIcon}
              source={require("../assets/splash.png")}
            />
            <Text style={styles.menuText}>Personal Information</Text>
            <Image
              style={[styles.icon, styles.reverseIcon]}
              source={require("../assets/back.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Image
              style={styles.menuIcon}
              source={require("../assets/splash.png")}
            />
            <Text style={styles.menuText}>Change Password</Text>
            <Image
              style={[styles.icon, styles.reverseIcon]}
              source={require("../assets/back.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem}>
            <Image
              style={styles.menuIcon}
              source={require("../assets/splash.png")}
            />
            <Text style={styles.menuText}>My Cart</Text>
            <Image
              style={[styles.icon, styles.reverseIcon]}
              source={require("../assets/back.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Image
              style={styles.menuIcon}
              source={require("../assets/splash.png")}
            />
            <Text style={styles.menuText}>Favourite</Text>
            <Image
              style={[styles.icon, styles.reverseIcon]}
              source={require("../assets/back.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Image
              style={styles.menuIcon}
              source={require("../assets/splash.png")}
            />
            <Text style={styles.menuText}>FAQ</Text>
            <Image
              style={[styles.icon, styles.reverseIcon]}
              source={require("../assets/back.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Image
              style={styles.menuIcon}
              source={require("../assets/splash.png")}
            />
            <Text style={styles.menuText}>Payment Method</Text>
            <Image
              style={[styles.icon, styles.reverseIcon]}
              source={require("../assets/back.png")}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem}>
            <Image
              style={styles.menuIcon}
              source={require("../assets/splash.png")}
            />
            <Text style={styles.menuText}>Log Out</Text>
            <Image
              style={[styles.icon, styles.reverseIcon]}
              source={require("../assets/back.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profilePage: {
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    backgroundColor: "#004AAD",
    height: 170,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 22,
    position: "absolute",
    width: "100%",
  },
  back: {
    position: "absolute",
    top: 60,
    left: 50,
  },
  icon: {
    height: 18,
    width: 18,
  },
  reverseIcon: {
    height: 14,
    transform: [{ rotate: "180deg" }],
    tintColor: "#8D8989",
  },
  userProfile: {
    marginTop: 120,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  userProfileBackground: {
    top: 10,
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 10,
    width: 300,
    height: 110,
    shadowColor: "rgba(0, 0, 0, 0.75)",
    shadowOffset: { width: 50, height: 50 },
    shadowOpacity: 1,
    shadowRadius: 50,
    elevation: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 100,
    marginTop: 15,
  },
  userDetails: {
    padding: 20,
    marginTop: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  userBio: {
    marginTop: 2.5,
    fontSize: 15,
    color: "gray",
  },
  profileTitle: {
    position: "absolute",
    top: 50,
    left: 80,
    right: 0,
    fontSize: 25,
    color: "white",
    textAlign: "start",
    fontWeight: "bold",
  },
  profileMenu: {
    marginTop: 40,
    alignItems: "center",
  },
  menuCard: {
    backgroundColor: "#F5F9FF",
    borderRadius: 10,
    width: 300,
    padding: 10,
    paddingHorizontal: 25,
    marginBottom: 30,
    shadowColor: "rgba(0, 0, 0, 0.85)",
    shadowOffset: { width: 50, height: 50 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  menuIcon: {
    width: 25,
    height: 25,
  },
  menuText: {
    flex: 1,
    marginLeft: 20,
    fontSize: 16,
    color: "#2A2A2A",
    textAlign: "left",
  },
});

export default ProfilePage;

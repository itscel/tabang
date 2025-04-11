import React from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const router = useRouter();

  const handleSignOut = () => {
    console.log("Sign out action");
    // Add your sign out logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#3c82f6" />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.placeholder} />
      </View>
      
      <View style={styles.content}>
        <Image 
          source={require('../../assets/images/profile.png')} 
          style={styles.emptyImage}
          resizeMode="contain"
        />
        <Text style={styles.text}>DO YOUR TASKS!!.</Text>
      </View>

      {/* Sign Out Button */}
      <TouchableOpacity
        style={styles.signOutButton}
        onPress={handleSignOut}
      >
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
  },
  placeholder: {
    width: 40,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 200,
    paddingBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    color: "#64748B",
  },
  emptyImage: {
    width: 220,
    height: 220,
    marginBottom: 16,
    alignItems: "center"
  },
  signOutButton: {
    backgroundColor: "#3B82F6",
    padding: 18,
    borderRadius: 12,
    margin:20,
    shadowColor: "#3B82F6",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  signOutButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});

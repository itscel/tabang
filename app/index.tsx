import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.replace("/(auth)/sign-in");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <View style={styles.decorativeContainer}>
          <View style={styles.outerCircle}>
            <View style={styles.innerCircle}>
              <Ionicons name="checkmark-done" size={48} color="#ffffff" />
            </View>
          </View>
          <View style={[styles.decorativeBox, styles.box1]} />
          <View style={[styles.decorativeBox, styles.box2]} />
          <View style={[styles.decorativeBox, styles.box3]} />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.title}>Manage Your Tasks</Text>
        <Text style={styles.subtitle}>
          Create, organize, and track your tasks with our intuitive todo app
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E293B",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  decorativeContainer: {
    width: width * 0.8,
    height: width * 0.8,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  outerCircle: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.25,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.9,
  },
  innerCircle: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },
  decorativeBox: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: "#60A5FA",
  },
  box1: {
    top: 0,
    right: 0,
    transform: [{ rotate: "45deg" }],
  },
  box2: {
    bottom: 20,
    left: 0,
    transform: [{ rotate: "-30deg" }],
  },
  box3: {
    top: 40,
    left: 20,
    transform: [{ rotate: "15deg" }],
    backgroundColor: "#93C5FD",
  },
  footer: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E293B",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 23,
  },
  button: {
    backgroundColor: "#3B82F6",
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 30,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

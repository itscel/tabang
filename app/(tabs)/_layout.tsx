import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#3c82f6",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderColor: "#ccc",
          height: 60,
          paddingBottom: 5,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case "index":
              iconName = "list";
              break;
            case "add":
              iconName = "add-circle";
              break;
            case "completed":
              iconName = "checkmark-done";
              break;
            case "profile":
              iconName = "person";
              break;
            default:
              iconName = "ellipse";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
       <Tabs.Screen name="index" options={{ title: "To Do" }} />
       <Tabs.Screen name="completed" options={{ title: "Completed" }} />
       <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}

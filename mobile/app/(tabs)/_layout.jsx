import { useAuth } from "@clerk/clerk-expo";
import { TouchableOpacity } from "react-native";
import { Redirect, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { COLORS } from "../../constants/colors";

const TabsLayout = () => {
  const { isSignedIn, isLoaded, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  if (!isLoaded) return null;

  if (!isSignedIn) return <Redirect href={"/(auth)/sign-in"} />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarStyle: {
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Recipes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant" size={size} color={color} />
          ),
          headerShown: true,
          headerBackground: () => (
            <BlurView intensity={50} style={{ flex: 1 }} />
          ),
          headerStyle: { backgroundColor: "transparent", height: 0 },
          headerRight: () => (
            <TouchableOpacity
              onPress={handleSignOut}
              style={{ marginRight: 16 }}
            >
              <Ionicons
                name="log-out-outline"
                size={24}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};
export default TabsLayout;

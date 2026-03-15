import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import Constants from "expo-constants";
import { Stack } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { ActivityIndicator, StyleSheet, View } from "react-native";

WebBrowser.maybeCompleteAuthSession();

const clerkPublishableKey = Constants.expoConfig.extra.clerkPublishableKey;

// Global loading component
function LoadingScreen() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey} tokenCache={tokenCache}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)/sign-in" />
        <Stack.Screen name="(auth)/sign-up" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="oauth-native-callback" />
        <Stack.Screen name="index" />
      </Stack>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

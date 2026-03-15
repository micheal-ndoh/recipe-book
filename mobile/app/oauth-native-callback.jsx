import { useAuth } from "@clerk/clerk-expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function OAuthCallback() {
  const { isLoaded, setActive, isSignedIn } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    if (!isLoaded) return;

    const handleOAuthCallback = async () => {
      try {
        console.log("OAuth callback params:", params);

        // If user is already signed in, redirect to main app
        if (isSignedIn) {
          router.replace("/recipes");
          return;
        }

        // Extract session ID from callback
        const { created_session_id } = params;

        if (created_session_id && typeof created_session_id === "string") {
          console.log("Setting active session:", created_session_id);
          await setActive({ session: created_session_id });
          // Redirect to main app
          router.replace("/recipes");
        } else {
          console.log("No session ID found, redirecting to sign in");
          router.replace("/sign-in");
        }
      } catch (error) {
        console.error("OAuth callback error:", error);
        // On error, redirect to sign in
        router.replace("/sign-in");
      }
    };

    handleOAuthCallback();
  }, [isLoaded, params, setActive, router, isSignedIn]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.text}>Completing sign in...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  text: {
    marginTop: 20,
    textAlign: "center",
    color: "#666",
    fontSize: 16,
  },
});

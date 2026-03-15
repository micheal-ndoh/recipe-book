import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

function IndexContent() {
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // If signed in, go to recipes tab, otherwise go to sign in
  if (isSignedIn) {
    return <Redirect href="/recipes" />;
  }

  return <Redirect href="/sign-in" />;
}

export default function Index() {
  return <IndexContent />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

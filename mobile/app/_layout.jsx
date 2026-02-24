import { Slot } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import * as WebBrowser from "expo-web-browser";
import Constants from "expo-constants";
import SafeScreen from "@/components/SafeScreen";

WebBrowser.maybeCompleteAuthSession();

const clerkPublishableKey = Constants.expoConfig.extra.clerkPublishableKey;

export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      tokenCache={tokenCache}
      afterSignInUrl="/(tabs)/index"
      afterSignUpUrl="/(tabs)/index"
    >
      <SafeScreen>
        <Slot />
      </SafeScreen>
    </ClerkProvider>
  );
}

import { useEffect } from 'react';
import { useAuth, useSignUp } from '@clerk/clerk-expo';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, ActivityIndicator, Text } from 'react-native';

export default function OAuthCallback() {
  const { isLoaded, setActive, isSignedIn } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    if (!isLoaded) return;

    const handleOAuthCallback = async () => {
      try {
        console.log('OAuth callback params:', params);
        
        // If user is already signed in, redirect to main app
        if (isSignedIn) {
          router.replace('/(tabs)/index');
          return;
        }

        // Extract session ID from callback
        const { created_session_id } = params;
        
        if (created_session_id && typeof created_session_id === 'string') {
          console.log('Setting active session:', created_session_id);
          await setActive({ session: created_session_id });
          // Small delay to ensure session is fully set
          setTimeout(() => {
            router.replace('/(tabs)/index');
          }, 100);
        } else {
          console.log('No session ID found, redirecting to sign in');
          router.replace('/(auth)/sign-in');
        }
      } catch (error) {
        console.error('OAuth callback error:', error);
        // On error, redirect to sign in
        router.replace('/(auth)/sign-in');
      }
    };

    handleOAuthCallback();
  }, [isLoaded, params, setActive, router, isSignedIn]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={{ marginTop: 20, textAlign: 'center', color: '#666' }}>
        Completing sign in...
      </Text>
    </View>
  );
}

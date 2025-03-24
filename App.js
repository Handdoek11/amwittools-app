import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppNavigator from './app/navigation/AppNavigator';
import { theme } from './app/themes/theme';
import SplashScreen from './app/components/common/SplashScreen';
import * as SplashScreenExpo from 'expo-splash-screen';

// Keep the splash screen visible while we initialize the app
SplashScreenExpo.preventAutoHideAsync();

// Create a QueryClient for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isSplashAnimationComplete, setIsSplashAnimationComplete] = useState(false);
  
  useEffect(() => {
    // Initialize app resources (data, assets, etc.)
    async function prepareApp() {
      try {
        // Simulate some loading or initialization time
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Set the app as ready when done
        setIsAppReady(true);
      } catch (e) {
        console.warn(e);
      } finally {
        // Hide the native splash screen
        await SplashScreenExpo.hideAsync();
      }
    }

    prepareApp();
  }, []);
  
  // Function called when our custom splash animation is complete
  const onSplashAnimationComplete = () => {
    setIsSplashAnimationComplete(true);
  };
  
  // Show the app only when both conditions are met:
  // 1. App resources are loaded (isAppReady)
  // 2. Custom splash animation is complete (isSplashAnimationComplete)
  const showApp = isAppReady && isSplashAnimationComplete;
  
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <NavigationContainer>
            {!showApp ? (
              <SplashScreen onFinish={onSplashAnimationComplete} />
            ) : (
              <AppNavigator />
            )}
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import StackNavigator from './src/navigation/StackNavigator';
import { CartProvider } from './src/context/CartContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <CartProvider>
          <StackNavigator />
          <StatusBar style="auto" />
        </CartProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from './Screens/Home';
import ProfileScr from './Screens/ProfileScr';
import HomeScreen from './Screens/HomeScreen';

// Import all category screens
import MobileScreen from './Screens/MobileScreen';
import TVScreen from './Screens/TVScreen';
import CarScreen from './Screens/CarScreen';
import BikeScreen from './Screens/BikeScreen';
import HeadphonesScreen from './Screens/HeadphonesScreen';
import CameraScreen from './Screens/CameraScreen';
import RealEstateScreen from './Screens/RealEstateScreen';
import GamesScreen from './Screens/GamesScreen';
import ProductDetail from './Screens/ProductDetail';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScr} />
        <Stack.Screen name="Mobile" component={MobileScreen} />
        <Stack.Screen name="TV" component={TVScreen} />
        <Stack.Screen name="Car" component={CarScreen} />
        <Stack.Screen name="Motorcycle" component={BikeScreen} />
        <Stack.Screen name="Headphones" component={HeadphonesScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="RealEstate" component={RealEstateScreen} />
        <Stack.Screen name="Games" component={GamesScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput,Image, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Home } from './Screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScr from './Screens/ProfileScr';
import HomeScreen from './Screens/HomeScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/> 
        <Stack.Screen name="Profile" component={ProfileScr} />
      </Stack.Navigator>
    </NavigationContainer>
);
}


import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Footer from '../components/Footer';

const { width, height } = Dimensions.get('window');

const products = [
  {
    id: '13',
    title: 'Royal Enfield Goan Classic',
    price: '₹2,35,000',
    image: require('../assets/bike1.png'),
    details: '350cc | 2022 Model | Dual Channel ABS',
    description: 'Royal Enfield Goan Classic in mint condition.\nYear: 2022\nOwner: 1st\nWell maintained, great for city & touring.',
    seller: {
      name: 'Ravi Mehta',
      rating: 4.7,
      yearsOnPlatform: 2,
    },
  },
  {
    id: '14',
    title: 'Bajaj Avenger Cruise 220',
    price: '₹1,45,696',
    image: require('../assets/bike2.jpg'),
    details: '220cc | 2021 Model | Single Channel ABS',
    description: 'Bajaj Avenger Cruise in excellent condition.\nYear: 2021\nOwner: 2nd\nPerfect for long rides and daily commute.',
    seller: {
      name: 'Karan Joshi',
      rating: 4.4,
      yearsOnPlatform: 1,
    },
  },
  {
    id: '15',
    title: 'Royal Enfield Bullet 350',
    price: '₹1,73,562',
    image: require('../assets/bike3.jpeg'),
    details: '350cc | 2020 Model | Kick & Self Start',
    description: 'Classic Royal Enfield Bullet with smooth performance.\nYear: 2020\nOwner: 1st\nServiced recently.',
    seller: {
      name: 'Sohail Khan',
      rating: 4.6,
      yearsOnPlatform: 3,
    },
  },
  {
    id: '16',
    title: 'Royal Enfield Himalayan',
    price: '₹2,85,000',
    image: require('../assets/bike4.webp'),
    details: '411cc | 2023 Model | Adventure Tourer',
    description: 'Royal Enfield Himalayan built for off-road and long rides.\nYear: 2023\nOwner: 1st\nTop-notch condition.',
    seller: {
      name: 'Priya Singh',
      rating: 4.8,
      yearsOnPlatform: 2,
    },
  },
];

export const bikeProducts = products;
export default function MobileScreen({ navigation }) {
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { product: item })} 
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search bikes..."
        placeholderTextColor="#FFFFFF"
        style={styles.searchBar}
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#272727',
    flex: 1,
    paddingHorizontal: 10,
  },
  searchBar: {
    marginTop: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FED766',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 16,
    marginTop:50
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#1e1e1e',
    width: (width - 40) / 2,
    height: height * 0.3, // 2/5 of screen height
    borderRadius: 10,
    borderColor: '#FED766',
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '80%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    color: '#FED766',
    marginTop: 4,
    textAlign: 'center',
  },
});

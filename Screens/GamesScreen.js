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
    id: '29',
    title: 'RED DEAD 2',
    price: '₹1,500',
    image: require('../assets/game1.jpg'),
    details: 'Xbox One version',
    description: 'Discs are in great condition.\nBoth discs are included.',
    seller: {
      name: 'Aman Sharma',
      rating: 4.5,
      yearsOnPlatform: 3,
    },
  },
  {
    id: '30',
    title: 'God of war',
    price: '₹2,600',
    image: require('../assets/game2.jpeg'),
    details: 'Xbox One version',
    description: 'Discs are in great condition.\nBoth discs are included.',
    seller: {
      name: 'Aman Sharma',
      rating: 4.5,
      yearsOnPlatform: 3,
    },
  },
  {
    id: '31',
    title: 'Elden Ring',
    price: '₹2,199',
    image: require('../assets/game3.jpeg'),
    details: 'Xbox One version',
    description: 'Discs are in great condition.\nBoth discs are included.',
    seller: {
      name: 'Aman Sharma',
      rating: 4.5,
      yearsOnPlatform: 3,
    },
  },
  {
    id: '32',
    title: 'Grand Theft Auto V',
    price: '₹1,600',
    image: require('../assets/game4.webp'),
    details: 'Xbox One version',
    description: 'Discs are in great condition.\nBoth discs are included.',
    seller: {
      name: 'Aman Sharma',
      rating: 4.5,
      yearsOnPlatform: 3,
    },
  },
];

export const gamesProducts = products;

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
        placeholder="Search games..."
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
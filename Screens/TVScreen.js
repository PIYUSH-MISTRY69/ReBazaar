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
    id: '5',
    title: '50 Inches Led Tv',
    price: '₹13,000',
    image: require('../assets/tv1.jpeg'),
    details: 'Zero Dot Technology',
    description: '3 Month Used Available.\nGreat Experience.',
    seller: {
      name: 'Aman Sharma',
      rating: 4.5,
      yearsOnPlatform: 3,
    },
  },
  {
    id: '6',
    title: 'Mi 55 inch LED 4k',
    price: '₹17,999',
    image: require('../assets/tv2.jpeg'),
    details: 'Zero Dot Technology',
    description: '3 Month Used Available.\nGreat Experience.',
    seller: {
      name: 'Aman Sharma',
      rating: 4.5,
      yearsOnPlatform: 3,
    },
  },
  {
    id: '7',
    title: '52 INCH ANDROID',
    price: '₹12,500',
    image: require('../assets/tv3.jpeg'),
    details: 'Zero Dot Technology',
    description: '3 Month Used Available.\nGreat Experience.',
    seller: {
      name: 'Aman Sharma',
      rating: 4.5,
      yearsOnPlatform: 3,
    },
  },
  {
    id: '8',
    title: 'Lg smart Led tv',
    price: '₹21,999',
    image: require('../assets/tv4.jpeg'),
    details: 'Zero Dot Technology',
    description: '3 Month Used Available.\nGreat Experience.',
    seller: {
      name: 'Aman Sharma',
      rating: 4.5,
      yearsOnPlatform: 3,
    },
  },
];

export const tvProducts = products;
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
        placeholder="Search TV's..."
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
    marginBottom: 10,
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
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
    id: '1',
    title: 'Samsung Galaxy S21',
    price: '₹45,000',
    image: require('../assets/galaxy.jpg'),
  },
  {
    id: '2',
    title: 'iPhone 13 Pro Max',
    price: '₹85,000',
    image: require('../assets/iphone.jpg'),
  },
  {
    id: '3',
    title: 'OnePlus Nord CE',
    price: '₹22,000',
    image: require('../assets/oneplus.jpg'),
  },
  {
    id: '4',
    title: 'Redmi Note 12',
    price: '₹14,000',
    image: require('../assets/redmi.jpg'),
  },
  
];

export default function MobileScreen({ navigation }) {
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search mobiles..."
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
    marginTop: 20,
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

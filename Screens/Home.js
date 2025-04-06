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
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { allProducts } from '../data/allProducts';
import Footer from '../components/Footer';

const { width, height } = Dimensions.get('window');

export default function Home({ navigation }) {
  const [search, setSearch] = useState('');

  const filteredProducts = allProducts.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const hotPicks = [
    {
      id: 'hp1',
      title: 'White Defender',
      price: '₹10,00,000',
      image: require('../assets/white-offroader-jeep-parking.jpg'),
      details: 'A powerful 4x4 off-roader perfect for adventure lovers.',
      description: 'This White Defender comes with advanced features and excellent condition.',
      seller: 'John Doe'
    },
    {
      id: 'hp2',
      title: 'Bajaj Avenger',
      price: '₹1,20,000',
      image: require('../assets/black-motorcycle-white.jpg'),
      details: 'Cruiser-style motorcycle with comfortable seating.',
      description: 'Well-maintained Bajaj Avenger for city and highway cruising.',
      seller: 'Aman Sharma'
    },
    {
      id: 'hp3',
      title: 'Toyota Supra',
      price: '₹9,00,000',
      image: require('../assets/2024-toyota-supra-45th-anniversary-edition_100889287_h.jpg'),
      details: 'Sports car with premium interiors and turbocharged engine.',
      description: 'This 2024 Toyota Supra is a collector’s dream with 45th anniversary edition trim.',
      seller: 'Rahul Patel'
    },
    {
      id: 'hp4',
      title: 'Continental GT650',
      price: '₹1,70,000',
      image: require('../assets/royal-enfield-continental-gt-650-twin-1567499781.jpg'),
      details: 'Royal Enfield twin-cylinder café racer for performance riding.',
      description: 'Minimal use, service history available, single-owner bike.',
      seller: 'Sneha Verma'
    }
  ];

  const renderProduct = ({ item }) => (
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
      <View style={styles.header}>
        <View style={styles.logobox}>
          <Image style={styles.logo} source={require('../assets/rebazaar.jpg')} />
        </View>
        <TextInput
          placeholder="Search all products..."
          placeholderTextColor="#FFFFFF"
          style={styles.search}
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Icon style={styles.icon2} name="cart-plus" size={33} />
        </TouchableOpacity>
      </View>

      {search.length > 0 ? (
        filteredProducts.length > 0 ? (
          <FlatList
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        ) : (
          <View style={styles.notFoundContainer}>
            <Text style={styles.notFoundText}>No products found</Text>
          </View>
        )
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <View style={styles.label}>
            <Text style={{ fontSize: 20, color: '#FFFFFF', fontWeight: 'bold' }}>Top Categories</Text>
          </View>

          <View style={styles.tcboxes}>
            <TouchableOpacity style={styles.tcicons} onPress={() => navigation.navigate('Mobile')}>
              <Icon name="mobile" size={50} color={'#FFFFFF'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tcicons} onPress={() => navigation.navigate('TV')}>
              <Icon name="tv" size={40} color={'#FFFFFF'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tcicons} onPress={() => navigation.navigate('Car')}>
              <Icon name="car" size={40} color={'#FFFFFF'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tcicons} onPress={() => navigation.navigate('Motorcycle')}>
              <Icon name="motorcycle" size={40} color={'#FFFFFF'} />
            </TouchableOpacity>
          </View>

          <View style={styles.tcboxes}>
            <TouchableOpacity style={styles.tcicons} onPress={() => navigation.navigate('Headphones')}>
              <Icon name="headphones" size={50} color={'#FFFFFF'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tcicons} onPress={() => navigation.navigate('Camera')}>
              <Icon name="camera-retro" size={40} color={'#FFFFFF'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tcicons} onPress={() => navigation.navigate('RealEstate')}>
              <Icon name="building" size={40} color={'#FFFFFF'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tcicons} onPress={() => navigation.navigate('Games')}>
              <Icon name="gamepad" size={40} color={'#FFFFFF'} />
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: 'center' }}>
            <View style={{ backgroundColor: '#FED766', marginTop: 20, width: '30%', borderRadius: 9, padding: 3 }}>
              <Text style={{ textAlign: 'center', fontSize: 20, color: '#000000', fontWeight: 'bold' }}>Hot picks!</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
            {hotPicks.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.imgbox}
                onPress={() => navigation.navigate('ProductDetail', { product })}
              >
                <Image source={product.image} style={styles.img} />
                <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 'bold' }}>{product.title}</Text>
                <Text style={{ color: '#FED766', fontSize: 15 }}>{product.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}

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
  header: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
    borderBottomWidth: 3,
    borderBottomColor: '#FED766',
  },
  logobox: {
    height: 40,
    width: 40,
    backgroundColor: '#FED766',
    marginTop: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    height: 38,
    width: 38,
    borderRadius: 5
  },
  search: {
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#FED766',
    borderRadius: 10,
    marginTop: 40,
    width: 240,
    paddingLeft: 10,
    marginBottom: 20,
    color: '#FFFFFF'
  },
  icon2: {
    color: "#FED766",
    marginTop: 50,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#1e1e1e',
    width: (width - 40) / 2,
    height: height * 0.3,
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
  label: {
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#FED766'
  },
  tcboxes: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  tcicons: {
    width: '20%',
    borderRightWidth: 5,
    borderLeftWidth: 5,
    borderRightColor: '#FED766',
    borderLeftColor: '#FED766',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 55,
    margin: 5
  },
  img: {
    height: 150,
    width: 180,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#FED766',
  },
  imgbox: {
    marginTop: 20,
    alignItems: "center"
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 18,
    color: '#FFF',
    marginTop: 50,
  },
});

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Footer from '../components/Footer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useCart } from '../context/CartContext';

const { height } = Dimensions.get('window');

const ProductDetailsScreen = ({ route,navigation }) => {
  const { product } = route.params;
  const { addToCart } = useCart();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <Image source={product.image} style={styles.productImage} />

        <View style={styles.content}>

          <View style={styles.sellerBox}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>{product.price.toLocaleString()}</Text>
          </View>

          <View style={styles.sellerBox}>
          <Text style={styles.sectionHeader}>Details:</Text>
          <Text style={styles.text}>{product.details}</Text>
          </View>


          <View style={styles.sellerBox}>
          <Text style={styles.sectionHeader}>Description:</Text>
          <Text style={styles.text}>{product.description}</Text>
          </View>
          

          <Text style={styles.sectionHeader}>About the Seller:</Text>
          <View style={styles.sellerBox}>
            <Text style={styles.text}>👤 {product.seller.name}</Text>
            <Text style={styles.text}>⭐ {product.seller.rating} Rating</Text>
            <Text style={styles.text}>📅 {product.seller.yearsOnPlatform} years on ReBazaar</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.button} onPress={() => addToCart(product)}>
          <Icon name="shopping-cart" size={20} color="#000" />
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chat', { product })}>
          <Icon name="comments" size={20} color="#000" />
          <Text style={styles.buttonText}>Chat</Text>
        </TouchableOpacity>
      </View>

      <Footer navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272727',
  },
  productImage: {
    marginTop:30,
    width: '100%',
    height: height * 0.6,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FED766',
    marginBottom: 5,
  },
  price: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 15,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FED766',
    padding: 5
    
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginTop: 4,
    backgroundColor: '#1e1e1e',
    padding: 10
  },
  sellerBox: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
    marginBottom: 20
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#000',
    
    padding: 10,
    position: 'absolute',
    bottom: 60, // Above Footer
    left: 0,
    right: 0,
    zIndex: 1,
  },
  button: {
    backgroundColor: '#FED766',
    padding: 10,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetailsScreen;

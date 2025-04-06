import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';

const CartScreen = ({ navigation }) => {
  const { cartItems, removeFromCart, getTotalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    alert('Proceeding to checkout...');
    clearCart();
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.seller}>Seller: {item.seller.name}</Text>
        <TouchableOpacity
          onPress={() => removeFromCart(item.id)}
          style={styles.removeButton}
        >
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      <View style={styles.contentWrapper}>
        <Text style={styles.header}>Your Cart</Text>

        {cartItems.length === 0 ? (
          <Text style={styles.empty}>No products in cart.</Text>
        ) : (
          <>
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />

            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>
                Total: ₹{getTotalPrice().toLocaleString()}
              </Text>
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={handleCheckout}
              >
                <Text style={styles.checkoutText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#272727',
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  header: {
    fontSize: 30,
    color: '#FED766',
    marginBottom: 15,
    fontWeight: 'bold',
    marginTop:20
  },
  empty: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  listContent: {
    paddingBottom: 140, // space for total + footer
  },
  item: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 10,
  },
  image: {
    width: 120,
    height: 120,
    marginRight: 10,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  details: {
    flex: 1,
    justifyContent: 'space-around',
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    color: '#FED766',
    fontSize: 16,
    marginTop: 4,
  },
  seller: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 4,
  },
  removeButton: {
    marginTop: 8,
    backgroundColor: '#FED766',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    width: '100%',
  },
  removeText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  totalContainer: {
    borderTopWidth: 1.5,
    borderTopColor: '#FED766',
    paddingTop: 15,
    marginTop: 10,
    alignItems: 'center',
  },
  totalText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    marginTop: 10,
    backgroundColor: '#FED766',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
    width: '100%',
  },
  checkoutText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CartScreen;

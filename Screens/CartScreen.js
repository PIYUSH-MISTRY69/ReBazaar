import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';

const CartScreen = () => {
  const { cartItems, removeFromCart, getTotalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    alert('Proceeding to checkout...');
    clearCart(); //  This empties the cart
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.empty}>No products in cart.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
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
            )}
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
    
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#272727', flex: 1 },
  header: { fontSize: 30, color: '#FED766', marginBottom: 15, fontWeight: 750,marginTop:15 },
  empty: { color: '#fff'},
  item: { flexDirection: 'row', marginBottom: 15, alignItems: 'center',backgroundColor: '#333',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
    marginBottom: 20 },
  image: { width: 200, height: 200 , marginRight: 10,borderRadius: 8, },
  details: {
    flex: 1,
    padding: 10,
    justifyContent: "space-around",
    height:"100%"
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    color: '#FED766',
    fontSize: 18,
    marginTop: 4,
  },
  seller: {
    color: '#aaa',
    fontSize: 15,
    marginTop: 4,
  },
  removeButton: {
    marginTop: 8,
    backgroundColor: '#FED766',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    width:"100%"
  },
  removeText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign:'center'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
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
    width:"100%",
    
  },
  checkoutText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign:"center"
  },
});

export default CartScreen;

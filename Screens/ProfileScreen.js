import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Footer from '../components/Footer';

const ProfileScreen = ({ navigation }) => {
  const user = {
    name: 'Shiva Reddy',
    email: 'shiva@example.com',
    phone: '+91 9876543210',
    profileImage: 'https://i.pravatar.cc/150?img=12',
  };

  return (
    <View style={styles.container}>
      <View style={styles.con1}>
        <View style={styles.profileCard}>
          <Image source={{ uri: user.profileImage }} style={styles.image} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.info}>{user.email}</Text>
          <Text style={styles.info}>{user.phone}</Text>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => alert('Edit Profile Coming Soon!')}
          >
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      

      <Footer navigation={navigation} />
    </View>
    
   
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#272727',
    flex: 1,
    padding: 0,
    justifyContent:"space-between",
    paddingBottom: 0,
    
  },

  con1: {
    flex:1,
    alignItems:"center",
    justifyContent: "center",
    
  },

  profileCard: {
    backgroundColor: '#333',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    borderColor: '#FED766',
    borderWidth: 2,
    elevation: 4,
    width: '85%',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FED766',
    marginBottom: 15,
  },
  name: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 3,
  },
  editButton: {
    marginTop: 20,
    backgroundColor: '#FED766',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 8,
  },
  editText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileScreen;

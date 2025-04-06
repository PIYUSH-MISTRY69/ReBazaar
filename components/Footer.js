import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Footer({ navigation }) {
  return (
    <View style={{
      flexDirection:'row',
      height: 50,
      width: '100%',
      backgroundColor:'#FED766',
      marginTop: 30,
      justifyContent:'space-between',
      borderRadius:15
    }}>
      <TouchableOpacity style={{ width: '10%', marginTop: 5, marginLeft: 7.5 }} onPress={() => navigation.navigate('Home')}>
        <View style={{ backgroundColor: '#000000', alignItems: 'center', borderRadius: 10 }}>
          <Icon name="home" size={40} color={'#FED766'} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{ width: '12%', marginTop: 5 }} onPress={() => navigation.navigate('Profile')}>
        <View style={{ backgroundColor: '#000000', alignItems: 'center', borderRadius: 10 }}>
          <Icon name="user" size={40} color={'#FED766'} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{ width: '20%' }} onPress={() => navigation.navigate('AddProduct')}>
        <View style={{ backgroundColor: '#000000', alignItems: 'center', borderRadius: 10 }}>
          <Icon name="plus" size={50} color={'#FED766'} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{ width: '12%', marginTop: 5 }} onPress={() => navigation.navigate('ChatList')}>
        <View style={{ backgroundColor: '#000000', alignItems: 'center', borderRadius: 10 }}  onPress={() => navigation.navigate('ChatListScreen')}>
          <Icon name="comment" size={40} color={'#FED766'} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{ width: '10%', marginTop: 5, marginRight: 7.5 }} onPress={() => navigation.navigate('Aboutus')}>
        <View style={{ backgroundColor: '#000000', alignItems: 'center', borderRadius: 10 }}>
          <Icon name="exclamation" size={40} color={'#FED766'} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

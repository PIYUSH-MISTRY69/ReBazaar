import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Footer({ navigation }) {
  return (
    <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FED766',
        paddingVertical: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    }}>
      <TouchableOpacity style={{ width: '10%', marginTop: 5, marginLeft: 7.5 }} onPress={() => navigation.navigate('Profile')}>
        <View style={{ backgroundColor: '#000000', alignItems: 'center', borderRadius: 10 }}>
          <Icon name="user" size={40} color={'#FED766'} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{ width: '12%', marginTop: 5 }}>
        <View style={{ backgroundColor: '#000000', alignItems: 'center', borderRadius: 10 }}>
          <Icon name="suitcase" size={40} color={'#FED766'} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{ width: '20%' }}>
        <View style={{ backgroundColor: '#000000', alignItems: 'center', borderRadius: 10 }}>
          <Icon name="plus" size={50} color={'#FED766'} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{ width: '12%', marginTop: 5 }}>
        <View style={{ backgroundColor: '#000000', alignItems: 'center', borderRadius: 10 }}>
          <Icon name="comment" size={40} color={'#FED766'} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{ width: '10%', marginTop: 5, marginRight: 7.5 }}>
        <View style={{ backgroundColor: '#000000', alignItems: 'center', borderRadius: 10 }}>
          <Icon name="exclamation" size={40} color={'#FED766'} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

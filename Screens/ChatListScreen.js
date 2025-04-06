import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatListScreen = ({ navigation }) => {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      const data = await AsyncStorage.getItem('chat_list');
      if (data) {
        setChatList(JSON.parse(data));
      }
    };

    const unsubscribe = navigation.addListener('focus', fetchChats);
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate('Chat', { product: {
        id: item.productId,
        title: item.productTitle,
        seller: { name: item.sellerName }
      } })}
    >
      <Text style={styles.title}>{item.productTitle}</Text>
      <Text style={styles.subText}>Seller: {item.sellerName}</Text>
      <Text style={styles.message}>{item.lastMessage}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        <View style={{height:40}}>

        </View>
      <FlatList
        data={chatList}
        keyExtractor={item => item.productId.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No chats yet.</Text>
        }
      />
    </View>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 10,
  },
  chatItem: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    color: '#FED766',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subText: {
    color: '#bbb',
    marginTop: 4,
  },
  message: {
    color: '#fff',
    marginTop: 6,
  },
  emptyText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
  },
});

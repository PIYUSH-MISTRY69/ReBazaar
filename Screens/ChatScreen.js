import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../components/Footer'; // Adjust the path as needed

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hi! How can I help you?', sender: 'seller' },
    { id: '2', text: 'I’m interested in your product.', sender: 'buyer' },
    { id: '3', text: 'Great! It’s still available.', sender: 'seller' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;

    const newMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'buyer',
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.message,
        item.sender === 'buyer' ? styles.buyerMessage : styles.sellerMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.container}
          keyboardVerticalOffset={90}
        >
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.chatContainer}
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Type a message..."
              placeholderTextColor="#ccc"
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Icon name="send" size={20} color="#FED766" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      
      <Footer navigation={navigation} />
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#272727',
    paddingTop : 50,
  },
  container: {
    flex: 1,
  },
  chatContainer: {
    padding: 10,
    paddingBottom: 100, // To give space for input + footer
  },
  message: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  buyerMessage: {
    backgroundColor: '#FED766',
    alignSelf: 'flex-end',
  },
  sellerMessage: {
    backgroundColor: '#444',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#444',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#333',
  },
  input: {
    flex: 1,
    color: '#fff',
    backgroundColor: '#555',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  sendButton: {
    padding: 8,
  },
});

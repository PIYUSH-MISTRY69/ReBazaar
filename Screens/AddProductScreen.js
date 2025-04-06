import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, StyleSheet, Platform, Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const conditions = ['New', 'Like New', 'Good', 'Fair', 'Poor'];
const categories = [
  'Mobile', 'TV', 'Car', 'Bike',
  'Headphones', 'Camera', 'RealEstate', 'Games'
];

const AddProductScreen = () => {
  const [selectedCondition, setSelectedCondition] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    detail: ''
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    console.log('Product listed:', {
      ...form,
      condition: selectedCondition,
      category: selectedCategory,
      image
    });
    // Add further logic like API calls here
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>List Your Product</Text>

      <TouchableOpacity onPress={pickImage} style={styles.imageUpload}>
        {image ? (
          <Image source={{ uri: image }} style={styles.uploadedImage} />
        ) : (
          <Text style={styles.imageUploadText}>Tap to upload photo</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        placeholderTextColor="#999"
        value={form.title}
        onChangeText={(text) => setForm({ ...form, title: text })}
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter price"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={form.price}
        onChangeText={(text) => setForm({ ...form, price: text })}
      />

      <Text style={styles.label}>Detail</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter details (e.g. Model, Year of MFG)"
        placeholderTextColor="#999"
        value={form.detail}
        onChangeText={(text) => setForm({ ...form, detail: text })}
      />


      <Text style={styles.label}>Category</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.chip, selectedCategory === cat && styles.chipSelected]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[styles.chipText, selectedCategory === cat && styles.chipTextSelected]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.label}>Condition</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
        {conditions.map((cond) => (
          <TouchableOpacity
            key={cond}
            style={[styles.chip, selectedCondition === cond && styles.chipSelected]}
            onPress={() => setSelectedCondition(cond)}
          >
            <Text style={[styles.chipText, selectedCondition === cond && styles.chipTextSelected]}>
              {cond}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter description"
        placeholderTextColor="#999"
        multiline
        numberOfLines={4}
        value={form.description}
        onChangeText={(text) => setForm({ ...form, description: text })}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>List Product</Text>
      </TouchableOpacity>
      <View style={{height:80}}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#272727',
    padding: 20,
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FED766',
    marginBottom: 20,
    marginTop:20
  },
  label: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#333',
    color: '#FFF',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imageUpload: {
    height: 150,
    borderRadius: 10,
    backgroundColor: '#333',
    borderColor: '#FED766',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imageUploadText: {
    color: '#FED766',
    fontSize: 16,
  },
  chips: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  chip: {
    backgroundColor: '#444',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#666',
  },
  chipSelected: {
    backgroundColor: '#FED766',
    borderColor: '#FED766',
  },
  chipText: {
    color: '#FFF',
    fontSize: 14,
  },
  chipTextSelected: {
    color: '#000',
    fontWeight: 'bold',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#FED766',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddProductScreen;

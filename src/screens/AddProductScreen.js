import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, StyleSheet, Platform, Image,
  Alert, FlatList, ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../lib/supabase';
import * as FileSystem from 'expo-file-system';
import { checkProfileCompletion } from '../utils/profileUtils';

const conditions = ['New', 'Like New', 'Good', 'Fair', 'Poor'];
const categories = [
  'Mobile', 'TV', 'Cars', 'Bikes',
  'Headphones', 'Cameras', 'Real Estate', 'Games',
  'Others'
];

// Map display categories to database categories
const categoryMap = {
  'Mobile': 'mobile',
  'TV': 'tv',
  'Cars': 'car',
  'Bikes': 'bike',
  'Headphones': 'headphones',
  'Cameras': 'cameras',
  'Real Estate': 'realestate',
  'Games': 'games',
  'Others': 'others'
};

const AddProductScreen = ({ navigation }) => {
  const [selectedCondition, setSelectedCondition] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    detail: ''
  });

  useEffect(() => {
    checkUser();
    verifyProfileCompletion();
  }, []);

  const verifyProfileCompletion = async () => {
    try {
      const { isComplete, missingFields } = await checkProfileCompletion();
      
      if (!isComplete) {
        const missingFieldsFormatted = missingFields
          .map(field => field.replace(/([A-Z])/g, ' $1').toLowerCase())
          .join(', ');

        Alert.alert(
          'Profile Incomplete',
          `Please complete your profile before adding listings. Missing information: ${missingFieldsFormatted}`,
          [
            { 
              text: 'Complete Profile', 
              onPress: () => navigation.navigate('EditProfile')
            },
            {
              text: 'Cancel',
              onPress: () => navigation.goBack(),
              style: 'cancel'
            }
          ]
        );
      }
    } catch (error) {
      console.error('Error checking profile:', error.message);
      Alert.alert('Error', 'Failed to verify profile completion');
    }
  };

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        Alert.alert('Error', 'Please login first');
        navigation.replace('Login');
        return;
      }
      setUserId(user.id);
    } catch (error) {
      console.error('Error checking user:', error.message);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      quality: 1,
      base64: true
    });

    if (!result.canceled) {
      const newImages = result.assets.map(asset => ({
        uri: asset.uri,
        type: asset.type || 'image',
        base64: asset.base64
      }));
      
      // Check if adding new images would exceed the limit
      if (images.length + newImages.length > 6) {
        Alert.alert(
          'Too Many Images',
          'You can only upload a maximum of 6 images. Please select fewer images.'
        );
        return;
      }
      
      setImages([...images, ...newImages]);
    }
  };

  const uploadImage = async (base64File, fileType) => {
    try {
      const fileName = `${userId}_${Date.now()}`;
      const filePath = `products/${fileName}`;
      const { data, error } = await supabase.storage
        .from('media')
        .upload(filePath, decode(base64File), {
          contentType: fileType === 'video' ? 'video/mp4' : 'image/jpeg'
        });

      if (error) throw error;
      
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error.message);
      throw error;
    }
  };

  const handleSubmit = async () => {
    try {
      const { isComplete } = await checkProfileCompletion();
      if (!isComplete) {
        Alert.alert(
          'Profile Incomplete',
          'Please complete your profile before adding listings.',
          [
            { 
              text: 'Complete Profile', 
              onPress: () => navigation.navigate('EditProfile')
            },
            { text: 'Cancel', style: 'cancel' }
          ]
        );
        return;
      }

      if (!form.title || !form.price || !selectedCategory || !selectedCondition) {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }

      if (images.length === 0) {
        Alert.alert('Error', 'Please add at least one image');
        return;
      }

      setLoading(true);
      
      // Upload all images and get their URLs
      const imageUrls = await Promise.all(
        images.map(img => uploadImage(img.base64, img.type))
      );

      // Prepare product data
      const productData = {
        title: form.title,
        description: form.description,
        price: parseFloat(form.price),
        detail: form.detail,
        condition: selectedCondition,
        category: categoryMap[selectedCategory],  // Convert display category to database category
        images: imageUrls,
        user_id: userId,
        created_at: new Date()
      };

      console.log('Saving product with data:', productData);

      // Insert product into database
      const { data, error } = await supabase
        .from('products')
        .insert([productData]);

      if (error) throw error;

      Alert.alert('Success', 'Product listed successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>List Your Product</Text>

      <TouchableOpacity onPress={pickImage} style={styles.imageUpload}>
        <Text style={styles.imageUploadText}>
          Tap to upload photos/videos ({images.length} selected)
        </Text>
      </TouchableOpacity>

      {images.length > 0 && (
        <FlatList
          data={images}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: item.uri }} style={styles.imagePreview} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => {
                  const newImages = [...images];
                  newImages.splice(index, 1);
                  setImages(newImages);
                }}
              >
                <Text style={styles.removeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
          )}
          style={styles.imageList}
        />
      )}

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
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
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

      <TouchableOpacity 
        style={[styles.submitButton, loading && styles.submitButtonDisabled]} 
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.submitButtonText}>
          {loading ? 'Listing Product...' : 'List Product'}
        </Text>
      </TouchableOpacity>
      <View style={{height:80}}></View>
    </ScrollView>
  );
};

const decode = (base64) => {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
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
  imageList: {
    marginVertical: 10,
  },
  imagePreviewContainer: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
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
    backgroundColor: '#FED766',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#272727',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
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

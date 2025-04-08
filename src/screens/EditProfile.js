import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { supabase } from '../lib/supabase';

export default function EditProfileScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    username: '',
    fullName: '',
    phoneNumber: '',
    address: ''
  });

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error('No user logged in!');

      const { data, error } = await supabase
        .from('profiles')
        .select('username, full_name, phone_number, location')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        const profileData = {
          username: data.username || '',
          fullName: data.full_name || '',
          phoneNumber: data.phone_number || '',
          address: data.location || ''
        };
        console.log('Profile data from DB:', {
          raw: data,
          processed: profileData
        });
        setProfile(profileData);
      }
    } catch (error) {
      console.error('Error loading profile:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error('No user logged in!');

      if (!profile.username || !profile.fullName) {
        Alert.alert('Error', 'Username and Full Name are required');
        return;
      }

      const updates = {
        id: user.id,
        username: profile.username,
        full_name: profile.fullName,
        phone_number: profile.phoneNumber,
        location: profile.address,
        updated_at: new Date(),
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(updates);

      if (error) throw error;

      Alert.alert('Success', 'Profile updated successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        label="Username"
        value={profile.username}
        onChangeText={(text) => setProfile({ ...profile, username: text })}
        mode="outlined"
        style={styles.input}
        theme={inputTheme}
        textColor='#fed766'
      />

      <TextInput
        label="Full Name"
        value={profile.fullName}
        onChangeText={(text) => setProfile({ ...profile, fullName: text })}
        mode="outlined"
        style={styles.input}
        theme={inputTheme}
        textColor='#fed766'
       
        
      />

      <TextInput
        label="Phone Number"
        value={profile.phoneNumber ? profile.phoneNumber.toString() : ''}
        onChangeText={(text) => setProfile({ ...profile, phoneNumber: text })}
        mode="outlined"
        keyboardType="phone-pad"
        style={styles.input}
        theme={inputTheme}
        textColor='#fed766'
      />

      <TextInput
        label="Address"
        value={profile.address}
        onChangeText={(text) => setProfile({ ...profile, address: text })}
        mode="outlined"
        style={styles.input}
        theme={inputTheme}
        textColor='#fed766'
      />

      <Button
        mode="contained"
        onPress={updateProfile}
        loading={loading}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Save Changes
      </Button>

      <Button
        mode="outlined"
        onPress={() => navigation.goBack()}
        style={styles.cancelButton}
        labelStyle={styles.cancelButtonLabel}
      >
        Cancel
      </Button>
    </ScrollView>
  );
}

const inputTheme = {
  colors: {
    primary: '#FED766',
    text: '#FED766',
    placeholder: '#888',
    background: '#272727',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272727',
    padding: 16,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#333',
  },
  button: {
    backgroundColor: '#FED766',
    marginTop: 10,
    borderRadius: 8,
  },
  buttonLabel: {
    color: '#272727',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    marginTop: 10,
    borderColor: '#FED766',
    borderRadius: 8,
  },
  cancelButtonLabel: {
    color: '#FED766',
  },
});

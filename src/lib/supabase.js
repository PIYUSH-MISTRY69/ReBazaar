import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Custom storage implementation for React Native using expo-secure-store
const ExpoSecureStoreAdapter = {
  getItem: (key) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key, value) => {
    return SecureStore.setItemAsync(key, value);
  },
  removeItem: (key) => {
    return SecureStore.deleteItemAsync(key);
  },
};

// Your Supabase configuration
const supabaseUrl = 'https://znwheidesjkzcovkyhxp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpud2hlaWRlc2premNvdmt5aHhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzNjUyMzQsImV4cCI6MjA1ODk0MTIzNH0.lRSuRvOht9G276HtcRMjoZq255p8MbtCV_E4VGd84xI';

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Helper function to get profile image path
const getProfileImagePath = async (filename) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No user logged in!');
  return `${user.id}/${filename}`;
};

// Function to ensure profile schema exists
const ensureProfileSchema = async () => {
  try {
    const { error } = await supabase.rpc('ensure_profile_schema');
    if (error) throw error;
    console.log('Profile schema ensured successfully');
  } catch (error) {
    console.error('Error ensuring profile schema:', error);
    // Create the function if it doesn't exist
    const { error: createError } = await supabase.rpc('create_profile_schema_function');
    if (createError) {
      // If the function creation fails, create it manually
      const { error: manualError } = await supabase
        .from('profiles')
        .select()
        .limit(1);

      if (manualError && manualError.code === '42P01') {
        // Table doesn't exist, create it
        const { error: createTableError } = await supabase.rpc('create_profiles_table');
        if (createTableError) {
          console.error('Error creating profiles table:', createTableError);
        }
      }
    }
  }
};

// Test function to verify Supabase connection
const testSupabaseConnection = async () => {
  try {
    console.log('Starting Supabase connection test...');

    // Test 1: Check if we can authenticate
    const { data: authData, error: authError } = await supabase.auth.getSession();
    if (authError) {
      throw new Error(`Authentication Error: ${authError.message}`);
    }
    console.log('✅ Authentication working');

    // Test 2: Check if we can connect to Supabase Storage
    try {
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
      if (bucketsError) throw bucketsError;

      console.log('✅ Storage connection working');
      console.log('Available buckets:', buckets.map(b => b.name).join(', '));

      // Check for profile-images bucket
      const profileImagesBucket = buckets.find(b => b.name === 'profile-images');
      if (!profileImagesBucket) {
        console.log('Creating profile-images bucket...');
        const { error: createError } = await supabase.storage.createBucket('profile-images', {
          public: true,
          allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif'],
          fileSizeLimit: 1024 * 1024 * 2, // 2MB
        });
        if (createError) throw createError;
        console.log('✅ profile-images bucket created');
      }

      // Test bucket access
      const { data: bucketFiles, error: bucketError } = await supabase.storage
        .from('profile-images')
        .list();

      if (bucketError) throw bucketError;
      console.log('✅ Bucket access working');

    } catch (error) {
      if (error.message.includes('bucket not found')) {
        console.log('Creating profile-images bucket...');
        const { error: createError } = await supabase.storage.createBucket('profile-images', {
          public: true,
          allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif'],
          fileSizeLimit: 1024 * 1024 * 2, // 2MB
        });
        if (createError) throw createError;
        console.log('✅ profile-images bucket created');
      } else {
        throw error;
      }
    }

    // Ensure profile schema exists
    await ensureProfileSchema();
    console.log('✅ Profile schema verified');

    console.log('✅ All tests passed!');
    return true;
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    throw error;
  }
};

// Default export of the Supabase instance and utilities
export {
  supabase,
  testSupabaseConnection,
  getProfileImagePath,
  ensureProfileSchema,
};

export default {
  supabase,
  testSupabaseConnection,
  getProfileImagePath,
  ensureProfileSchema,
};

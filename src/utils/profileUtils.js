import { supabase } from '../lib/supabase';

export const checkProfileCompletion = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No user logged in');

    const { data, error } = await supabase
      .from('profiles')
      .select('username, full_name, phone_number, location')
      .eq('id', user.id)
      .single();

    if (error) throw error;

    // Check if required fields are filled
    const requiredFields = {
      username: data?.username,
      fullName: data?.full_name,
      phoneNumber: data?.phone_number,
      location: data?.location
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    return {
      isComplete: missingFields.length === 0,
      missingFields,
      profile: data
    };
  } catch (error) {
    console.error('Error checking profile completion:', error.message);
    throw error;
  }
};

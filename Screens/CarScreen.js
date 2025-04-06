import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CarScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Car Category</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#272727', justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 26, color: '#FED766', fontWeight: 'bold' },
});
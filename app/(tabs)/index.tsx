import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const HomePage: React.FC = () => {

  const handlePress = () => {
    Alert.alert('Bienvenue !', 'Tu as cliqué sur le bouton 🎉');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Bienvenue sur la HomePage !</Text>
 
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}></Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF0F1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3A47',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#596275',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#1B9CFC',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

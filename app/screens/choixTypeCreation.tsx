import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const OeuvresScreen = () => {
  const router = useRouter();

  const handlePress = (type: number) => {
    // Redirige vers le formulaire avec la variable type
    router.push({ pathname: "/formulaire", params: { type: type.toString() } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisir le type d'œuvre à créer</Text>

      <TouchableOpacity style={styles.button} onPress={() => handlePress(1)}>
        <Text style={styles.buttonText}>Œuvre Graphique</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handlePress(0)}>
        <Text style={styles.buttonText}>Œuvre Littéraire</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    width: 250,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OeuvresScreen;

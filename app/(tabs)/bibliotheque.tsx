import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import {useRouter} from "expo-router";

const BibliothequePage: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ma Bibliothèque</Text>

      <Pressable style={styles.card} onPress={() => router.push('/screens/register')}>
        <Text style={styles.cardText}>📖 Mes créations</Text>
      </Pressable>

      <Pressable style={styles.card} onPress={() => router.push('/screens/register')}>
        <Text style={styles.cardText}>📚 Mes lectures</Text>
      </Pressable>

      <Pressable style={styles.card} onPress={() => router.push('/screens/register')}>
        <Text style={styles.cardText}>⭐ Mes favoris</Text>
      </Pressable>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A020F0',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    width: screenWidth - 40,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BibliothequePage;

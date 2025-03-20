import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, FlatList, Dimensions, Text, Pressable, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

// Type pour chaque roman
type Book = {
  id: string | number;
  title: string;
  image: any; // Pour require()
};

// Tableau local des covers
const localCovers: any[] = [
  require('../../assets/images/imgCoverRoman/CoversRoman1.jpeg'),
  require('../../assets/images/imgCoverRoman/CoversRoman2.jpg'),
  require('../../assets/images/imgCoverRoman/CoversRoman3.jpeg'),
  require('../../assets/images/imgCoverRoman/CoversRoman4.jpeg'),
  // Tu peux en rajouter d'autres si nécessaire
];

const LectureBoard: React.FC = () => {
  const router = useRouter();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const goToOeuvrePage = () => {
    router.push('../screens/OeuvrePage');
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const token = 'votre_token_ici'; // Remplace avec ton vrai token
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      try {
        const response = await fetch('http://localhost:3000/api/books', { headers });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des livres');
        }

        const data = await response.json();

        // Associer chaque titre à une image locale
        const formattedBooks: Book[] = data.map((book: any, index: number) => ({
          id: book.id,
          title: book.title,
          image: localCovers[index % localCovers.length], // Boucle sur les covers si plus de livres que d'images
        }));

        setBooks(formattedBooks);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur inconnue est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const renderItem = ({ item }: { item: Book }) => (
    <Pressable onPress={goToOeuvrePage} style={styles.card}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{item.title}</Text>
    </Pressable>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;
const imageWidth = screenWidth / 2 - 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A020F0',
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    width: imageWidth,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: imageWidth * 1.5,
  },
  title: {
    padding: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A020F0',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LectureBoard;

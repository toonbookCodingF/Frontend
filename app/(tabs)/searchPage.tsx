import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  Text,
  Pressable,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';

type Book = {
  id: string | number;
  title: string;
  description: string;
  cover: string; // lien vers une image distante
};

const SearchPage: React.FC = () => {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const goToOeuvrePage = (book: Book) => {
    router.push({
      pathname: '../screens/OeuvrePage',
      params: {
        id: book.id.toString(),
        title: book.title,
        description: book.description,
        cover: book.cover,
      },
    });
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/books');

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des livres');
        }

        const data = await response.json();

        const formattedBooks: Book[] = data.map((book: any) => ({
          id: book.id,
          title: book.title,
          description: book.description,
          cover: `http://localhost:3000${book.cover}`,
        }));

        setBooks(formattedBooks);
        setFilteredBooks(formattedBooks);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur inconnue est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(lowerQuery)
    );
    setFilteredBooks(filtered);
  }, [searchQuery, books]);

  const renderItem = ({ item }: { item: Book }) => (
    <Pressable onPress={() => goToOeuvrePage(item)} style={styles.card}>
      <Image source={{ uri: item.cover }} style={styles.image} resizeMode="cover" />
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
      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Rechercher un livre..."
        placeholderTextColor="#ccc"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredBooks}
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
    backgroundColor: '#eee', // en attendant que l'image charge
  },
  title: {
    padding: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
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

export default SearchPage;

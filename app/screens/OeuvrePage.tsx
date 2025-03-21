import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const OeuvrePage: React.FC = () => {
  const router = useRouter();
  const { cover, title, description, id } = useLocalSearchParams();

  const [chapters, setChapters] = useState<any[]>([]);  // Stocker les chapitres récupérés
  const [loading, setLoading] = useState(true);  // Gérer le chargement des données
  const [error, setError] = useState<string | null>(null);  // Gérer les erreurs

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/chapters/book/${id}`);
        if (!response.ok) {
          throw new Error('Impossible de récupérer les chapitres');
        }
        const data = await response.json();
        setChapters(data);  // Mettre à jour les chapitres avec les données récupérées
      } catch (err) {
        setError('Erreur de récupération des chapitres');
      } finally {
        setLoading(false);  // Fin du chargement
      }
    };

    if (id) {
      fetchChapters();
    }
  }, [id]);  // Refait la requête si l'ID change

  const goToParagraphs = (chapterId: number, chapterTitle: string) => {
    router.push({
      pathname: '../paragraphs', // Lien vers la page de lecture
      params: { 
        chapterId: chapterId.toString(),
        bookId: id?.toString(),
        chapterTitle,
        bookTitle: title?.toString()
      },
    });
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Image de couverture */}
      <Image
        source={{ uri: cover as string }}
        style={styles.cover}
        resizeMode="cover"
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Titre du livre */}
        <Text style={styles.title}>{title}</Text>

        {/* Description du livre */}
        <Text style={styles.description}>
          {description || 'Aucune description disponible pour ce livre.'}
        </Text>

        {/* Liste des chapitres */}
        <Text style={styles.chapterHeader}>Chapitres</Text>

        {chapters.length > 0 ? (
          chapters.map((chapter) => (
            <Pressable
              key={chapter.id}
              onPress={() => goToParagraphs(chapter.id, chapter.title)}
              style={({ pressed }) => [
                styles.chapterButton,
                pressed && { opacity: 0.8 },
              ]}
            >
              <Text style={styles.chapterText}>{chapter.title}</Text>
            </Pressable>
          ))
        ) : (
          <Text style={styles.noChapters}>Aucun chapitre disponible.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A020F0',
  },
  cover: {
    width: '100%',
    height: 300,
    backgroundColor: '#ccc',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#fff',
  },
  description: {
    fontSize: 16,
    color: '#f5f5f5',
    marginBottom: 25,
    textAlign: 'justify',
    lineHeight: 22,
  },
  chapterHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  chapterButton: {
    backgroundColor: '#FF69B4',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  chapterText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  noChapters: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A020F0',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default OeuvrePage;

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const ParagraphScreen: React.FC = () => {
  const router = useRouter();
  const { chapterId, bookId, chapterTitle, bookTitle } = useLocalSearchParams();

  const [paragraphs, setParagraphs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParagraphs = async () => {
      try {
        // Utiliser l'URL correcte pour récupérer les paragraphes
        const response = await fetch(`http://localhost:3000/api/book-content/chapter/${chapterId}`);
        
        if (!response.ok) {

          throw new Error(`Erreur ${response.status}: Impossible de récupérer les paragraphes`);
        }

        const data = await response.json();
        setParagraphs(data);
      } catch (err: any) {
        setError(err.message || 'Erreur inconnue lors de la récupération des paragraphes');
      } finally {
        setLoading(false);  // Fin du chargement
      }
    };

    if (chapterId) {
      fetchParagraphs();
    }
  }, [chapterId]);

  const goBack = () => {
    router.back();
  };

  const goToComments = () => {
    router.push({
      pathname: '/comments',
      params: { chapterId, bookId, chapterTitle, bookTitle },
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
      {/* Header avec retour */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>{chapterTitle} - {bookTitle}</Text>
      </View>

      {/* Affichage des paragraphes */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {paragraphs.length > 0 ? (
          paragraphs.map((para, index) => (
            <View key={index} style={styles.paragraphContainer}>
              {/* Affichage du contenu du paragraphe */}
              <Text style={styles.paragraph}>{para.content}</Text> {/* Accéder à 'content' */}
              {/* Bouton commentaire à la fin de chaque paragraphe */}
              <TouchableOpacity style={styles.commentButton}>
                <Ionicons name="chatbubble-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noParagraphs}>Aucun paragraphe disponible.</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#800080',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
    paddingTop: 20,
  },
  paragraphContainer: {
    marginBottom: 20,
  },
  paragraph: {
    color: 'white',
    fontSize: 16,
    textAlign: 'justify',
  },
  noParagraphs: {
    color: 'white',
    fontSize: 16,
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
  commentButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  commentButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

});

export default ParagraphScreen;

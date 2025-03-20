import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const OeuvrePage: React.FC = () => {
  const router = useRouter();
  const { cover, title, id } = useLocalSearchParams();

  console.log('Cover reçue :', cover);

  const chapters = [
    { id: 1, title: 'Chapitre 1' },
    { id: 2, title: 'Chapitre 2' },
    { id: 3, title: 'Chapitre 3' },
    { id: 4, title: 'Chapitre 4' },
  ];

  const goToParagraphs = (chapterId: number) => {
    // Tu peux passer le chapitreId en params si tu veux le récupérer sur la page Paragraphs
    router.push({
      pathname: '../paragraphs',
      params: { chapterId, bookId: id, title },
    });
  };

  return (
    <View style={styles.container}>
      {/* Affiche la cover récupérée de LectureBoard */}
      <Image
        source={{ uri: cover as string }}
        style={styles.cover}
        resizeMode="cover"
      />

      {/* Affiche aussi le titre du livre */}
      <Text style={styles.title}>{title}</Text>

      <ScrollView contentContainerStyle={styles.chaptersContainer}>
        <Text style={styles.chapterHeader}>Chapitres</Text>

        {chapters.map((chapter) => (
          <Pressable
            key={chapter.id}
            onPress={() => goToParagraphs(chapter.id)}
            style={({ pressed }) => [
              styles.chapterButton,
              pressed && { opacity: 0.8 },
            ]}
          >
            <Text style={styles.chapterText}>{chapter.title}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A020F0', // Fond violet comme LectureBoard
  },
  cover: {
    width: '100%',
    height: 300,
    backgroundColor: '#ccc', // Image placeholder si jamais l'URI est vide
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#fff',
  },
  chapterHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  chaptersContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
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
});

export default OeuvrePage;

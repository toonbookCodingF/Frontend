import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const OeuvrePage: React.FC = () => {
  const router = useRouter();
  const { cover, title, description, id } = useLocalSearchParams();

  const chapters = [
    { id: 1, title: 'Chapitre 1' },
    { id: 2, title: 'Chapitre 2' },
    { id: 3, title: 'Chapitre 3' },
    { id: 4, title: 'Chapitre 4' },
  ];

  const goToParagraphs = (chapterId: number, chapterTitle: string) => {
    router.push({
      pathname: '../screens/ParagraphPage', // Lien vers ta page de lecture
      params: { 
        chapterId: chapterId.toString(),
        bookId: id?.toString(), 
        chapterTitle,
        bookTitle: title?.toString()
      },
    });
  };

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

        {chapters.map((chapter) => (
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
        ))}
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
});

export default OeuvrePage;

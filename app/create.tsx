import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function CreateChapterScreen() {
  const { bookId } = useLocalSearchParams();

  const [chapterTitle, setChapterTitle] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    console.log("bookId reçu :", bookId);

    if (!bookId || isNaN(parseInt(bookId))) {
      Alert.alert("Erreur", "ID du livre manquant ou invalide.");
      return;
    }

    if (!chapterTitle || !text) {
      Alert.alert('Champs requis', 'Merci de remplir tous les champs.');
      return;
    }

    setLoading(true);

    try {
      // 1. Création du chapitre
      const chapterResponse = await fetch("http://10.160.33.160:3000/api/chapters/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: chapterTitle,
          book_id: parseInt(bookId),
          status: "published",
          order: 1,
        }),
      });

      const chapterData = await chapterResponse.json();

      if (!chapterResponse.ok) {
        throw new Error(chapterData.message || "Erreur lors de la création du chapitre");
      }

      const chapterId = chapterData.data?.id;
      if (!chapterId) throw new Error("ID du chapitre introuvable.");

      // ✅ 2. Création du contenu lié à ce chapitre
      const contentResponse = await fetch("http://10.160.33.160:3000/api/book-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          content: text,
          chapter_id: chapterId, // 👈 on utilise le vrai ID
          order: 1,
          image: null,
          type: "text",
        }),
      });

      const contentData = await contentResponse.json();

      if (!contentResponse.ok) {
        throw new Error(contentData.message || "Erreur lors de l’enregistrement du contenu");
      }

      Alert.alert("Succès", "Chapitre et contenu enregistrés !");
      setChapterTitle('');
      setText('');
    } catch (error) {
      console.error("Erreur:", error);
      Alert.alert("Erreur", error.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Ajouter un chapitre</Text>

          <Text style={styles.inputLabel}>Nom du chapitre</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Ex: Chapitre 1 – L'aventure commence"
            placeholderTextColor="#aaa"
            value={chapterTitle}
            onChangeText={setChapterTitle}
          />

          <Text style={styles.inputLabel}>Contenu du chapitre</Text>
          <TextInput
            style={[styles.textInput, { height: 400 }]}
            placeholder="Écris ton texte ici..."
            placeholderTextColor="#aaa"
            multiline
            value={text}
            onChangeText={setText}
            textAlignVertical="top"
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
            <Text style={styles.saveButtonText}>
              {loading ? "Enregistrement..." : "Sauvegarder"}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3b0145',
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputLabel: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
  },
  textInput: {
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: 8,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  saveButton: {
    backgroundColor: '#950d82',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

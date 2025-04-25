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
import { createChapter, createBookContent } from "../components/ChapterService";
import AsyncStorage from '@react-native-async-storage/async-storage';

async function apiFetch(endpoint: string, options: RequestInit = {}): Promise<Response> {
  const token = await AsyncStorage.getItem("userToken");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    Authorization: token ? `Bearer ${token}` : "",
  };

  return fetch(`http://localhost:3000${endpoint}`, {
    ...options,
    headers,
  });
}


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
      const chapterId = await createChapter({
        title: chapterTitle,
        book_id: parseInt(bookId),
        status: "published",
        order: 1,
      },
      apiFetch);
  
      await createBookContent({
        content: text,
        chapter_id: chapterId,
        order: 1,
        image: null,
        type: "text"
      },
      apiFetch);
  
      Alert.alert("Succès", "Chapitre et contenu enregistrés !");
      setChapterTitle('');
      setText('');
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

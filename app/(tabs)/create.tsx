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
} from 'react-native';

export default function App() {
  const [text, setText] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Ferme le clavier quand on clique en dehors */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Titre Roman</Text>

          <TouchableOpacity style={styles.addChapterButton}>
            <Text style={styles.addChapterText}>Ajouter un chapitre</Text>
          </TouchableOpacity>

          <Text style={styles.inputLabel}>Nom du chapitre</Text>

          {/* Zone de texte */}
          <TextInput
            style={styles.textInput}
            placeholder="Écris ton texte ici..."
            placeholderTextColor="#aaa"
            multiline
            value={text}
            onChangeText={setText}
          />

          {/* Bouton de sauvegarde */}
          <TouchableOpacity style={styles.saveButton} onPress={() => console.log('Texte sauvegardé:', text)}>
            <Text style={styles.saveButtonText}>Sauvegarder</Text>
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
  addChapterButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#950d82',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addChapterText: {
    color: '#fff',
    fontSize: 16,
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
    height: 400,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#950d82',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

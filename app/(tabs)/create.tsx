import React, { useRef } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { QuillEditor, QuillToolbar } from 'react-native-cn-quill';


export default function App() {
  const editorRef = useRef();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Mon Éditeur</Text>

        {/* Éditeur Quill */}
        <QuillEditor
          ref={editorRef}
          style={styles.editor}
          placeholder="Écris ici..."
        />

        {/* Barre d'outils */}
        <QuillToolbar
          editor={editorRef}
          options={[
            ['bold', 'italic', 'underline'],
            [{ header: [1, 2, 3, false] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ align: [] }]
          ]}
        />
      </View>
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
  editor: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
  },
});

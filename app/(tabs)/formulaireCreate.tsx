import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import LinearGradient from 'react-native-linear-gradient';

export default function MyForm() {
  const [inputText, setInputText] = useState(""); // Stocke la valeur du champ

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Catégorie d'oeuvre :</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez le nom de la catégorie"
        placeholderTextColor="#aaa"
        value={inputText}
        onChangeText={setInputText} // Met à jour la valeur
      />



      <Text style={styles.label}>Nom de l'oeuvre:</Text>
            <TextInput
              style={styles.input}
              placeholder="Entrez le nom de l'oeuvre'"
              placeholderTextColor="#aaa"
              value={inputText}
              onChangeText={setInputText} // Met à jour la valeur
            />


      <Text style={styles.label}>Description de l'oeuvre :</Text>
            <TextInput
              style={styles.descriptionInput}
              placeholder="Entrez la description de l'oeuvre"
              placeholderTextColor="#aaa"
              value={inputText}
              multiline={true}
              onChangeText={setInputText} // Met à jour la valeur
            />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#800080",
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 2,
    borderColor: "#FF69B4", 
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  result: {
    marginTop: 15,
    fontSize: 16,
    color: "black",
  },
  descriptionInput: {
    width: "80%",
    height: 100, // Augmente la hauteur
    borderWidth: 2,
    borderColor: "#FF69B4",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    textAlignVertical: "top", // Le texte commence en haut
  },
});

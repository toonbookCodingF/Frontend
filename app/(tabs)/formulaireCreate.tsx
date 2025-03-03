import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import LinearGradient from 'react-native-linear-gradient';

export default function MyForm() {
  const [inputText, setInputText] = useState(""); // Stocke la valeur du champ

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Formulaire</Text>

      <Text style={styles.label}>Nom de l'oeuvre:</Text>
            <TextInput
              style={styles.input}
              placeholder="Entrez le nom de l'oeuvre'"
              placeholderTextColor="#aaa"
              value={inputText}
              onChangeText={setInputText}
            />
      <Text style={styles.label}>Catégorie d'oeuvre :</Text>
            <TextInput
              style={styles.input}
              placeholder="Entrez le nom de la catégorie"
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
              onChangeText={setInputText}
            />
      <Text style={styles.labelCover}>Cover</Text>
      <Text style={styles.buttonUpload}>Upload</Text>

      <Text style={styles.buttonSave}>Save</Text>
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
  title: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 15,
      color: 'white',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: 'white',
  },
  labelCover: {
      fontSize: 18,
      marginBottom: 0,
      color: 'white',
    },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 2,
    borderColor: "#FF69B4",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    marginBottom: 30,
  },
  result: {
    marginTop: 15,
    fontSize: 16,
    color: "black",
  },
  descriptionInput: {
    width: "80%",
    height: 200,
    borderWidth: 2,
    borderColor: "#FF69B4",
    borderRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
    textAlignVertical: "top",
    marginBottom: 30,
  },
  buttonUpload: {
      textAlign: "center",
      backgroundColor: "#FF69B4",
      padding: 15,
      borderRadius: 25,
      width: "30%",
      alignItems: "center",
      marginTop: 10,
    },
  buttonSave: {
        textAlign: "center",
        backgroundColor: "#FF69B4",
        padding: 15,
        borderRadius: 25,
        width: "40%",
        alignItems: "center",
        marginTop: 10,
      },
});



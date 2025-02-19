import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

export default function MyForm() {
  const [inputText, setInputText] = useState(""); // Stocke la valeur du champ

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Votre Nom :</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez votre nom"
        placeholderTextColor="#aaa" // Couleur du placeholder
        value={inputText} // Valeur du champ
        onChangeText={setInputText} // Met à jour la valeur
      />
      <Text style={styles.result}>Vous avez écrit : {inputText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
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
    borderColor: "#FF69B4", // Rose
    borderRadius: 10, // Bordures arrondies
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  result: {
    marginTop: 15,
    fontSize: 16,
    color: "black",
  },
});

import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import myFormStyles from "../styles/formCreateStyles";

export default function MyForm() {
  const [inputText, setInputText] = useState("");

  return (
    <View style={myFormStyles.container}>
      <Text style={myFormStyles.title}>Formulaire</Text>

      <Text style={myFormStyles.label}>Nom de l'oeuvre:</Text>
      <TextInput
        style={myFormStyles.input}
        placeholder="Entrez le nom de l'oeuvre"
        placeholderTextColor="#aaa"
        value={inputText}
        onChangeText={setInputText}
      />

      <Text style={myFormStyles.label}>Catégorie d'oeuvre :</Text>
      <TextInput
        style={myFormStyles.input}
        placeholder="Entrez la catégorie"
        placeholderTextColor="#aaa"
        value={inputText}
        onChangeText={setInputText}
      />

      <Text style={myFormStyles.label}>Description de l'oeuvre :</Text>
      <TextInput
        style={myFormStyles.descriptionInput}
        placeholder="Entrez la description"
        placeholderTextColor="#aaa"
        value={inputText}
        multiline={true}
        onChangeText={setInputText}
      />

      <Text style={myFormStyles.labelCover}>Cover</Text>
      <Text style={myFormStyles.buttonUpload}>Upload</Text>

      <Text style={myFormStyles.buttonSave}>Save</Text>
    </View>
  );
}

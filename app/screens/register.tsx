import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import styles from "../styles/registerStyles";
import { useRouter} from "expo-router";

export default function MyForm() {
  const [nomUser, setNomUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router= useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>

      <TextInput
              style={styles.input}
              placeholder="Nom d'utilisateur"
              placeholderTextColor="#aaa"
              value={nomUser}
              onChangeText={setNomUser}
            />

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        placeholderTextColor="white"
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="white"
      />

      <TouchableOpacity style={styles.button} onPress={() => console.log("Connexion")}>
        <Text style={styles.buttonText}>S'inscrire'</Text>
      </TouchableOpacity>

      <View style={styles.linksContainer}>
      <TouchableOpacity onPress={()=> router.push('../login')}>
          <Text style={styles.linkText}>Se connecter</Text>     
        </TouchableOpacity>
        <Text style={styles.linkText}>Mot de passe oublié</Text>
      </View>

      <Text style={styles.socialText}>Se connecter avec :</Text>
    </View>
  );
}



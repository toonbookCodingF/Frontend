import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import styles from "../styles/loginStyles";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>

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
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <View style={styles.linksContainer}>
        <Text style={styles.linkText}>Pas encore de compte?</Text>
        <Text style={styles.linkText}>Mot de passe oublié</Text>
      </View>

      <Text style={styles.socialText}>Se connecter avec :</Text>
    </View>
  );
}



import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "../styles/loginStyles";
import {useRouter} from "expo-router";

import { authService } from "../screens/login";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    try {
      await authService.login({ email, password });
      Alert.alert("Succès", "Connexion réussie !");
    } catch (error) {
      Alert.alert("Erreur", "Identifiants invalides. Veuillez réessayer.");
    }
  };

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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => router.push('/screens/register')}>
          <Text style={styles.linkText}>Pas encore de compte? S'inscrire</Text>
        </TouchableOpacity>
        <Text style={styles.linkText}>Mot de passe oublié</Text>
      </View>

      <Text style={styles.socialText}>Se connecter avec :</Text>
    </View>
  );
}

import React, { useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { TextInput, Button, Card, Title } from "react-native-paper";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Card style={styles.card} theme={{ colors: { surface: "transparent" } }}>
        <Card.Content>
          <Title style={styles.title}>Connexion</Title>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            label="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <Button mode="contained" onPress={() => console.log("Connexion")} style={styles.button}>
            Se connecter
          </Button>
          <Text> Pas encore de compte?             Mot de place oublié </Text>
         <Text> Se connecter avec :</Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple", // Fond violet
  },
  card: {
     card: {
        width: "60%",
        padding: 20,
        backgroundColor: "rgba(0,0,0,0)", // Assure une vraie transparence
        borderRadius: 15, // Coins arrondis
        elevation: 0, // Supprime l'ombre sur Android
        shadowOpacity: 0, // Supprime l'ombre sur iOS
      },
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderRadius: 18, // Bordures arrondies
    overflow: "hidden", // Évite les débordements
  },
  button: {
    marginTop: 10,
  },
});

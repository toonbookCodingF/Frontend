import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

const App: React.FC = () => {
  const router = useRouter();

  const goToParagraphs = () => {
    router.push('../paragraphs');
  };

  return (
    <Pressable onPress={goToParagraphs} style={styles.container}>
      <Text style={styles.text}>
        Page avec liste des chapitres du roman choisi en cours de dev !
        cliquer ici pour acceder aux roman pour la lecture
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default App;

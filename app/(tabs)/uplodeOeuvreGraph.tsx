import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Text, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageUploadScreen() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert("Permission d'accès à la galerie requise !");
      return;
    }
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) return;

    setUploading(true);

    const fileName = image.split('/').pop();
    const fileType = fileName.split('.').pop();

    const formData = new FormData();
    formData.append('file', {
      uri: image,
      name: fileName,
      type: `image/${fileType}`,
    });

    try {
      const response = await fetch('https://your-backend.com/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (response.ok) {
        Alert.alert("Succès", "Image uploadée !");
      } else {
        const errText = await response.text();
        console.error('Erreur:', errText);
        Alert.alert("Erreur", "Échec de l'upload.");
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
      Alert.alert("Erreur", "Une erreur est survenue.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Choisir une image" onPress={pickImage} />
      {image && (
        <>
          <Image source={{ uri: image }} style={styles.image} />
          <Button title="Uploader" onPress={uploadImage} disabled={uploading} />
        </>
      )}
      {uploading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    marginVertical: 20,
    resizeMode: 'contain',
  },
});

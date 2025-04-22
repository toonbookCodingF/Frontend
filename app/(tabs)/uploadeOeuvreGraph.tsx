import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function MultiImageUploadScreen() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert("Permission d'accès à la galerie requise !");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
      selectionLimit: 10,
    });

    if (!result.canceled) {
      const uris = result.assets.map((asset) => asset.uri);
      setImages((prevImages) => [...prevImages, ...uris]); // ✅ Ajouter au lieu d’écraser
    }
  };

  const uploadImages = async () => {
    if (images.length === 0) return;

    setUploading(true);

    const formData = new FormData();

    images.forEach((uri, index) => {
      const fileName = uri.split('/').pop();
      const fileType = fileName.split('.').pop();

      formData.append('files', {
        uri,
        name: fileName,
        type: `image/${fileType}`,
      });
    });

    try {
      const response = await fetch('https://your-backend.com/upload-multiple', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (response.ok) {
        Alert.alert('Succès', 'Images uploadées avec succès !');
        setImages([]);
      } else {
        const errText = await response.text();
        console.error('Erreur serveur:', errText);
        Alert.alert('Erreur', 'Upload échoué.');
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
      Alert.alert('Erreur', 'Une erreur est survenue.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload votre oeuvre graphique</Text>
      <Button title="Choisir des images" onPress={pickImages} />
      <ScrollView horizontal style={styles.scroll}>
        <View style={styles.imageRow}>
          {images.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.image} />
          ))}
        </View>
      </ScrollView>
      {images.length > 0 && (
        <Button title="Uploader les images" onPress={uploadImages} disabled={uploading} />
      )}
      {uploading && <ActivityIndicator size="large" color="#0000ff" />}
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
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FF69B4", 
    padding: 15,
    borderRadius: 25, // Arrondi des boutons
    width: "100%",
    alignItems: "center",
    marginTop: 20, // Ajout d'un peu de marge entre les éléments
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  scroll: {
    marginVertical: 20,
    width: "100%",
  },
  imageRow: {
    flexDirection: "row",
    flexWrap: "wrap", 
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 180, // Augmenté pour un format plus grand comme un webtoon
    height: 250, // Augmenté pour une meilleure visibilité
    marginRight: 10,
    marginBottom: 10, 
    borderWidth: 2,
  },
  loading: {
    marginTop: 20,
  },
});

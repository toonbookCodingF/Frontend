import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  ScrollView,
  Alert,
  Image,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import ModalSelector from "react-native-modal-selector"; // ✅ Nouveau Picker

async function apiFetch(endpoint: string, options: RequestInit = {}): Promise<Response> {
  const token = await AsyncStorage.getItem("userToken");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    Authorization: token ? `Bearer ${token}` : "",
  };

  return fetch(`http://10.160.33.160:3000${endpoint}`, { // ✅ Changement pour Android
    ...options,
    headers,
  });
}

export default function MyForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://10.160.33.160:3000/api/categories/");
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Erreur chargement catégories :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const image = result.assets[0];

      try {
        setUploading(true);

        const formData = new FormData();
        formData.append("file", {
          uri: image.uri,
          name: "cover.jpg",
          type: "image/jpeg",
        } as any);

        const response = await fetch("http://10.160.33.160:3000/api/upload", {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const data = await response.json();

        if (data.url) {
          setCover(data.url);
        } else {
          Alert.alert("Erreur", "L'upload a échoué.");
        }
      } catch (error) {
        console.error("Erreur upload :", error);
        Alert.alert("Erreur", "Impossible d'uploader l'image.");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async () => {
    if (!title || !category) {
      Alert.alert("Champs requis", "Veuillez remplir le titre et choisir une catégorie.");
      return;
    }

    try {
      const coverToSend =
        cover || "https://via.placeholder.com/300x400.png?text=Couverture";

      const body = {
        title,
        description,
        cover: coverToSend,
        category_id: parseInt(category),
        user_id: 1,
        status: "draft",
      };

      const response = await apiFetch("/api/books", {
        method: "POST",
        body: JSON.stringify(body),
      });

      const result = await response.json();
      console.log("Réponse backend :", result);

      if (response.ok) {
        const newBookId = result.data?.id;

        if (!newBookId) {
          Alert.alert("Erreur", "ID du livre introuvable après création.");
          return;
        }

        Alert.alert("Succès", "Livre enregistré !");
        router.push({ pathname: "/create", params: { bookId: newBookId } });
      } else {
        Alert.alert("Erreur", result.message || "Erreur inconnue.");
      }
    } catch (error) {
      console.error("Erreur POST book :", error);
      Alert.alert("Erreur", "Une erreur est survenue.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Formulaire</Text>

        <Text style={styles.label}>Nom de l'oeuvre:</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez le nom de l'oeuvre"
          placeholderTextColor="#aaa"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Catégorie d'oeuvre :</Text>
        <View>
          <ModalSelector
            data={categories.map((cat) => ({
              key: cat.id.toString(),
              label: cat.nameCategory,
            }))}
            initValue="Sélectionnez une catégorie"
            onChange={(option) => setCategory(option.key)}
            style={styles.modalSelector}
            selectStyle={styles.selectStyle}
            selectTextStyle={styles.selectText}
          />
        </View>

        <Text style={styles.label}>Description de l'oeuvre :</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Entrez la description"
          placeholderTextColor="#aaa"
          value={description}
          multiline
          onChangeText={setDescription}
          textAlignVertical="top"
        />

        <Text style={styles.label}>Cover</Text>
        <Pressable onPress={pickImage} disabled={uploading}>
          <Text style={styles.buttonUpload}>
            {uploading ? "Upload en cours..." : "Upload"}
          </Text>
        </Pressable>

        {cover ? (
          <Image
            source={{ uri: cover }}
            style={styles.coverImage}
          />
        ) : null}

        <Pressable onPress={handleSubmit}>
          <Text style={styles.buttonSave}>Save</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // ✅ Remplit tout l'écran
    backgroundColor: "#3b0145",
    padding: 20,
    paddingBottom: 40, // ✅ Évite l'espace blanc en bas
  },
  innerContainer: {
    flex: 1, // ✅ Permet d'utiliser toute la hauteur
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    marginTop: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
  },
  pickerContainer: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  modalSelector: {
    backgroundColor: "transparent",
  },
  selectStyle: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  selectText: {
    fontSize: 16,
    color: "#000",
  },
  buttonUpload: {
    backgroundColor: "#950d82",
    color: "#fff",
    textAlign: "center",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonSave: {
    backgroundColor: "#950d82",
    color: "#fff",
    textAlign: "center",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    fontSize: 18,
  },
  coverImage: {
    width: 200,
    height: 200,
    marginVertical: 10,
    borderRadius: 8,
    alignSelf: "center",
  },
});

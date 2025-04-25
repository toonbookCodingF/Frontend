import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  ActivityIndicator,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import myFormStyles from "../styles/formCreateStyles";
import { createBook} from "../../components/BookService";

async function apiFetch(endpoint: string, options: RequestInit = {}): Promise<Response> {
  const token = await AsyncStorage.getItem("userToken");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    Authorization: token ? `Bearer ${token}` : "",
  };

  return fetch(`http://localhost:3000${endpoint}`, {
    ...options,
    headers,
  });
}

export default function MyForm() {
  const router = useRouter();

  const [type, setType] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [bookType, setBookType] = useState(null); // Pour stocker le type du livre (roman ou manga)
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/categories/");
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

  useEffect(() => {
    // 1. Ne rien faire tant que l'utilisateur n'a pas choisi de type
    if (type === null) return;

    const fetchBookType = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/booktypes");
        const json = await response.json();
        console.log(json)

        // 2. Détermine le nom recherché en fonction du choix exact (0 ou 1)
        const bookTypeName = type === 0 ? "roman" : "webtoon";

        // 3. Utilise un nom de variable différent dans la find pour éviter la confusion
        const found = json.data?.find((bt: any) =>
          bt.nametype?.toLowerCase() === bookTypeName
        );

        if (found) {
          setBookType(found);
        } else {
          console.warn(`Type "${bookTypeName}" non trouvé dans book-types !`);
        }
      } catch (error) {
        console.error("Erreur chargement book-types :", error);
      }
    };
  

    fetchBookType();
  }, [type]);
  // Le `useEffect` se déclenche chaque fois que `type` change

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

        const response = await fetch("http://localhost:3000/api/upload", {
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
    if (!title || !category || type === null) {
      Alert.alert("Champs requis", "Veuillez remplir tous les champs.");
      return;
    }

    try {
      const coverToSend =
        cover || "https://via.placeholder.com/300x400.png?text=Couverture";
      
      const newBook = await createBook(
        {
        title,
        description,
        cover: coverToSend,
        category_id: parseInt(category),
        bookType_id: bookType?.id || null, // Envoi du bon `bookType_id` basé sur le type sélectionné
        user_id: 1,
        status: "draft",
        },
        apiFetch 
      );

      const newBookId = newBook.id;

        if (type === 0) {
          router.push({ pathname: "../create", params: { bookId: newBookId } });
        } else {
          router.push({ pathname: "/screens/uploadeOeuvreGraph", params: { bookId: newBookId } });
        }
    } catch (error) {
      console.error("Erreur POST book :", error);
      Alert.alert("Erreur", "Une erreur est survenue.");
    }
  };

  if (type === null) {
    return (
      <View style={myFormStyles.container}>
        <Text style={myFormStyles.title}>Choisissez le type d'œuvre</Text>
        <Pressable style={myFormStyles.buttonSave} onPress={() => setType(0)}>
          <Text style={{ color: "white" }}>Oeuvre Littéraire</Text>
        </Pressable>
        <Pressable style={myFormStyles.buttonSave} onPress={() => setType(1)}>
          <Text style={{ color: "white" }}>Oeuvre Graphique</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={myFormStyles.container}>
      <Text style={myFormStyles.title}>Formulaire</Text>

      <Text style={myFormStyles.label}>Nom de l'oeuvre:</Text>
      <TextInput
        style={myFormStyles.input}
        placeholder="Entrez le nom de l'oeuvre"
        placeholderTextColor="#aaa"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={myFormStyles.label}>Catégorie d'oeuvre :</Text>
      <View>
        {loading ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={{ color: category ? "#000" : "#aaa" }}
          >
            <Picker.Item label="Sélectionnez une catégorie" value="" />
            {categories.map((cat) => (
              <Picker.Item
                key={cat.id}
                label={cat.namecategory}
                value={cat.id.toString()}
              />
            ))}
          </Picker>
        )}
      </View>

      <Text style={myFormStyles.label}>Description de l'oeuvre :</Text>
      <TextInput
        style={myFormStyles.descriptionInput}
        placeholder="Entrez la description"
        placeholderTextColor="#aaa"
        value={description}
        multiline
        onChangeText={setDescription}
      />

      <Text style={myFormStyles.labelCover}>Cover</Text>
      <Pressable onPress={pickImage} disabled={uploading}>
        <Text style={myFormStyles.buttonUpload}>
          {uploading ? "Upload en cours..." : "Upload"}
        </Text>
      </Pressable>

      {cover ? (
        <Image
          source={{ uri: cover }}
          style={{
            width: 200,
            height: 200,
            marginVertical: 10,
            borderRadius: 8,
            alignSelf: "center",
          }}
        />
      ) : null}

      <Pressable onPress={handleSubmit}>
        <Text style={myFormStyles.buttonSave}>Save</Text>
      </Pressable>
    </ScrollView>
  );
}

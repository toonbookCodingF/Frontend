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
import { useSearchParams } from "expo-router";




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

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [bookTypeRoman, setBookTypeRoman] = useState(null);
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
    const fetchBookType = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/book-types");
        const data = await response.json();
        const romanType = data.data?.find(
          (type) => type.nameType?.toLowerCase() === "roman"
        );
        if (romanType) {
          setBookTypeRoman(romanType);
        } else {
          console.warn("Type 'roman' non trouvé.");
        }
      } catch (error) {
        console.error("Erreur chargement book-types :", error);
      }
    };
    fetchBookType();
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
        bookType_id: bookTypeRoman?.id || null, 
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
        Alert.alert("Succès", "Livre enregistré !");
        const newBookId = result.data?.id;

        if(type===0){
          router.push({ pathname: "/create", params: { bookId: newBookId } });
        }else{
          router.push({pathname: "/uplodeOeuvreGraph", params: { bookId: newBookId } })
        }
      } else {
        Alert.alert("Erreur", result.message || "Erreur inconnue.");
      }
    } catch (error) {
      console.error("Erreur POST book :", error);
      Alert.alert("Erreur", "Une erreur est survenue.");
    }
  };

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
                label={cat.nameCategory}
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

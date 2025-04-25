import { Alert } from "react-native";

export async function handleApiError(response: Response, fallbackMessage: string) {
  const result = await response.json();

  switch (response.status) {
    case 400:
      Alert.alert("Champs invalides", result.message || "Vérifiez vos données.");
      break;
    case 401:
    case 403:
      Alert.alert("Accès refusé", "Vous n’avez pas les droits pour cette action.");
      break;
    case 500:
      Alert.alert("Erreur serveur", "Erreur côté serveur ou de connexion.");
      break;
    default:
      Alert.alert("Erreur", result.message || fallbackMessage);
  }

  throw new Error(result.message || fallbackMessage);
}

export function handleNetworkError(error: any, fallbackMessage = "Une erreur est survenue.") {
  console.error("Erreur API:", error);

  if (error.message?.includes("Network") || error.message === "Network request failed") {
    Alert.alert("Connexion perdue", "Veuillez vérifier votre connexion Internet.");
  } else {
    Alert.alert("Erreur", error.message || fallbackMessage);
  }

  throw error;
}

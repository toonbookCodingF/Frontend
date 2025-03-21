import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: number;
        email: string;
    };
}

/**
 * Fonction pour gérer les requêtes API avec gestion automatique du token.
 */
async function apiFetch(endpoint: string, options: RequestInit = {}): Promise<Response> {
    const token = await AsyncStorage.getItem("userToken");

    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...options.headers, // Permet d'ajouter des headers personnalisés
    };

    const response = await fetch(`http://10.160.33.160:3000${endpoint}`, {
        ...options,
        headers,
        credentials: "include", // Équivalent de `withCredentials: true`
    });

    if (response.status === 401) {
        // Token expiré ou invalide
        await AsyncStorage.removeItem("userToken");
        console.warn("Token expiré, utilisateur déconnecté.");
    }

    return response;
}

export const authService = {
    // Login
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            const response = await apiFetch("/api/users/login", {
                method: "POST",
                body: JSON.stringify(credentials),

            });

           const responseData = await response.json();
           console.log("Réponse du serveur :", responseData);

           // 🔥 Correction : Accéder au token dans `data`
           const token = responseData.data?.token;
           const user = {
               id: responseData.data?.id,
               email: responseData.data?.email
           };

           if (!token) {
               throw new Error("Le backend n'a pas renvoyé de token.");
           }

           // 🔥 Vérification que le token est bien défini avant de l'enregistrer
           await AsyncStorage.setItem("userToken", token);

           return { token, user };
        } catch (error) {
            console.error("Erreur de login:", error);
            throw error;
        }
    },

    // Logout
    async logout(): Promise<void> {
        try {
            await apiFetch("/api/users/logout", { method: "POST" });
            await AsyncStorage.removeItem("userToken");
        } catch (error) {
            console.error("Erreur de logout:", error);
            throw error;
        }
    },

    // Vérifier si l'utilisateur est connecté
    async isAuthenticated(): Promise<boolean> {
        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) return false;

            const response = await apiFetch("/api/users/me", { method: "GET" });

            return response.ok;
        } catch (error) {
            return false;
        }
    },

    // Récupérer le token
    async getToken(): Promise<string | null> {
        return await AsyncStorage.getItem("userToken");
    },
};

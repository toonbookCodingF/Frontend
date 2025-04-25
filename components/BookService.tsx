import { Alert } from "react-native";
import { handleApiError, handleNetworkError } from "../components/Errorhandler";


export type BookData = {
    title: string;
    description: string;
    cover: string;
    category_id: number;
    bookType_id: number;
    user_id: number;
    status?: string;  
  };

  export async function createBook(
    chapter: BookData,
    apiFetch:(endpoint: string, options?: RequestInit) => Promise<Response>
  ): Promise<any> {
    try {
      const response = await apiFetch("/api/books", {
        method: "POST",
        body: JSON.stringify({
          title: chapter.title,
          description: chapter.description,
          cover: chapter.cover,
          category_id: chapter.category_id,
          booktype_id: chapter.bookType_id,
          user_id: chapter.user_id,
          status: chapter.status || "draft",
        }),
      });
  
      const result = await response.json();
      if (!response.ok) {
        await handleApiError(response, "Erreur lors de l’enregistrement du contenu.");
        throw new Error();
      }
  
      return result.data;
    } catch (error: any) {
      handleNetworkError(error, "Impossible de créer le chapitre.");
    }
  }

import { Alert } from "react-native";
import { handleApiError, handleNetworkError } from "../components/Errorhandler";

type CreateChapterParams = {
    title: string;
    book_id: number;
    status?: string;
    order?: number;
};

type CreateContentParams = {
    content: string;
    chapter_id: number;
    order?: number;
    image?: string | null;
    type?: string;
};

export async function createChapter(
    params: CreateChapterParams, 
    apiFetch: (endpoint: string, options?: RequestInit) => Promise<Response>
): Promise<any> {
    try {
      const response = await apiFetch("/api/chapters/create", {
        method: "POST",
        body: JSON.stringify({
          ...params,
          status: params.status || "published",
          order: params.order ?? 1,
        }),
      });
  
      if (!response.ok) {
        await handleApiError(response, "Erreur lors de la création du chapitre.");
      }
      const result = await response.json();
      const chapterId = result.data?.id;
      if (!chapterId) throw new Error("ID du chapitre introuvable.");
  
      return chapterId;
    } catch (error: any) {
        handleNetworkError(error, "Impossible de créer le chapitre.");
    }
  }
  
  export async function createBookContent(
    params: CreateContentParams, 
    apiFetch:(endpoint: string, options?: RequestInit) => Promise<Response>
): Promise<void> {
    try {
      const response = await apiFetch("/api/bookcontents", {
        method: "POST",
        body: JSON.stringify({
          content: params.content,
          chapter_id: params.chapter_id,
          order: params.order ?? 1,
          image: params.image || null,
          type: params.type || "text",
        }),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        await handleApiError(response, "Erreur lors de la création du chapitre.");
      }
    } catch (error: any) {
        handleNetworkError(error, "Impossible de créer le chapitre.");
    }
  }
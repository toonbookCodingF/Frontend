import { Alert } from "react-native";
import { createChapter, createBookContent } from "../../components/ChapterService";

describe("chapterService - gestion des erreurs avec Alert", () => {
  const validChapterInput = {
    title: "Chapitre Test",
    book_id: 1,
  };

  const validContentInput = {
    content: "Contenu de test",
    chapter_id: 123,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Alert, "alert");
  });

  it("createChapter - erreur 500", async () => {
    const fakeApiFetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ message: "Erreur serveur" }),
    });

    await expect(createChapter(validChapterInput, fakeApiFetch)).rejects.toThrow();

    expect(Alert.alert).toHaveBeenCalledWith(
      "Erreur serveur",
      "Erreur côté serveur ou de connexion."
    );
  });

  it("createChapter - erreur 401", async () => {
    const fakeApiFetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ message: "Non autorisé" }),
    });

    await expect(createChapter(validChapterInput, fakeApiFetch)).rejects.toThrow();

    expect(Alert.alert).toHaveBeenCalledWith(
      "Accès refusé",
      "Vous n’avez pas les droits pour cette action."
    );
  });

  it("createChapter - erreur réseau", async () => {
    const fakeApiFetch = jest.fn().mockRejectedValue(new Error("Network request failed"));

    await expect(createChapter(validChapterInput, fakeApiFetch)).rejects.toThrow();

    expect(Alert.alert).toHaveBeenCalledWith(
      "Connexion perdue",
      "Veuillez vérifier votre connexion Internet."
    );
  });

  it("createChapter - erreur inconnue", async () => {
    const fakeApiFetch = jest.fn().mockRejectedValue(new Error("Erreur inconnue"));

    await expect(createChapter(validChapterInput, fakeApiFetch)).rejects.toThrow();

    expect(Alert.alert).toHaveBeenCalledWith(
      "Erreur",
      "Erreur inconnue"
    );
  });

  it("createBookContent - erreur 500", async () => {
    const fakeApiFetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ message: "Erreur serveur" }),
    });

    await expect(createBookContent(validContentInput, fakeApiFetch)).rejects.toThrow();

    expect(Alert.alert).toHaveBeenCalledWith(
      "Erreur serveur",
      "Erreur côté serveur ou de connexion."
    );
  });

  it("createBookContent - erreur 401", async () => {
    const fakeApiFetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ message: "Non autorisé" }),
    });

    await expect(createBookContent(validContentInput, fakeApiFetch)).rejects.toThrow();

    expect(Alert.alert).toHaveBeenCalledWith(
      "Accès refusé",
      "Vous n’avez pas les droits pour cette action."
    );
  });

  it("createBookContent - erreur réseau", async () => {
    const fakeApiFetch = jest.fn().mockRejectedValue(new Error("Network request failed"));

    await expect(createBookContent(validContentInput, fakeApiFetch)).rejects.toThrow();

    expect(Alert.alert).toHaveBeenCalledWith(
      "Connexion perdue",
      "Veuillez vérifier votre connexion Internet."
    );
  });

  it("createBookContent - erreur inconnue", async () => {
    const fakeApiFetch = jest.fn().mockRejectedValue(new Error("Erreur inconnue"));

    await expect(createBookContent(validContentInput, fakeApiFetch)).rejects.toThrow();

    expect(Alert.alert).toHaveBeenCalledWith(
      "Erreur",
      "Erreur inconnue"
    );
  });
});

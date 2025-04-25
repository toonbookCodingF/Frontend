import { createBook, BookData } from "../BookService";
import { Alert } from "react-native";

describe("createChapter - erreurs avec Alert", () => {
  const validInput: BookData = {
    title: "Chapitre Test",
    description: "Description test",
    cover: "https://fake.cover/image.jpg",
    category_id: 1,
    bookType_id: 2,
    user_id: 1,
    status: "draft",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Alert, "alert");
  });

  it("affiche une Alert pour une erreur 500", async () => {
    const fakeApiFetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ message: "Erreur serveur" }),
    });

    await expect(createBook(validInput, fakeApiFetch)).rejects.toThrow();

    expect(Alert.alert).toHaveBeenCalledWith(
      "Erreur serveur",
      "Erreur côté serveur ou de connexion."
    );
  });

  it("affiche une Alert pour une erreur 401", async () => {
    const fakeApiFetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ message: "Non autorisé" }),
    });

    await expect(createBook(validInput, fakeApiFetch)).rejects.toThrow();

    expect(Alert.alert).toHaveBeenCalledWith(
      "Accès refusé",
      "Vous n’avez pas les droits pour cette action."
    );
  });

  it("affiche une Alert pour une erreur réseau", async () => {
    const fakeApiFetch = jest.fn().mockRejectedValue(new Error("Network request failed"));

    await expect(createBook(validInput, fakeApiFetch)).rejects.toThrow();

    expect(Alert.alert).toHaveBeenCalledWith(
      "Connexion perdue",
      "Veuillez vérifier votre connexion Internet."
    );
  });

  it("affiche une Alert par défaut pour une erreur inconnue", async () => {
    const fakeApiFetch = jest.fn().mockRejectedValue(new Error("Erreur inconnue"));

    await expect(createBook(validInput, fakeApiFetch)).rejects.toThrow();

    expect(Alert.alert).toHaveBeenCalledWith(
      "Erreur",
      "Erreur inconnue"
    );
  });
});
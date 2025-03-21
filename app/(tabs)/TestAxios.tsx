import React, { useEffect, useState } from 'react';

// Définir le type des livres (seulement le titre et la couverture ici)
interface Book {
  title: string;
  cover: string;
}

const BookList: React.FC = () => {
  // État pour stocker les livres récupérés
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchBooks = async () => {
      const token = 'votre_token_ici'; // Remplacez par votre token

      // En-têtes de la requête avec le token
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      try {
        const response = await fetch('http://localhost:3000/api/books', { headers });

        if (!response.ok) {
          throw new Error('Erreur de récupération des livres');
        }

        const data: Book[] = await response.json();
        setBooks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur inconnue est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p>Chargement des livres...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Liste des livres</h1>
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            <h2>{book.title}</h2>
            <img src={book.cover} alt={book.title} width="100" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;

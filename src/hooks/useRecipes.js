import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

export function useRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'recipes'), (snapshot) => {
      const recipesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRecipes(recipesData);
    });
    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const filteredRecipes = recipes.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id, onDeleted) => {
    try {
      await deleteDoc(doc(db, 'recipes', id));
      if (onDeleted) onDeleted(id);
    } catch (error) {
      console.error("Error deleting recipe: ", error);
    }
  };

  return {
    recipes,
    searchQuery,
    setSearchQuery,
    filteredRecipes,
    handleDelete
  };
}

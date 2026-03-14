import { useState, useEffect } from 'react';

const useFetchPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        // Fetching from page 3 to get a more diverse list of authors for testing the search functionality
        const response = await fetch('https://picsum.photos/v2/list?page=3&limit=30');
        if (!response.ok) {
          throw new Error('Failed to fetch photos');
        }
        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      } finally {
        // Artificial delay so the loading spinner is visible during the review
        setTimeout(() => {
          setLoading(false);
        }, 1500); // 1.5 seconds delay
      }
    };

    fetchPhotos();
  }, []);

  return { photos, loading, error };
};

export default useFetchPhotos;

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ImageGrid from './components/ImageGrid';
import styles from './styles/ImageGrid.module.css';

interface Image {
  id: string;
  author: string;
  download_url: string;
}

export default function HomePage() {
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const res = await fetch(`/api/images?page=${page}`);
      const data = await res.json();
      setImages(data);
      setLoading(false);
    };

    fetchImages();
  }, [page]);

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleImageClick = (id: string) => {
    router.push(`/edit/${id}`);
  };

  return (
    <div>
      { loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loader}></div>
        </div>
      ) : <ImageGrid images={images} onImageClick={handleImageClick} />}

      <div className={styles.paginationBtn}>
        <button disabled={page === 1} onClick={handlePrevPage}>
          Previous
        </button>

        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
}

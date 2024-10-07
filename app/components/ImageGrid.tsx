import Image from 'next/image';
import styles from '../styles/ImageGrid.module.css';

interface ImageGridProps {
  images: { id: string; author: string; download_url: string }[];
  onImageClick: (id: string) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, onImageClick }) => {
  return (
    <div className={styles.grid}>
      {images.map((image) => (

        <div key={image.id} className={styles.imageCard} onClick={() => onImageClick(image.id)}>
          <Image
            src={image.download_url}
            alt={image.author}
            width={300}
            height={200}
            className={styles.image}
            quality={75}
            priority
          />
          <p>{image.author}</p>
        </div>

        // <div key={image.id} className={styles.imageCard} onClick={() => onImageClick(image.id)}>
        //   <img src={image.download_url} alt={image.author} className={styles.image} />
        //   <p>{image.author}</p>
        // </div>
      ))}
    </div>
  );
};

export default ImageGrid;

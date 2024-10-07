'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/ImageEdit.module.css';

// import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';


interface ImageEditorProps {
  // imageUrl: string;
  // _author: string;
  // _width: number;
  // _height: number;
}

const ImageEditor: React.FC<ImageEditorProps> = ({
}) => {
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState('');
  const [author, setAuthor] = useState('');
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);

  const [blur, setBlur] = useState(0);
  const [greyscale, setGreyscale] = useState(false);

  const imageRef = useRef<HTMLImageElement | null>(null);


  useEffect(() => {
    if (id) {
      const fetchImage = async () => {
        const res = await fetch(`https://picsum.photos/id/${id}/info`);
        const data = await res.json();
        setImageUrl(data.download_url);
        setAuthor(data.author);
        setWidth(data.width);
        setHeight(data.height);
      };

      fetchImage();
    }
  }, [id]);

  const handleDownload = () => {
    if (!imageRef.current) return;

    // Create a canvas to draw the image with the applied filters
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (ctx) {
      canvas.width = width;
      canvas.height = height;

      // Apply filters to the canvas context
      ctx.filter = `blur(${blur}px) grayscale(${greyscale ? 1 : 0})`;
      ctx.drawImage(imageRef.current, 0, 0, width, height);

      // Convert the canvas to a downloadable image
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/jpeg');
      link.download = 'edited-image.jpg';
      link.click();
    }
  };


  return (
    <div className={styles.imageEditorContainer}>
      <aside className={styles.asideWrap}>
        <div>
          <label htmlFor='width'>Width: </label>
          <input type="number" id='width' value={width} onChange={(e) => setWidth(Number(e.target.value))} />
        </div>

        <div>
          <label htmlFor='height'>Height: </label>
          <input type="number" id='height' value={height} onChange={(e) => setHeight(Number(e.target.value))} />
        </div>

        <div>
          <label htmlFor='blur'>Blur (1-10): </label>
          <input id='blur' type="range" min="1" max="10" value={blur} onChange={(e) => setBlur(Number(e.target.value))} />
        </div>

        <div>
          <div className={styles.checkboxInputContainer}>
            <label htmlFor='greyscale'>Greyscale: </label>
            <input type="checkbox" id='greyscale' checked={greyscale} onChange={() => setGreyscale(!greyscale)} />
          </div>
        </div>

        <div className={styles.downloadBtn}>
          <button onClick={handleDownload}>Download Image</button>
        </div>

      </aside>

      <main className={styles.mainWrap}>

        {/* <img
          src={`${imageUrl}?w=${width}&h=${height}&blur=${blur}&grayscale=${greyscale ? 1 : 0}`}
          // src={`${imageUrl}?w=${width}&h=${height}&blur=${blur}`}
          alt="Edited preview"
        /> */}

        {imageUrl && (
          <div style={{ 
            // position: 'relative', 
            // height: `${height}px`,
            // width: `${width}px`
          }}>
            <Image
              src={imageUrl}
              ref={imageRef}
              alt={`Edited preview picture of the ${author}`}
              // fill
              priority
              quality={100}
              // sizes="100%"
              width={width}
              height={height}
              style={{
                // height: `${height}px`,
                // width: `${width}px`,
                // maxWidth: "100%",
                // maxHeight: "auto",
                objectFit: 'contain',
                filter: `blur(${blur}px) grayscale(${greyscale ? '100%' : '0%'})`,
              }}
            />

          </div>
        )}

      </main>
    </div>
  );
};

export default ImageEditor;

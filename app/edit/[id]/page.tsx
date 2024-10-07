import ImageEditor from '../../components/ImageEditor';
import styles from '../../styles/ImageEdit.module.css';

export default function EditImage() {

    return (
        <div>
            <h1 className={styles.titleAuthorName}>Edit Image</h1>

            <ImageEditor />
        </div> 
    );
}

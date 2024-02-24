import generateUniqueId from '../../../utils/generateUniqueId';
import styles from './TextInput.module.css';

const TextInput = ({ value, placeholder, onTextChange }) => {

    return (
        <input
            id={`text-input-${generateUniqueId()}`}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onTextChange(e.target.value)}
            className={styles['text-input']}
        />
    )
}

export default TextInput;
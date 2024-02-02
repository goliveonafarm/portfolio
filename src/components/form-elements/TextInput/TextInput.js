import styles from './TextInput.module.css';
import generateUniqueId from '../../../utils/generateUniqueId';

const TextInput = ({ value, placeholder, onTextChange }) => {
    const handleChange = (event) => {
        onTextChange(event.target.value);
    };

    return (
        <input
            id={`text-input-${generateUniqueId()}`}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            className={styles['text-input']}
        />
    )
}

export default TextInput;
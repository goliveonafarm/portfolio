import { useState, useEffect } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { decodeInput } from "../services/emojiConversionService";

const useEmojiTranslation = (originalMessage, allEmojisArray) => {
    const [decodedMessage, setDecodedMessage] = useState('');
    const debouncedOriginalMessage = useDebounce(originalMessage, 100);

    useEffect(() => {
        const translatedArray = decodeInput(debouncedOriginalMessage, allEmojisArray);
        setDecodedMessage(translatedArray);

    }, [debouncedOriginalMessage, allEmojisArray]);

    return decodedMessage;
}

export default useEmojiTranslation;
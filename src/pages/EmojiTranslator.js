import { useState, useMemo } from 'react';
import { Row, Col } from 'react-bootstrap';
import { TextInput } from '../components/form-elements';
import { findEmoji, addEmojiAndVariantsToList, EmojiButton, EmojiPropertiesWindow, EmojiButtons, allEmojisJson, supportedEmojisJson, useEmojiTranslation } from '../features/emojis';

const EmojiTranslatorPage = () => {
    const [originalMessage, setOriginalMessage] = useState('');
    const [emojiInput, setEmojiInput] = useState(null);

    {/* Not for emoji keyboard*/ }
    const allEmojisArray = useMemo(() => {
        let emojiArray = [];
        allEmojisJson.forEach(emoji => {
            addEmojiAndVariantsToList(emoji, emojiArray);
        });
        return emojiArray;
    }, []);

    const decodedMessage = useEmojiTranslation(originalMessage, allEmojisArray);

    const supportedEmojisArray = useMemo(() => {
        return supportedEmojisJson.map(emoji => emoji);
    }, []);

    const handleTextChange = (text) => setOriginalMessage(text);

    const changeEmoji = (input) => {
        if (!input) {
            setEmojiInput(null);
            return;
        }
        let match = findEmoji(input, allEmojisArray);
        if (match) setEmojiInput({ ...match });
    }

    const handleEmojiInputChange = (eTargetVal) => changeEmoji(eTargetVal);

    const handleClickEmoji = (e) => changeEmoji(e.target.textContent);

    const handleEnterEmoji = (e) => {
        if (e.key === 'Enter') changeEmoji(e.target.textContent);
    }

    return (
        <div onClick={handleClickEmoji}
            onKeyDown={handleEnterEmoji}
        >
            <Row>
                <h1>Emoji keyboard and translator</h1>
                <p>Try decoding this sentence -</p>
                <p>Located in <EmojiButton emojiObject={supportedEmojisArray[2419]} /><EmojiButton emojiObject={supportedEmojisArray[3313]} />, I'm <EmojiButton emojiObject={supportedEmojisArray[2790]} /> for a <EmojiButton emojiObject={supportedEmojisArray[3037]} /> and <EmojiButton emojiObject={supportedEmojisArray[2771]} /> role where I can <EmojiButton emojiObject={supportedEmojisArray[2852]} /> my skills. <EmojiButton emojiObject={supportedEmojisArray[2966]} /> for work and <EmojiButton emojiObject={supportedEmojisArray[2540]} /> to start ASAP! I'm all about bringing <EmojiButton emojiObject={supportedEmojisArray[2793]} /> and <EmojiButton emojiObject={supportedEmojisArray[2644]} /> to my work.</p>
                <div>
                    <TextInput
                        name='Enter message'
                        value={originalMessage}
                        placeholder={'Enter text here'}
                        onTextChange={handleTextChange}
                    />
                </div>
                <div>
                    <p>Message:</p>
                    <p style={{ height: '75px', overflow: 'auto' }}>{decodedMessage}</p>
                </div>
                <hr />
            </Row>
            <Row className='align-items-center'>
                <Col xs={12} sm={'auto'} md={'auto'}>
                    Click or enter any emoji to see its properties
                </Col>
                <Col xs={12} sm={3} md={2} lg={3}>
                    <TextInput
                        name='Enter emoji'
                        value={emojiInput ? emojiInput.character : ''}
                        placeholder={'Enter emoji'}
                        onTextChange={handleEmojiInputChange}
                    />
                </Col>
            </Row>
            <EmojiPropertiesWindow
                emoji={emojiInput}
                emojiList={allEmojisArray}
            />
            <EmojiButtons
                supportedEmojisArray={supportedEmojisArray}
            />
        </div >
    )
}

export default EmojiTranslatorPage;


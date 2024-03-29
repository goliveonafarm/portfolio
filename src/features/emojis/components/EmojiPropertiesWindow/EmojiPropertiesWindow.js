import { Row, Col } from 'react-bootstrap';
import EmojiButton from '../EmojiButton/EmojiButton.js';
import { findEmoji, convertEmojiIntoCodeByteString } from '../../services/emojiConversionService.js';
import styles from './EmojiPropertiesWindow.module.css';

const EmojiPropertiesWindow = ({ emoji, emojiList }) => {
    const classNames = `bg-dark  text-light border border-secondary rounded shadow-lg ${styles['emoji-window']}`;

    if (emoji === null) return (<Row className={classNames}></Row>);

    let emojiArray = Array.from(emoji.character)
    let codeBytes = ``;
    emojiArray.forEach(element => {
        codeBytes += `${convertEmojiIntoCodeByteString(element)} `
    })

    return (
        <Row className={classNames} readOnly>
            <Row>
                <Col>{`Emoji: ${emoji.character}`}</Col>
            </Row>
            <Row>
                <Col>
                    {`Length: ${emoji.character.length}`}
                </Col>
            </Row>
            <Row>
                <Col>
                    {`Elements & Modifiers: `}{
                        emojiArray.map((emoji, index) => {
                            const match = findEmoji(emoji, emojiList)
                            return match ? (
                                <span key={`emoji-window-element-btn-${index}`}>
                                    <EmojiButton
                                        emojiObject={match}
                                    />
                                </span>
                            ) :
                                (
                                    <span key={`emoji-window-element-btn-${index}`}> {`U+${emoji.codePointAt(0).toString(16).toUpperCase()}`}</span>
                                )
                        })
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    {`Slug: ${emoji.slug}`}
                </Col>
            </Row>
            <Row>
                <Col>
                    {`UTF-16 Code Units: ${codeBytes}`}
                </Col>
            </Row>
            <Row >
                <Col
                >
                    {`Variants: `}{
                        emoji.variants && emoji.variants.map((variant, index) => {
                            const match = findEmoji(variant.character, emojiList)
                            return match ? (
                                <EmojiButton
                                    emojiObject={match}
                                    key={`emojiWindowVariantBtn-${index}`}
                                />
                            ) : null;
                        })
                    }
                </Col>
            </Row>
        </Row >
    )
}

export default EmojiPropertiesWindow;
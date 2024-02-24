import React from 'react';
import { emojiSlugValue } from '../../services/emojiConversionService';
import CustomTooltip from '../../../../components/ui/CustomTooltip/CustomTooltip';
import styles from './EmojiButton.module.css';

const EmojiButton = React.memo(({ emojiObject }) => {
    return (
        <CustomTooltip tooltipText={emojiSlugValue(emojiObject)}>
            <span className={styles['emoji-button']} tabIndex="0">{emojiObject.character}</span>
        </CustomTooltip>
    )
})

export default EmojiButton;
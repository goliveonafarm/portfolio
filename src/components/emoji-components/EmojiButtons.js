import { useState, useMemo } from "react";
import { Row, Col } from "react-bootstrap";
import EmojiButton from "./EmojiButton/EmojiButton";
import NumberResultsDropDownBtn from "../form-elements/NumberResultsDropDownBtn/NumberResultsDropDown";
import PaginationNavigator from "../form-elements/PaginationNavigator/PaginationNavigator";
import usePagination from "../../hooks/usePagination";

export const EmojiButtons = ({handleClickEmoji, handleEnterEmoji, supportedEmojisArray}) => {
    const [itemsPerPage, setItemsPerPage] = useState('300');
    const { currentPage, paginate, currentItems, pageCount } = usePagination(supportedEmojisArray, itemsPerPage);

    const emojiButtons = useMemo(() => (
        currentItems.map((emoji) => (
            <Col style={{ padding: 0 }} key={emoji.slug}>
                <EmojiButton emojiObject={emoji} />
            </Col>
        ))
    ), [currentItems]);

    return (
        <>
            <Row onClick={handleClickEmoji}
                onKeyDown={handleEnterEmoji}
                className='pt-1 pb-3'>
                {emojiButtons}
            </Row>
            <Row>
                <Col>
                    <PaginationNavigator
                        pageCount={pageCount}
                        currentPage={currentPage}
                        paginate={paginate}
                    />
                </Col>
                <Col>
                    <NumberResultsDropDownBtn
                        itemsPerPage={itemsPerPage}
                        setItemsPerPage={setItemsPerPage}
                        setCurrentPage={paginate}
                        resultsPerPage={[300, 500, 1000, 4000]}
                        variant={"dark"}
                    />
                </Col>
            </Row>
        </>
    )
}

export default EmojiButtons;
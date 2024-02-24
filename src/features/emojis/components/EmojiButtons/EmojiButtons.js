import { useState, useMemo } from "react";
import { Row, Col } from "react-bootstrap";
import EmojiButton from "../EmojiButton/EmojiButton";
import { NumberResultsDropDownBtn, PaginationNavigator, usePagination } from "../../../../components/form-elements";

const EmojiButtons = ({ supportedEmojisArray }) => {
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
            <Row
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
                        onChangeItemsPerPage={(val) => { return; }}
                    />
                </Col>
            </Row>
        </>
    )
}

export default EmojiButtons;
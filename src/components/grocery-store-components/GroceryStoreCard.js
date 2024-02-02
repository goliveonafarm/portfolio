import { Card, Row, Col, CloseButton } from 'react-bootstrap';
import AddGroceryStoreItem from './AddGroceryItemForm';
import FormTable from '../form-elements/FormTable/FormTable';
import CustomTooltip from '../ui/CustomTooltip/CustomTooltip';

const GroceryStoreCard = ({ store, highlightCheapest, onAddItem, onDeleteItem, onDeleteStore, onChangeItemsPerPage, itemList, brandList, getTooltipContent }) => {
    const handleDeleteButton = (itemId) => {
        onDeleteItem(store.id, itemId)
    }

    return (
        <Card className="mb-3 bg-dark text-white border-white">
            <Card.Body>
                <Row>
                    <Col xs="auto">
                        <Card.Title>{store.name}</Card.Title>
                        {store.address &&
                            <Card.Text>
                                Address: {store.address}
                            </Card.Text>
                        }
                        {store.zip &&
                            <Card.Text>
                                Zip: {store.zip}
                            </Card.Text>
                        }
                    </Col>
                    <CustomTooltip
                        tooltipText={`Delete ${store.name} and it's items`}
                    >
                        <CloseButton className='bg-secondary' aria-label='Delete store and items' onClick={() => {
                            if (window.confirm(`Delete ${store.name} and all of it's items?`)) onDeleteStore(store.id);
                        }}>
                        </CloseButton>
                    </CustomTooltip>
                </Row>
                <Row>
                    <Col>
                        <FormTable
                            onChangeItemsPerPage={onChangeItemsPerPage}
                            paginationObject={store}
                            hasSpecialCol={highlightCheapest}
                            handleCloseButton={handleDeleteButton}
                            getTooltipContent={getTooltipContent}
                        />
                    </Col>
                </Row>
                <hr />
                <p>Add item</p>
                <Row>
                    <Col>
                        <AddGroceryStoreItem
                            variant={'secondary'}
                            passedItemList={itemList}
                            passedBrandList={brandList}
                            onItemSubmit={(itemData) => {
                                onAddItem(store.id, itemData)
                            }}
                        />
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default GroceryStoreCard;
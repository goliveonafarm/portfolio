import { Card, Row, Col, CloseButton } from 'react-bootstrap';
import AddGroceryItemForm from './AddGroceryItemForm'
import { FormTable } from '../../../components/form-elements/'
import CustomTooltip from '../../../components/ui/CustomTooltip/CustomTooltip';

const GroceryStoreCard = ({ store, highlightCheapest, onAddItem, onDeleteItem, onDeleteStore, onChangeItemsPerPage, itemList, brandList, getTooltipContent, groceryStores, setGroceryStores }) => {
    const handleDeleteButton = (itemId) => {
        onDeleteItem(setGroceryStores, store.id, itemId)
    }

    const handleOnChangeItemsPerPage = (newItemsPerPage) => {
        onChangeItemsPerPage(setGroceryStores, store.id, newItemsPerPage)
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
                            if (window.confirm(`Delete ${store.name} and all of it's items?`)) onDeleteStore(setGroceryStores, store.id);
                        }}>
                        </CloseButton>
                    </CustomTooltip>
                </Row>
                <Row>
                    <Col>
                        <FormTable
                            onChangeItemsPerPage={handleOnChangeItemsPerPage}
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
                        <AddGroceryItemForm
                            variant={'secondary'}
                            passedItemList={itemList}
                            passedBrandList={brandList}
                            onItemSubmit={(itemData) => {

                                onAddItem(setGroceryStores, store.id, itemData)
                            }}
                        />
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default GroceryStoreCard;
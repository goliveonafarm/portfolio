import { useState } from 'react';
import { Form, Button, Dropdown, DropdownButton, Row, Col, Container } from 'react-bootstrap';
import SearchBar from '../form-elements/SearchBar/SearchBar';

const AddGroceryStoreItem = ({ passedItemList, passedBrandList, onItemSubmit }) => {
    const [formData, setFormData] = useState({
        type: '',
        brand: '',
        cost: '',
        size: '',
        sizeType: 'oz'
    });

    const handleFormDataChange = (field, value) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [field]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onItemSubmit({
            type: formData.type,
            brand: formData.brand,
            cost: formData.cost,
            size: formData.size,
            sizeType: formData.sizeType
        });

        setFormData({
            type: '',
            brand: '',
            cost: '',
            size: '',
            sizeType: 'oz'
        });
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}
                        className='pb-1'
                    >
                        <SearchBar
                            value={formData.type}
                            name={'Type'}
                            field={'type'}
                            resultsList={passedItemList}
                            handleFormDataChange={handleFormDataChange}
                        />
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}
                        className='pb-1'
                    >
                        <SearchBar
                            value={formData.brand}
                            name={'Brand'}
                            field={'brand'}
                            resultsList={passedBrandList}
                            handleFormDataChange={handleFormDataChange}
                        />
                    </Col>
                    <Col xs={12} sm={4} md={3} lg={3} xl={3}
                        className='pb-1'
                    >
                        <Form.Control
                            required
                            name='Cost'
                            type="number"
                            placeholder="$0.00"
                            value={formData.cost}
                            onChange={(e) => handleFormDataChange('cost', e.target.value)}
                            pattern="^\d*(\.\d{0,2})?$"
                            title="Please enter a valid price"
                        />
                    </Col>
                    <Col xs={12} sm={4} md={3} lg={3} xl={3}
                        className='pb-1'
                    >
                        <Form.Control
                            required
                            type="number"
                            name='Weight or count'
                            placeholder="wt./ct."
                            value={formData.size}
                            onChange={(e) => handleFormDataChange('size', e.target.value)}
                            pattern="^\d*(\.\d+)?$"
                        />
                    </Col>
                    <Col xs={12} sm='auto'
                        className='pb-1'
                    >
                        <DropdownButton
                            data-bs-theme="dark"
                            variant='dark'
                            title={formData.sizeType}
                            onSelect={(eventKey) => {
                                handleFormDataChange('sizeType', eventKey);
                            }
                            }
                        >
                            <Dropdown.ItemText>Measurement type</Dropdown.ItemText>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="oz">ounce</Dropdown.Item>
                            <Dropdown.Item eventKey="lb">pound</Dropdown.Item>
                            <Dropdown.Item eventKey="g">gram</Dropdown.Item>
                            <Dropdown.Item eventKey="kg">kg</Dropdown.Item>
                            <Dropdown.Divider />

                            <Dropdown.Item eventKey="cup">cup</Dropdown.Item>
                            <Dropdown.Item eventKey="pt">pint</Dropdown.Item>
                            <Dropdown.Item eventKey="qt">quart</Dropdown.Item>
                            <Dropdown.Item eventKey="gal">gal</Dropdown.Item>
                            <Dropdown.Item eventKey="floz">fl.oz</Dropdown.Item>
                            <Dropdown.Item eventKey="mL">mL</Dropdown.Item>
                            <Dropdown.Item eventKey="L">liter</Dropdown.Item>
                            <Dropdown.Item eventKey="unit">unit</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                    <Col xs={12} sm="auto"
                        className='pb-1'
                    >
                        <Button variant='primary' type="submit">Add</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default AddGroceryStoreItem;
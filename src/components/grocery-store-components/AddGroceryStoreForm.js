import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import GroceryStore from '../../models/GroceryStoreModel';

{/* Returns a form to add a grocery store and takes a CB for submit buttom*/ }
const AddGroceryStoreForm = ({ setGroceryStores }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [zip, setZip] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        handleAddStore({ name, address, zip })

        setName('');
        setAddress('');
        setZip('');
    };

    const handleAddStore = (storeData) => {
        setGroceryStores(currentStores => {
            const newStore = new GroceryStore(
                Date.now(),
                storeData.name,
                storeData.address,
                storeData.zip
            );
            const updatedStores = [...currentStores, newStore];
            localStorage.setItem('groceryStores', JSON.stringify(updatedStores));
            return updatedStores;
        });
    };

    return (
        <div>
            <h2>Add a new grocery store</h2>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col xs={12} sm={6} md={3} lg={3} xl={4}
                        className='pb-1'
                    >
                        <Form.Control
                            aria-label={`Enter store name`}
                            required
                            name="Store Name"
                            type="text"
                            placeholder="Store Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={3} lg={3} xl={3}
                        className='pb-1'
                    >
                        <Form.Control
                            type="text"
                            name="Address/URL"
                            placeholder="Address/URL"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={3} lg={3} xl={3}
                        className='pb-1'
                    >
                        <Form.Control
                            type="text"
                            name="Zip Code"
                            placeholder="Zip Code"
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            pattern="[0-9]*"
                        />
                    </Col>
                    <Col key={`form-control-add-store-${Date.now()}`} xs={12} sm={'auto'} className='pb-1'>
                        <Button variant="primary" type="submit">Add store</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default AddGroceryStoreForm;
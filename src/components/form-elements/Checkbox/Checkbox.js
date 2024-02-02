import { Form } from 'react-bootstrap';
import './Checkbox.css';

const Checkbox = ({ label, checked, onCheckboxChange }) => {
    const handleChange = (e) => {
        onCheckboxChange(e.target.checked);
    };

    return (
        <Form.Group
            controlId='formBasicCheckbox'>
            <Form.Check
                type='checkbox'
                label={label}
                checked={checked}
                onChange={handleChange} />
        </Form.Group>
    )
}

export default Checkbox;
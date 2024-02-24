import React from 'react';
import { Form } from 'react-bootstrap';

const Checkbox = React.forwardRef(({ label, checked, onCheckboxChange }, ref) => {
    const handleChange = (e) => onCheckboxChange(e.target.checked);
    
    return (
        <Form.Group
            controlId='formBasicCheckbox'>
            <Form.Check
                type='checkbox'
                label={label}
                checked={checked}
                onChange={handleChange}
                ref={ref} />
        </Form.Group>
    )
});

export default Checkbox;
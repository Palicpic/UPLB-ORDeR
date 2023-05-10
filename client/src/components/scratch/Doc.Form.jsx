import React, { useState } from 'react';
import { Button, Modal, TextField } from '@mui/material/';

const ModalForm = () => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(formValues);
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Form</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="modal-content">
          <h2>Modal Form</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              name="firstName"
              value={formValues.firstName}
              onChange={handleChange}
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formValues.lastName}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
            <TextField
              label="Message"
              name="message"
              value={formValues.message}
              onChange={handleChange}
              multiline
            />
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ModalForm;
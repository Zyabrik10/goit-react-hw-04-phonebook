import { useState } from 'react';
import { inputFocus } from 'js/input-focus';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

export const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const inputName = ({ target }) => {
    setName(target.value);
  };

  const inputNumber = ({ target }) => {
    setNumber(target.value);
  };

  const formHandler = e => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value.trim();
    const number = form.number.value.trim();
    const id = nanoid();

    addContact({ name, number, id });
  };

  return (
    <form className="contact-form" action="" onSubmit={formHandler}>
      <div className="input-box">
        <input
          type="text"
          id="name-input"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={inputName}
          autoComplete="off"
          onBlur={inputFocus}
        />
        <label htmlFor="name-input">Name</label>
      </div>
      <div className="input-box">
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={inputNumber}
          id="phone-input"
          autoComplete="off"
          onBlur={inputFocus}
        />
        <label htmlFor="phone-input">Phone</label>
      </div>
      <button className="ph-button add-contact global-button">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func,
};

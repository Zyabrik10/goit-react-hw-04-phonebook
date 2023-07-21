import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || []
  );
  const [filter, setFilter] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);

  const checkContact = name => {
    if (contacts.find(e => e.name === name)) {
      alert(`${name} is already in contacts`);
      return false;
    }

    return true;
  };

  const saveContacts = () => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  };

  const addContact = ({ number, name, id }) => {
    if (checkContact(name))
      setContacts(prev => [...prev, { number, name, id }]);
  };

  const inputFilter = ({ target }) => setFilter(target.value);

  const removeFromContactsList = id =>
    setContacts(prev => prev.filter(e => e.id !== id));

  const filterContacts = contacts =>
    contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );

  useEffect(() => {
    console.log('done');
    setFilteredContacts(filterContacts(contacts));
    saveContacts();
  }, [contacts, filter, saveContacts, setFilteredContacts, filterContacts]);

  return (
    <div className="phonebook-box">
      <h1 className="ph-title global-p">Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2 className="global-p">Contacts</h2>
      <Filter inputFilter={inputFilter} filter={filter} />
      <ContactList
        filteredContacts={filteredContacts}
        removeFromContactsList={removeFromContactsList}
      />
    </div>
  );
};

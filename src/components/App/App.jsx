import React from 'react';
import Form from '../Form/Form';
import ContactsList from '../ContactsList/ContactsList';
import Filter from '../Filter/Filter';
import { nanoid } from 'nanoid';
import s from './App.module.css';

export default class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidUpdate(pervProps, pervState) {
    if (this.state.contacts !== pervState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  formSubmitHandler = ({ name, number }) => {
    const formValue = {
      id: nanoid(),
      name,
      number,
    };

    this.state.contacts.find(a => {
      if (a.name.includes(name)) {
        window.alert(`${name} is already in contacts`);
      }
    });

    this.setState(({ contacts }) => ({
      contacts: [formValue, ...contacts],
    }));
  };

  onFilterChange = e => {
    const { value } = e.currentTarget;
    this.setState({ filter: value });
  };

  handleDeleteContact(id) {
    const index = this.state.contacts.findIndex(contact => contact.id === id);

    if (index === -1) return;
    this.state.contacts.splice(index, 1);

    this.setState(this.state);
  }

  render() {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <div className={s.container}>
        <h1>Phonebook</h1>
        <Form formData={this.formSubmitHandler} />
        <div>
          <h2>Contacts</h2>
          <Filter value={filter} onFilterChange={this.onFilterChange} />
          <ContactsList
            contacts={visibleContacts}
            onDeleteContact={this.handleDeleteContact(this)}
          />
        </div>
      </div>
    );
  }
}

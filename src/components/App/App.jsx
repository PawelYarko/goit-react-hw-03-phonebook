import React from 'react';
import Form from '../Form/Form';
import ContactsList from '../ContactsList/ContactsList';
import Filter from '../Filter/Filter';
import { nanoid } from 'nanoid';
import s from './App.module.css';


export default class App extends React.Component{
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  }  


  formSubmitHandler = ({name,number}) =>{
    const formValue = {
      id: nanoid(),
      name, 
      number};  

      this.state.contacts.map(a => {
        if(a.name.includes(name)){
          window.alert(`${name} is already in contacts`)
        }
      }) 

      this.setState(({contacts}) =>({
      contacts:[formValue, ...contacts]
      }))
    
  }

  onFilterChange = e =>{
    const { value } = e.currentTarget;
    this.setState({filter: value});
  }


  handleDeleteContact(id) {
    const index = this.state.contacts.findIndex(contact => contact.id === id);

    if (index === -1) return;
    this.state.contacts.splice(index, 1);

    this.setState(this.state); 
  }

  
  render(){
    const {filter, contacts} = this.state;
    const normalizedFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter),);

    return (
      <div className={s.container}>
        <h1>Phonebook</h1>
          <Form formData={this.formSubmitHandler}/> 
        <div>
          <h2>Contacts</h2>
            <Filter value={filter} onFilterChange={this.onFilterChange}/>
            <ContactsList contacts={visibleContacts} onDeleteContact={this.handleDeleteContact.bind(this)}/>   
        </div>
      </div>
    )
  }
}
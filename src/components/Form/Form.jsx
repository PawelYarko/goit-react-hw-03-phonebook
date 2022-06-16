import React from 'react';
import PropTypes from 'prop-types';
import s from './Form.module.css';


export default class Form extends React.Component{
    state = {
      name: '',
      number: '',
    }  
  

    handleChange = (e) =>{
      const { name, value } = e.target;
      this.setState({ 
        [name]: value });
    }
    

    onContactAdd = (e) =>{
      e.preventDefault();
      this.props.formData(this.state);
      this.setState({name: '', number: ''})
    }
  
  
    
    
    render(){
      return (<form onSubmit={this.onContactAdd} className={s.form}>
                <label className={s.name} htmlFor={this.elemId}> Name
                    <input
                        id={this.elemId}
                        className={s.inputName}
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                    />
                </label>
                <label className={s.number} htmlFor={this.elemId}>Number 
                  <input
                    id={this.elemId}
                    className={s.inputNumber}
                    type="tel"
                    name="number"
                    value={this.state.number}
                    onChange={this.handleChange}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                  />
                </label>
                
                <button type="submit" className={s.button}>Add contact</button>
              </form>
      )
    }
  }
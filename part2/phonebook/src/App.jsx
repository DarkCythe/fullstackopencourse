import { useState, useEffect } from "react";
import Persons from "./components/Persons.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Filter from "./components/Filter.jsx";
import Message from "./components/Message.jsx";
import personService from "./services/persons.js"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const loadPersons = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(loadPersons, []);

  const addPerson = (event) => {
    event.preventDefault();
    // Check for duplicate name
    const duplicatePerson = persons.find((person) => person.name === newName);

    // if (duplicatePerson) {
    //   alert(`${newName} is already added to phonebook`);
    //   return;
    // }
    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (duplicatePerson) {
      if (window.confirm(
        `${duplicatePerson.name} is already added to the phonebook. Replace the old number with a new one?`
      )) {
        personService
          .update(duplicatePerson.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id === duplicatePerson.id ? returnedPerson : p))
            setNewName("");
            setNewNumber("");
          })
          .catch(error => {
            setErrorMessage(
              `Information of ${personObject.name} has already been removed from the server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter((p) => p.id !== duplicatePerson.id))
          })
      }
      return;
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName("");
        setNewNumber("");
        setNotification(
          `Added ${returnedPerson.name}`
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id))
        })
    }
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={notification} type="success" />
      <Message message={errorMessage} type="error" />
      <Filter onSearchChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} onDelete={deletePerson} />
    </div>
  );
};

export default App;

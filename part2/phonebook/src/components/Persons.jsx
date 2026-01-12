const Person = ({ person, onDelete }) => (
  <div>
    {person.name} {person.number}
    <button onClick={() => onDelete(person.id, person.name)}>Delete</button>
  </div>
);

const Persons = ({ persons, onDelete }) => (
  <div>
    {persons.map((person) => (
      <Person key={person.name} person={person} onDelete={onDelete} />
    ))}
  </div>
);

export default Persons;

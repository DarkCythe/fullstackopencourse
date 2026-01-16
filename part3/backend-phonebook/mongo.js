const mongoose = require('mongoose')

// catch illegal argument counts
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
} else if ((process.argv.length > 5) || (process.argv.length === 4)) {
  console.log('Only 2 or 4 arguments are acceptable')
  console.log(process.argv.length)
  process.exit(1)
}

// set up connection
const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.gn0gsc8.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

// set up schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  // Get all persons
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length === 5) {
  // Add person
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(result => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}

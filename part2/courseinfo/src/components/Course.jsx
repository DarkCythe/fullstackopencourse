const Header = (props) => <h1>{props.course}</h1>;

const Content = ({ part }) => (
  <div>
    <Part part={part} />
  </div>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <h3>Number of exercises {totalExercises}</h3>;
};

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    {course.parts.map((part) => (
      <Content key={part.id} part={part} />
    ))}
    <Total parts={course.parts} />
  </div>
);

export default Course;

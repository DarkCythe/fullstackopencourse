import { useState } from "react";

const Button = ({ onClick, text }) => (
  <button onClick={onClick}> {text} </button>
);

const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const ave = (good - bad) / all;
  const perc = (good / all) * 100;
  if (all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={all} />
          <StatisticsLine text="average" value={ave} />
          <StatisticsLine text="positive" value={perc + "%"} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodRating = () => {
    setGood(good + 1);
  };

  const handleBadRating = () => {
    setBad(bad + 1);
  };

  const handleNeutralRating = () => {
    setNeutral(neutral + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <p>
        <Button onClick={handleGoodRating} text="Good" />
        <Button onClick={handleNeutralRating} text="Neutral" />
        <Button onClick={handleBadRating} text="Bad" />
      </p>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;

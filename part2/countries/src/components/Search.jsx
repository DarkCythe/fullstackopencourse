export default function Search({ value, onChange }) {
  return (
    <div>
      <label>find countries </label>
      <input value={value} onChange={onChange} />
    </div>
  );
}

export default function CountryList({ countries, onShow }) {
  return (
    <div>
      {countries.map((country) => (
        <div key={country.cca3}>
          <span>{country.name.common}</span>
          <button onClick={() => onShow(country)}>show</button>
        </div>
      ))}
    </div>
  );
}

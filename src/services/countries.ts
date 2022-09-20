export const fetchCountries = async (query: string) => {
  const response = await fetch(`http://localhost:3004/countries?name_like=${query}`);
  return response.json();
}
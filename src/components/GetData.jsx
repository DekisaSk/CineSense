export default async function getData() {
  const apiKey = "d9bb4067";

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=inception&apikey=${apiKey}&page=1`
    );
    const data = await response.json();
    return data.Search;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

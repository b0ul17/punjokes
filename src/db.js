const jokes = [
  {
    "id": "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
    "setup": "Τι τρώνε τα Χριστούγεννα στη Ρωσία;",
    "punchline": "Κουραμπιετ"
  },
  {
    "id": "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
    "setup": "Αν τα μανιτάρια κατέβουν σε απεργεία εμείς θα είμαστε με το",
    "punchline": "Πλευρώτους"
  },
  {
    "id": "c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f",
    "setup": "Γιατί τα γραφεία real estate δεν έχουν μύγες;",
    "punchline": "Γιατί είναι με-σίτες"
  }
];

function getAllJokes() {
  return jokes;
}

function getRandomJoke() {
  return jokes[Math.floor(Math.random() * jokes.length)];
}

function getDailyJoke() {
  // Use today's date as seed so same joke shows all day
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const index = seed % jokes.length;
  return jokes[index];
}

function getJokeCount() {
  return jokes.length;
}

export { getAllJokes, getRandomJoke, getDailyJoke, getJokeCount };

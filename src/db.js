import jokes from "./jokes.json" with { type: "json" };

function getAllJokes() {
  return jokes;
}

function getRandomJoke() {
  return jokes[Math.floor(Math.random() * jokes.length)];
}

function getJokeCount() {
  return jokes.length;
}

export { getAllJokes, getRandomJoke, getJokeCount };

const crypto = require("crypto");
const { db } = require("./db");

const jokes = [
  {
    id: crypto.randomUUID(),
    setup: "τι τρώνε τα Χριστούγεννα στη Ρωσία;",
    punchline: "Κουραμπιετ",
  },
];

const insert = db.prepare("INSERT OR IGNORE INTO jokes (id, setup, punchline) VALUES (?, ?, ?)");

const insertMany = db.transaction((jokes) => {
  for (const joke of jokes) {
    insert.run(joke.id, joke.setup, joke.punchline);
  }
});

insertMany(jokes);

console.log(`Seeded ${jokes.length} joke(s)`);

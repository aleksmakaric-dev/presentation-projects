const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let heroes = [
  {
    id: 1,
    name: "Superman",
    power: "Super strength, flight, invulnerability",
    description: "Man of Steel and protector of Metropolis",
    image: "assets/Superman.webp",
    movies: ["Man of Steel", "Batman v Superman", "Justice League"],
    creator: "DC Comics",
  },
  {
    id: 2,
    name: "Batman",
    power: "High intelligence, martial arts expertise, advanced technology",
    description: "The Dark Knight and protector of Gotham City",
    image: "assets/Batman.webp",
    movies: [
      "Batman Begins",
      "The Dark Knight",
      "The Dark Knight Rises",
      "Justice League",
    ],
    creator: "DC Comics",
  },
  {
    id: 3,
    name: "Wonder Woman",
    power: "Super agility, strength, combat skills",
    description: "Amazonian warrior princess",
    image: "assets/Wonder Woman.webp",
    movies: ["Wonder Woman", "Wonder Woman 1984", "Justice League"],
    creator: "DC Comics",
  },
  {
    id: 4,
    name: "Flash",
    power: "Super speed",
    description: "Fastest man alive",
    image: "assets/Flash.webp",
    movies: ["Justice League", "Flashpoint"],
    creator: "DC Comics",
  },
  {
    id: 5,
    name: "Aquaman",
    power: "Control over aquatic life, super strength, swimming speed",
    description: "King of Atlantis",
    image: "assets/Aquaman.webp",
    movies: ["Aquaman", "Justice League"],
    creator: "DC Comics",
  },
  {
    id: 6,
    name: "Green Lantern",
    power:
      "Power ring that grants flight, invulnerability, and energy constructs",
    description: "Member of the Green Lantern Corps",
    image: "assets/Green Lantern.webp",
    movies: ["Green Lantern"],
    creator: "DC Comics",
  },
  {
    id: 7,
    name: "Cyborg",
    power:
      "Cybernetic enhancements, super strength, advanced technology interface",
    description: "Half human, half machine",
    image: "assets/Cyborg.webp",
    movies: ["Justice League"],
    creator: "DC Comics",
  },
  {
    id: 8,
    name: "Spider-Man",
    power: "Wall-crawling, spider-sense, super agility, web-shooting",
    description: "Friendly neighborhood Spider-Man",
    image: "assets/Spider-Man.webp",
    movies: [
      "Spider-Man: Homecoming",
      "Spider-Man: Far From Home",
      "Spider-Man: No Way Home",
    ],
    creator: "Marvel Comics",
  },
  {
    id: 9,
    name: "Iron Man",
    power: "Genius-level intellect, powered armor suit",
    description: "Billionaire philanthropist and armored superhero",
    image: "assets/Iron Man.jpg",
    movies: ["Iron Man", "Iron Man 2", "Iron Man 3", "The Avengers"],
    creator: "Marvel Comics",
  },
  {
    id: 10,
    name: "Captain America",
    power: "Super strength, agility, enhanced healing, expert tactician",
    description: "Sentinel of Liberty",
    image: "assets/Captain America.webp",
    movies: [
      "Captain America: The First Avenger",
      "Captain America: The Winter Soldier",
      "Captain America: Civil War",
      "The Avengers",
    ],
    creator: "Marvel Comics",
  },
];

// GET: List of heroes with optional search functionality
app.get("/heroes", (req, res) => {
  const { search } = req.query;
  if (search) {
    const filteredHeroes = heroes.filter(
      (hero) =>
        hero.name.toLowerCase().includes(search.toLowerCase()) ||
        hero.power.toLowerCase().includes(search.toLowerCase()) ||
        hero.description.toLowerCase().includes(search.toLowerCase())
    );
    res.json(filteredHeroes);
  } else {
    res.json(heroes);
  }
});

// GET: Get a single hero by ID
app.get("/heroes/:id", (req, res) => {
  const { id } = req.params;
  const hero = heroes.find((h) => h.id === parseInt(id, 10));
  if (hero) {
    res.json(hero);
  } else {
    res.status(404).json({ message: "Hero not found" });
  }
});

// POST: Add a new hero
app.post("/heroes", (req, res) => {
  const { name, power, description, image, movies } = req.body;
  const newHero = {
    id: heroes.length ? heroes[heroes.length - 1].id + 1 : 1,
    name,
    power,
    description,
    image,
    movies,
  };
  heroes.push(newHero);
  res.status(201).json(newHero);
});

// PUT: Update a hero by ID
app.put("/heroes/:id", (req, res) => {
  const { id } = req.params;
  const { name, power, description, image, movies } = req.body;
  let hero = heroes.find((h) => h.id === parseInt(id, 10));
  if (hero) {
    hero.name = name || hero.name;
    hero.power = power || hero.power;
    hero.description = description || hero.description;
    hero.image = image || hero.image;
    hero.movies = movies || hero.movies;
    res.status(200).json({ message: "Hero updated successfully", hero });
  } else {
    res.status(404).json({ message: "Hero not found" });
  }
});

// PATCH: Partially update a hero by ID
app.patch("/heroes/:id", (req, res) => {
  const { id } = req.params;
  const { name, power, description, image, movies } = req.body;
  let hero = heroes.find((h) => h.id === parseInt(id, 10));
  if (hero) {
    if (name !== undefined) hero.name = name;
    if (power !== undefined) hero.power = power;
    if (description !== undefined) hero.description = description;
    if (image !== undefined) hero.image = image;
    if (movies !== undefined) hero.movies = movies;
    res
      .status(200)
      .json({ message: "Hero partially updated successfully", hero });
  } else {
    res.status(404).json({ message: "Hero not found" });
  }
});

// DELETE: Delete a hero by ID
app.delete("/heroes/:id", (req, res) => {
  const { id } = req.params;
  heroes = heroes.filter((hero) => hero.id !== parseInt(id, 10));
  res.status(200).json({ message: "Hero deleted successfully" });
});

app.listen(port, () => {
  console.log(`Hero API server is running on http://localhost:${port}`);
});

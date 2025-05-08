const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { connectDB, getDB } = require("./db");

const JWT_SECRET =
  "53eb90526f5cc40f44d274cf249083a0a9f324be33272afdc6cc3721e61d736e";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ message: "No autorizzato" });
      next();
    });
  } else if (!token) {
    res.status(401).json({ message: "No autorizzato, no token" });
  }
};

app.post("/login", (_, res) => {
  const payload = {
    email: "brumbrum@automotive.com",
    nome: "Ginetto",
    cognome: "Piedepesante",
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "25s" });

  res.json({ token });
});

app.get("/auto", protect, async (req, res) => {
  const db = getDB();
  const auto = await db.collection("auto").find().toArray();
  res.json(auto);
});

app.get("/marche-auto", protect, async (req, res) => {
  const db = getDB();
  let auto;

  if (req.query.marche && req.query.marche !== "") {
    // Converte il parametro in un array se non lo è già
    const marcheArray = Array.isArray(req.query.marche)
      ? req.query.marche
      : [req.query.marche];

    // Cerca le auto con le marche specificate
    auto = await db
      .collection("auto")
      .find({ marca: { $in: marcheArray } })
      .toArray();
  } else {
    auto = await db.collection("auto").find().toArray();
  }

  const modelli = [];
  for (const a of auto) {
    modelli.push(...a.modelli);
  }

  return res.json(modelli);
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = (req, res) => {
  let { cards } = require("./cards");

  cards.good = cards.good.map(card => {
    card.type = "good";
    return card;
  });

  cards.evil = cards.evil.map(card => {
    card.type = "evil";
    return card;
  });

  const types = req.query.types.split(",");

  const filteredCards = [];

  if (types.includes("GOOD")) {
    filteredCards.push(...cards.good);
  }

  if (types.includes("EVIL")) {
    filteredCards.push(...cards.evil);
  }

  const card =
    filteredCards[Math.floor(Math.random() * filteredCards.length - 1)];

  res.send(card);
};

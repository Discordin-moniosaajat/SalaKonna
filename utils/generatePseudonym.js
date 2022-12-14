const { generateSlug } = require('random-word-slugs')

const generatePseudonym = () => {
    const slug = generateSlug(3, {
        format: "title",
        partsOfSpeech: ["adjective", "adjective", "noun",],
        categories: {
            adjective: ["appearance", "color", "condition", "personality", "quantity", "shapes", "sounds", "taste", "time"],
          },
    });
    return slug;
}

module.exports = generatePseudonym;
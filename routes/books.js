const express = require('express');
const router = express.Router();

const books = [
    { id: 1, title: 'Divergent', author: 'Veronica Roth', genre: 'fantasy', year: 2011, description: 'A dystopian novel set in a society divided into five factions.' },
    { id: 2, title: 'Harry Potter', author: 'J.K. Rowling', genre: 'fantasy', year: 1997, description: 'A young wizard’s journey through Hogwarts School of Witchcraft and Wizardry.' },
    { id: 3, title: 'Leviathan', author: 'Scott Westerfeld', genre: 'fantasy', year: 2009, description: 'A steampunk novel set during an alternate-history World War I.' },
    { id: 4, title: 'Lightning Thief', author: 'Rick Riordan', genre: 'fantasy', year: 2005, description: 'Percy Jackson discovers he is the son of Poseidon and embarks on adventures.' },
    { id: 5, title: 'Six Of Crows', author: 'Leigh Bardugo', genre: 'fantasy', year: 2015, description: 'A crew of criminals plan a heist in a world of magic and intrigue.' },
    { id: 6, title: 'The Arabian Nights', author: 'Anonymous', genre: 'fantasy', year: 1706, description: 'A collection of Middle Eastern folk tales compiled over several centuries.' },
    { id: 7, title: 'The Night Circus', author: 'Erin Morgenstern', genre: 'fantasy', year: 2011, description: 'Two magicians compete in a mysterious circus that appears only at night.' },
    { id: 8, title: 'Throne of Glass', author: 'Sarah J. Maas', genre: 'fantasy', year: 2012, description: 'A young assassin fights for her freedom in a dangerous kingdom.' },
    { id: 9, title: 'Berserk', author: 'Kentaro Miura', genre: 'manga', year: 1990, description: 'A dark fantasy manga following the journey of Guts, a mercenary.' },
    { id: 10, title: 'Blame', author: 'Tsutomu Nihei', genre: 'manga', year: 1998, description: 'A sci-fi manga set in a massive futuristic megastructure.' },
    { id: 11, title: 'Ghost In The Shell', author: 'Masamune Shirow', genre: 'manga', year: 1989, description: 'A cyberpunk story about cyborgs and artificial intelligence.' },
    { id: 12, title: 'Monster', author: 'Naoki Urasawa', genre: 'manga', year: 1994, description: 'A suspenseful manga about a doctor hunting down a murderer he once saved.' },
    { id: 13, title: 'Nausicaa of the Valley of the Wind', author: 'Hayao Miyazaki', genre: 'manga', year: 1982, description: 'A post-apocalyptic adventure featuring a princess and her efforts to save the world.' },
    { id: 14, title: 'One Piece', author: 'Eiichiro Oda', genre: 'manga', year: 1997, description: 'A pirate adventure about Monkey D. Luffy’s quest to find the legendary treasure, One Piece.' },
    { id: 15, title: 'Pluto', author: 'Naoki Urasawa', genre: 'manga', year: 2003, description: 'A futuristic retelling of the Astro Boy story with a noir twist.' },
    { id: 16, title: 'Vagabond', author: 'Takehiko Inoue', genre: 'manga', year: 1998, description: 'A historical manga following the life of the legendary swordsman Miyamoto Musashi.' },
    { id: 17, title: 'The Art of War', author: 'Sun Tzu', genre: 'non-fiction', year: -500, description: 'An ancient Chinese military treatise on strategy and tactics.' },
    { id: 18, title: 'Cosmos', author: 'Carl Sagan', genre: 'non-fiction', year: 1980, description: 'An exploration of the universe and our place in it.' },
    { id: 19, title: 'The Fruit Gardeners Bible', author: 'Lewis Hill', genre: 'non-fiction', year: 2011, description: 'A Complete Guide to Growing Fruits and Nuts in the Home Garden'},
    { id: 20, title: 'Herbal Medicine', author: 'Andrew Chevallier', genre: 'non-fiction', year: 2033, description: 'Discover how to make and use natural remedies from home-grown herbs to improve your health and wellbeing.' },
    { id: 21, title: 'The Survival Handbook', author: 'Colin Towell', genre: 'non-fiction', year: 2020, description: 'Take on the toughest challenges that nature can throw at you with the ultimate visual guide to camping, wilderness, and outdoor survival skills.' },
    { id: 22, title: 'Tao Te Ching', author: 'Laozi', genre: 'non-fiction', year: -600, description: 'An ancient Chinese text on philosophy, ethics, and governance.' },
    { id: 23, title: 'The Demon-Haunted World', author: 'Carl Sagan', genre: 'non-fiction', year: 1995, description: 'A book promoting scientific skepticism and the importance of critical thinking.' },
    { id: 24, title: 'Vegetable Gardeners Handbook', author: 'Old Farmer’s Almanac', genre: 'non-fiction', year: 2019, description: 'advice and inspiration to guarantee success for every vegetable garden—and every gardener' },
    { id: 25, title: 'A Thousand Splendid Suns', author: 'Khaled Hosseini', genre: 'realistic-fiction', year: 2007, description: 'A powerful story of two women’s friendship in war-torn Afghanistan.' },
    { id: 26, title: 'The Book Thief', author: 'Markus Zusak', genre: 'realistic-fiction', year: 2005, description: 'A young girl living in Nazi Germany steals books to escape the horrors of war.' },
    { id: 27, title: 'Bridge to Terabithia', author: 'Katherine Paterson', genre: 'realistic-fiction', year: 1977, description: 'A heartwarming story about friendship and loss between two children.' },
    { id: 28, title: 'Paper Towns', author: 'John Green', genre: 'realistic-fiction', year: 2008, description: 'A coming-of-age story about a boy’s search for a missing girl and his own identity.' },
    { id: 29, title: 'Rules', author: 'Cynthia Lord', genre: 'realistic-fiction', year: 2006, description: 'A story about a girl’s relationship with her autistic brother and her journey to self-acceptance.' },
    { id: 30, title: 'Smile', author: 'Raina Telgemeier', genre: 'realistic-fiction', year: 2010, description: 'A graphic novel about a girl’s struggle with braces and growing up.' },
    { id: 31, title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'realistic-fiction', year: 1951, description: 'A story of adolescent alienation told through the eyes of Holden Caulfield.' },
    { id: 32, title: 'Wonder', author: 'R.J. Palacio', genre: 'realistic-fiction', year: 2012, description: 'A story about a boy with a facial deformity entering public school for the first time.' },
    { id: 33, title: 'A Court of Thorns and Roses', author: 'Sarah J. Maas', genre: 'romance', year: 2015, description: 'A fantasy romance involving fairies, magic, and adventure.' },
    { id: 34, title: 'Crazy Rich Asians', author: 'Kevin Kwan', genre: 'romance', year: 2013, description: 'A hilarious and touching story about love and wealth in high society.' },
    { id: 35, title: 'The Fault in Our Stars', author: 'John Green', genre: 'romance', year: 2012, description: 'A heart-wrenching love story about two teenagers battling cancer.' },
    { id: 36, title: 'Gone with the Wind', author: 'Margaret Mitchell', genre: 'romance', year: 1936, description: 'A love story set against the backdrop of the American Civil War.' },
    { id: 37, title: 'Me Before You', author: 'Jojo Moyes', genre: 'romance', year: 2012, description: 'A story about an unexpected relationship between a caregiver and her paralyzed employer.' },
    { id: 38, title: 'The Notebook', author: 'Nicholas Sparks', genre: 'romance', year: 1996, description: 'A moving love story spanning decades between two people.' },
    { id: 39, title: 'Outlander', author: 'Diana Gabaldon', genre: 'romance', year: 1991, description: 'A time-travel romance between a WWII nurse and a Highland warrior.' },
    { id: 40, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'romance', year: 1813, description: 'A classic tale of love, class, and social expectations in Regency-era England.' },
    { id: 41, title: '1984', author: 'George Orwell', genre: 'science-fiction', year: 1949, description: 'A dystopian novel about surveillance and totalitarianism.' },
    { id: 42, title: 'A Clockwork Orange', author: 'Anthony Burgess', genre: 'science-fiction', year: 1962, description: 'A story about youth violence and free will in a dystopian future.' },
    { id: 43, title: 'Brave New World', author: 'Aldous Huxley', genre: 'science-fiction', year: 1932, description: 'A vision of a future society driven by technology and control.' },
    { id: 44, title: 'Do Androids Dream of Electric Sheep?', author: 'Philip K. Dick', genre: 'science-fiction', year: 1968, description: 'A novel about a bounty hunter tracking down rogue androids in a post-apocalyptic world.' },
    { id: 45, title: 'Fahrenheit 451', author: 'Ray Bradbury', genre: 'science-fiction', year: 1953, description: 'A dystopian novel about a future society where books are banned and burned.' },
    { id: 46, title: 'Foundation', author: 'Isaac Asimov', genre: 'science-fiction', year: 1951, description: 'A story about the fall of a galactic empire and the efforts to preserve knowledge.' },
    { id: 47, title: 'Hyperion', author: 'Dan Simmons', genre: 'science-fiction', year: 1989, description: 'A sci-fi epic featuring a diverse group of pilgrims journeying to the far future.' },
    { id: 48, title: 'Neuromancer', author: 'William Gibson', genre: 'science-fiction', year: 1984, description: 'A cyberpunk novel about a washed-up hacker hired for a dangerous job in cyberspace.' },
  ];
  
// Route to serve all books as JSON
router.get('/', (req, res) => {
  res.json(books);
});

// Route to fetch a single book by ID
router.get('/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);
  
  if (book) {
      res.json(book);
  } else {
      res.status(404).json({ message: 'Book not found' });
  }
});

module.exports = router;

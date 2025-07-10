
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://www.cinefreak.net/';

async function scrape() {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const movies = [];

    $('.post').each((i, el) => {
      const title = $(el).find('.entry-title a').text().trim();
      const link = $(el).find('.entry-title a').attr('href');
      const image = $(el).find('img').attr('src');

      if (title && link && image) {
        movies.push({ title, link, image });
      }
    });

    fs.writeFileSync('movies.json', JSON.stringify(movies, null, 2));
    console.log('Scraping completed! Movies saved to movies.json');
  } catch (error) {
    console.error('Error:', error);
  }
}

scrape();

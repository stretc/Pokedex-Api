import puppeteer from "puppeteer";
import fs from "fs";

export const scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = "https://pokemondb.net/pokedex/all";
  await page.goto(url);

  const allPokemon = await page.evaluate(() => {
    const pokemonElements = document.querySelectorAll('tr');
    return Array.from(pokemonElements).map((pokemon) => {
      const pokeNumberElement = pokemon.querySelector('.infocard-cell-data');
      const pokePicElement = pokemon.querySelector('.infocard-cell-img img');
      const pokeNameElement = pokemon.querySelector('a.ent-name');
      const pokeTypeElement = pokemon.querySelectorAll('td.cell-icon a.type-icon');
      const pokeTotalElement = pokemon.querySelector('.cell-num.cell-total');
      const statElements = pokemon.querySelectorAll('.cell-num');

      const stats = Array.from(statElements).map(stat => stat.textContent);

      const number = pokeNumberElement ? pokeNumberElement.textContent : null;
      const pokePic = pokePicElement ? pokePicElement.getAttribute('src') : null;
      const name = pokeNameElement ? pokeNameElement.textContent : null;
      const types = Array.from(pokeTypeElement).map((typeElement) => typeElement.textContent).join(', ');
      const total = pokeTotalElement ? pokeTotalElement.textContent : null;
      const hp = stats[2] || null;
      const attack = stats[3] || null;
      const defense = stats[4] || null;
      const spAttack = stats[5] || null;
      const spDefense = stats[6] || null;
      const speed = stats[7] || null;

      return {
        pokePic,
        number,
        name,
        type: types,
        total,
        hp,
        attack,
        defense,
        spAttack,
        spDefense,
        speed
      };
    }).filter((pokemon) => pokemon.number !== null);
  });

  fs.writeFileSync('pokedex.json', JSON.stringify(allPokemon, null, 2));
  console.log('Saved to pokedex.json');

  await browser.close();
};

scrape();
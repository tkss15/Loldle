const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');
const prompt = require("prompt-sync")({ sigint: true });


// Paths
const dir = './champions';
const WEBSITE = 'https://leagueoflegends.fandom.com/wiki'; // Credit to leauge of legends fandom

let flag = 1;

async function fetchQuote(name) 
{
  let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  try 
  {
    await driver.get(`${WEBSITE}/${name}/LoL/Audio`);// Driver logging in the Champion Audio Page.
    const text = await driver.findElement(By.xpath('//li/i'));// Looking for the First //li/i which is the Pick text
    const data = await text.getText();

    const fileName = './champions/' + name + '.json';
    let content = JSON.parse(fs.readFileSync(fileName, 'utf8'));
    content.quote = data;
    fs.writeFileSync(fileName, JSON.stringify(content));

    flag = flag + 1;
  } finally {
    await driver.quit();
  }
};


async function AbilltyPhotos(name)
{
    /* Function will fetch data from wiki and will get all photos of abilltys from champion
        - currently will look only for abilltys with one picture such as Aatrox e and etc.
        - next will look for all multi pictures of abilltys such as Aatrox q*/


    let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
    try {
        await driver.get(`${WEBSITE}/${name}/LoL`);
        const picture_class = await driver.findElement(by.className('ls-is-cached'));
        const src = await picture_class.getAttribute('src');
    }
}


function downloadImage(logosrc)
{
    
} 
async function example3()
{
  let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  try {
    await driver.get('https://leagueoflegends.fandom.com/wiki/List_of_champions');
    const championTable = await driver.findElements(By.className('inline-image label-only champion-icon tooltips-init-complete'));
    const arrayChampion = championTable.map(async (champion) => {

      const data = (await champion.getText()).split('\n');
      const chmapionData = {'name': data[0],'title': data[1],'quote': ''}
      const jsonString = JSON.stringify(chmapionData);
      fs.writeFile(fileName(champion), jsonString, err => {
        if(err)
        {
          console.log('Error', err);
        }
      })
      return data;
    })
    //console.log(arrayChampion);
  } finally {
    //await driver.quit();
  }
}


async function examplefornoobs(name)
{
  try {
    while(flag == 0) await sleep(1000);
    flag = flag - 1;
    await example2(name);
  } catch(err) {
    console.log(err);
  }
}

function GetChampionQuotes()
{
  const ChampionSize = fs.readdirSync(dir).forEach(fileName => {
    console.log('1');
    const name = path.parse(fileName).name;
    const file = fs.readFileSync(`./champions/${fileName}`)
    const champion = JSON.parse(file);
    if(!champion.quote)
    {
      examplefornoobs(name).then(() => {
        console.log('OK');
      })
    }
  })
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
//GetChampionQuotes();





// 1. get a random number between 1 and max champions
// 2. get the quote of the champion and asks client for a guest
// 3. check for anwser


function GetRandomChampionQuote()
{
  const championAmount = fs.readdirSync(dir).length;
  //console.log(championAmount);
  const RandomChampion = Math.floor(Math.random() * (championAmount));
  console.log(RandomChampion);
  const ChampionSize = fs.readdirSync(dir).forEach((champion,index) => {
    if(index != RandomChampion)
      return;
    
    const file = fs.readFileSync(`./champions/${champion}`)
    const championJson = JSON.parse(file);

    const anwser = prompt(championJson.quote + '\n');
    while(anwser != championJson.name)
      anwser = prompt('Try Again');
    console.log('Won !');
  })
}

GetRandomChampionQuote();



const fileName = (champion) => {
  return './champions/' + champion + '.json';
}

const wirteData = (champion, data) => {
  fs.writeFile((fileName(champion)), data, (err) => {
    if(err)
      console.log('error 404 not found');
  });
}

const readData = (champion) => {
  const file = fs.readFileSync(fileName(champion));
  return JSON.parse(file);
}

//console.log(readData('Vi'));
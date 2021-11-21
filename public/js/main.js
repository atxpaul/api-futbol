const positive = document.querySelector('.positive');
const negative = document.querySelector('.negative');
const draw = document.querySelector('.draw');
const error = document.querySelector('.error');

function hideAllPanels() {
  positive.classList.add('hidden');
  negative.classList.add('hidden');
  draw.classList.add('hidden');
  error.classList.add('hidden');
}

function showPanel(panel) {
  panel.classList.remove('hidden');
}

async function getData(url) {
  const response = await fetch(url);
  if (!response.ok) throw 'Error conseguindo o resultado do Dépor';
  const data = await response.json();
  return data;
}

function showError(message) {
  hideAllPanels();
  error.querySelector('p').innerText = message;
  showPanel(error);
}

function showPositive(lastMatch, nextMatch) {
  hideAllPanels();
  showPanel(positive);
  positive.querySelector(
    'p.lastMatch'
  ).innerHTML = `${lastMatch.result} contra o ${lastMatch.rival}`;
  positive.querySelector('p.nextMatch').innerHTML = `⚽${nextMatch.rival}<br />
  📆${nextMatch.day}<br />
  🕑${nextMatch.hour}<br />
  📍${nextMatch.riazor ? 'En #ANosaCasa' : 'A domicilio'}`;
}
//🕑📆📍⚽

function showNegative(lastMatch, nextMatch) {
  hideAllPanels();
  showPanel(negative);
  negative.querySelector(
    'p.lastMatch'
  ).innerHTML = `${lastMatch.result} contra o ${lastMatch.rival}`;
  negative.querySelector('p.nextMatch').innerHTML = `⚽${nextMatch.rival}<br />
  📆${nextMatch.day}<br />
  🕑${nextMatch.hour}<br />
  📍${nextMatch.riazor ? 'En #ANosaCasa' : 'A domicilio'}`;
}

function showDraw(lastMatch, nextMatch) {
  hideAllPanels();
  showPanel(draw);
  draw.querySelector(
    'p.lastMatch'
  ).innerHTML = `${lastMatch.result} contra o ${lastMatch.rival}`;
  draw.querySelector('p.nextMatch').innerHTML = `⚽${nextMatch.rival}<br />
  📆${nextMatch.day}<br />
  🕑${nextMatch.hour}<br />
  📍${nextMatch.riazor ? 'En #ANosaCasa' : 'A domicilio'}`;
}

async function processData(matches) {
  const lastMatch = matches[0];
  const nextMatch = matches[1];

  if (lastMatch.winner == 'Dépor') {
    showPositive(lastMatch, nextMatch);
  } else if (lastMatch.winner == 'Draw') {
    showDraw(lastMatch, nextMatch);
  } else {
    showNegative(lastMatch, nextMatch);
  }
}

async function main() {
  const matches = await getData(`${document.URL}api/depor`);
  if (
    Object.keys(matches[0]).length === 0 &&
    matches[0].constructor === Object
  ) {
    const load = await getData(`${document.URL}api/depor/scrap`);
    alert('Estamos recopilando os datos, agarda uns intres e refresca!');
  }
  await processData(matches);
  console.log(matches);
}

main();

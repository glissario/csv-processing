//const inputString =
"Hauptartikelnr;Artikelname;Hersteller;Beschreibung;Materialangaben;Geschlecht;Produktart;Ärmel;Bein;Kragen;Herstellung;Taschenart;Grammatur;Material;Ursprungsland;Bildname102.85;'Paul - Men's Supersoft Organic T-Shirt';Nakedshirt;'Single Jersey, Rundhalsausschnitt mit Rippstrickbündchen, Nackenband, Seitennähte, Doppelnaht an Ärmelabschluss und Bund, Medium Fit, Neutrales Größenetikett im Nacken ';'100% Bio-Baumwolle ';Herren;T-Shirts;Kurzarm;;Rundhals;'Fair & Umweltfreundlich';;'200 g/m²';Bio-Baumwolle;;102.85.jpg105.85;'Coco - Women's Tank Top';Nakedshirt;'Single Jersey Hals- und Armausschnitte mit Rippstrick-Einfassung, Seitennähte, Doppelnaht am Bund, Medium Fit, Neutrales Größenetikett im Nacken. ';'100 % Baumwolle';Damen;T-Shirts;Ärmellos;;Rundhals;Fair;;'155 g/m²';Baumwolle;;105.85.jpg106.85;'Mia - Women's Organic Fi'ted'Longtop';Nakedshirt;'Single Jersey, Decolletée und Armausschnitte mit dezenter Rippstrick-Einfassung, Seitennähte, Doppelnaht am Bund, Extra lang und körpernah geschnitten, Neutrales Größenetikett im Nacken.';'100 % Bio-Baumwolle';Damen;T-Shirts;Ärmellos;;Boat-Neck;'Fair & Umweltfreundlich';;'155 g/m²';;;106.85.jpg107.85;'Louise - Women's Fitted Top';Nakedshirt;'Single Jersey, Hals- und Armausschnitte mit Einfassung, Seitennähte, Doppelnaht am Bund, Körpernah geschnitten,  Neutrales Größenetikett im Nacken. ';'100 % Baumwolle';Damen;T-Shirts;Ärmellos;;Boat-Neck;;;'155 g/m²';Baumwolle;;107.85.jpg110.85;'Mouse - Girl's Fashion T-Shirt';Nakedshirt;'Single Jersey, Rundhalsausschnitt mit Rippstrickkragen,  Ärmelabschluss und Bund sind gekräuselt, Seitennähte,  Neutrales Größenetikett im Nacken. ';'100 % Baumwolle';Kinder;T-Shirts;Kurzarm;;Rundhals;Fair;;'155 g/m² ';Baumwolle;;110.85.jpg 111.85;'Lily - Viscose-Cotton T-Shirt';Nakedshirt;'Single Jersey, Rundhalsausschnitt mit Rippstrick-Bündchen,  Nackenband, Seitennähte, Doppelnaht an Ärmelabschluss und Bund, Medium Fit ';'70% Viskose (aus Bambus-Cellulose), 30% Bio-Baumwolle';Damen;T-Shirts;Kurzarm;;Rundhals;'Fair & Umweltfreundlich';;'150 g/m²';Viskose;;111.85.jpg";
let globalArticleArray = [];
let initArray = [
  "new",
  "new",
  "new",
  "new",
  "new",
  "new",
  "new",
  "new",
  "new",
  "new",
  "new",
  "new",
  "new",
  "new",
  "new",
  "new",
];

class Article {
  constructor(articleArray) {
    this.articleNumber = articleArray[0];
    this.name = articleArray[1];
    this.producer = articleArray[2];
    this.description = articleArray[3];
    this.material = articleArray[4];
    this.gender = articleArray[5];
    this.type = articleArray[6];
    this.sleeve = articleArray[7];
    this.leg = articleArray[8];
    this.collar = articleArray[9];
    this.production = articleArray[10];
    this.pocket = articleArray[11];
    this.grammar = articleArray[12];
    this.material2 = articleArray[13];
    this.origin = articleArray[14];
    this.picture = articleArray[15];
  }
}

let articles = ""; //stringToArray(inputString);

function stringToArray(string) {
  // cut the string to an array of strings => to an array of objects + an Array of items
  let articleArray = string.split("jpg");
  firstItem = articleArray[0].split("Bildname");
  let newArticle = [];
  newArticle.push(firstItem[1].split(";"));
  for (i = 1; i < articleArray.length - 1; i++) {
    newArticle.push(articleArray[i].split(";"));
  }
  for (let i = 0; i < newArticle.length; i++) {
    newArticle[i][newArticle[i].length - 1] =
      newArticle[i][newArticle[i].length - 1].concat("jpg");
  }
  globalArticleArray = newArticle;
  objectArray = [];
  for (let i = 0; i < newArticle.length; i++) {
    const newObj = new Article(newArticle[i]);
    globalArticleArray[i].artObj = newObj;
    objectArray.push(newObj);
  }
  return objectArray;
}

//initial rendering
//createLines(globalArticleArray);

function createLines(array) {
  for (let i = 0; i < array.length; i++) {
    createLine(array[i], i);
  }
}

function createLine(articleArray, index) {
  const table = document.querySelector("#table");
  const button = document.createElement("button");
  const btnNodeText = document.createTextNode("del");

  const loadedLabel = document.querySelector("#loaded");

  button.classList = "del-button";
  button.setAttribute("line-index", index);
  button.appendChild(btnNodeText);
  button.addEventListener("click", delLine);

  const info = document.createElement("div");
  info.classList = "informations";
  info.setAttribute("line-index", index);

  const radio = document.createElement("input");
  radio.type = "radio";
  radio.name = "radio";
  radio.id = "radio";
  radio.classList = "radio";
  radio.checked = true;
  radio.setAttribute("line-index", index);

  radio.addEventListener("change", markLine);

  for (let i = 0; i < articleArray.length; i++) {
    const tableDiv = createDiv(articleArray[i]);
    info.appendChild(tableDiv);
  }

  if (index > 0) {
    firstItem = document.querySelector(".item");
    table.prepend(button);
    table.prepend(info);
    table.prepend(radio);
  } else {
    table.appendChild(radio);
    table.appendChild(info);
    table.appendChild(button);
  }
}

// create new line (with new line button)
newLine = document.querySelector("#new-line");
newLine.addEventListener("click", function () {
  createLine(initArray, globalArticleArray.length);
  globalArticleArray.push(initArray);
});

function createDiv(text) {
  const divElement = document.createElement("div");
  divElement.classList = "item ";
  divElement.id = text;
  const divNode = document.createTextNode(text);
  divElement.appendChild(divNode);
  table.appendChild(divElement);
  divElement.addEventListener("click", getToChangeData);
  return divElement;
}

function delLine() {
  const lines = document.querySelectorAll(".informations");
  const radio = document.querySelectorAll(".radio");
  const table = document.querySelector(".table");
  const index = event.target.getAttribute("line-index");

  for (let i = 0; i < lines.length; i++) {
    lineIndex = lines[i].getAttribute("line-index");
    if (index === lineIndex) {
      table.removeChild(event.target);
      table.removeChild(lines[i]);
      table.removeChild(radio[i]);
    }
  }
}

// changing data - responding on click event of generated items

function getToChangeData() {
  cancelButton = document.querySelector("#cancel-button");
  cancelButton.disabled = false;
  const activeItem = document.querySelector(".active-item");
  if (activeItem) activeItem.classList = "item";
  event.target.classList = "active-item";

  input = document.querySelector(".changeInput");
  input.style.transform = "scale(1.5)";

  currentValueLabel = document.querySelector("#current-value");
  currentValueLabel.removeChild(currentValueLabel.firstChild);
  currentValueNode = document.createTextNode(event.target.textContent);
  currentValueLabel.appendChild(currentValueNode);

  let inputfield = document.querySelector("#change-input-text");
  inputfield.focus();

  saveButton = document.querySelector("#save-button");

  inputfield.addEventListener("input", function (event) {
    if (event.target.value.length > 3) {
      saveButton = document.querySelector("#save-button");
      saveButton.disabled = false;
      saveButton.addEventListener("click", saveChange);
    } else {
      saveButton = document.querySelector("#save-button").disabled = true;
    }
  });
  cancelButton.addEventListener("click", cancelChange);
}

function cancelChange() {
  const cancelItem = document.querySelector(".active-item");
  cancelItem.classList = "item";
  input = document.querySelector(".changeInput");
  input.style.transform = "scale(1)";
  cancelButton = document.querySelector("#cancel-button");
  cancelButton.disabled = true;
}
function saveChange() {
  const saveItem = document.querySelector(".active-item");
  const saveText = document.querySelector("#change-input-text");
  node = document.createTextNode(saveText.value);

  saveItem.removeChild(saveItem.firstChild);
  saveItem.appendChild(node);
  saveItem.classList = "item";

  input = document.querySelector(".changeInput");
  input.style.transform = "scale(1)";

  cancelButton = document.querySelector("#cancel-button");
  cancelButton.disabled = true;
  event.target.disabled = true;
}

// get to know the active row
function activeRow() {
  const active = document.querySelectorAll("#radio");

  for (let i = 0; i < active.length; i++) {
    if (active[i].checked) {
      activeIndex = active[i].getAttribute("line-index");
      return activeIndex;
    }
  }
}

// mark the active Row
function markLine() {
  const line = activeRow();
  let itemLines = document.querySelector(".informations-BG-gray");
  if (itemLines) {
    itemLines.classList = "informations";
  }
  itemLines = document.querySelectorAll(".informations");
  for (let i = 0; i < itemLines.length; i++) {
    const globalLine = itemLines[i].getAttribute("line-index");
    if (line === globalLine) {
      itemLines[i].classList = "informations-BG-gray";
    }
  }
}

const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = csvFile.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;
    let partArray = [];
    articles = stringToArray(text);
    createLines(globalArticleArray);
  };

  reader.readAsBinaryString(input);
});

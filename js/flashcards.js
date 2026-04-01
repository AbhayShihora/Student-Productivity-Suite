// Beginner-friendly Flashcards App

var STORAGE_KEY = "sps_flashcards";

var qEl = document.getElementById("fcQ");
var aEl = document.getElementById("fcA");
var addCardBtn = document.getElementById("addCard");
var clearCardsBtn = document.getElementById("clearCards");
var cardsWrap = document.getElementById("cardsWrap");

// Load cards
function loadCards() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

// Save cards
function saveCards(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

// Create card HTML
function createCardElement(cardObj, index) {
  var wrapper = document.createElement("div");
  wrapper.className = "card-wrapper";

  var card = document.createElement("div");
  card.className = "card";

  var inner = document.createElement("div");
  inner.className = "card-inner";

  var front = document.createElement("div");
  front.className = "card-face card-front";
  front.textContent = cardObj.q;

  var back = document.createElement("div");
  back.className = "card-face card-back";
  back.textContent = cardObj.a;

  inner.appendChild(front);
  inner.appendChild(back);
  card.appendChild(inner);

  wrapper.appendChild(card);

  // Actions under card
  var actions = document.createElement("div");
  actions.className = "card-actions";

  var flipBtn = document.createElement("button");
  flipBtn.textContent = "Flip";
  flipBtn.addEventListener("click", function () {
    card.classList.toggle("flipped");
  });

  var delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", function () {
    deleteCard(index);
  });

  actions.appendChild(flipBtn);
  actions.appendChild(delBtn);
  wrapper.appendChild(actions);

  return wrapper;
}

// Render cards
function renderCards() {
  var arr = loadCards();
  cardsWrap.innerHTML = "";

  if (arr.length === 0) {
    var p = document.createElement("p");
    p.className = "muted";
    p.textContent = "No cards yet.";
    cardsWrap.appendChild(p);
    return;
  }

  arr.forEach(function (c, i) {
    cardsWrap.appendChild(createCardElement(c, i));
  });
}

// Add a new card
addCardBtn.addEventListener("click", function () {
  var q = qEl.value.trim();
  var a = aEl.value.trim();

  if (!q || !a) {
    alert("Please enter both question and answer.");
    return;
  }

  var arr = loadCards();
  arr.unshift({ q: q, a: a }); // newest first
  saveCards(arr);

  qEl.value = "";
  aEl.value = "";

  renderCards();
});

// Delete card
function deleteCard(index) {
  var arr = loadCards();
  if (!confirm("Delete this card?")) return;
  arr.splice(index, 1);
  saveCards(arr);
  renderCards();
}

// Clear all
clearCardsBtn.addEventListener("click", function () {
  if (!confirm("Clear all cards?")) return;
  localStorage.removeItem(STORAGE_KEY);
  renderCards();
});

// Initial render
renderCards();

const quoteDisplay = document.getElementById("quoteDisplay")
const newQuote = document.getElementById("newQuote")
const categorySelect = document.getElementById("categorySelect");

let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "inspiration" },
  { text: "Don’t let yesterday take up too much of today.", category: "inspiration" },
  { text: "I'm not arguing, I'm just explaining why I'm right.", category: "humor" },
  { text: "I'm on a seafood diet. I see food, and I eat it.", category: "humor" }
];

function loadCategories() {
  categorySelect.innerHTML = "";
  const categories = [...new Set(quotes.map(q => q.category))];
  categories.forEach(cat => {
    let option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerText = `"${quote.text}" — (${quote.category})`;
}

newQuote.addEventListener("click", showRandomQuote);


function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newText = textInput.value;
  const newCategory = categoryInput.value;

  if (newText && newCategory){
    quotes.push({ text: newText, category: newCategory});

    textInput.value = ""
    categoryInput.value = ""

    alert("Quote added successfully!")
  } else {
    alert ("please enter both quote and category")
  }
}


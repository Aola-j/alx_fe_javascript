const quoteDisplay = document.getElementById("quoteDisplay")
const newQuote = document.getElementById("newQuote")
const categorySelect = document.getElementById("categorySelect");
const addQuote = document.getElementById("addQuote")

let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "inspiration" },
  { text: "Don’t let yesterday take up too much of today.", category: "inspiration" },
  { text: "I'm not arguing, I'm just explaining why I'm right.", category: "humor" },
  { text: "I'm on a seafood diet. I see food, and I eat it.", category: "humor" }
];

function updateCategoryOptions(selectCategory = null) {
  const previous = categorySelect.value;
  categorySelect.innerHTML = "";
}



function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerText = `"${quote.text}" — (${quote.category})`;
}

newQuote.addEventListener("click", showRandomQuote);


function createAddQuoteForm() {
  const textInput = document.getElementById("newQuoteText");
  const catInput  = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = catInput.value.trim().toLowerCase();

  if (!text || !category) {
    alert("Please enter both a quote and a category.");
    return;
  }

  quotes.push({ text, category });

  // Refresh categories and auto-select the new one
  updateCategoryOptions(category);

  // Optionally show something from the new category right away
  showRandomQuote();

  // Clear inputs
  textInput.value = "";
  catInput.value  = "";
}
addQuote.addEventListener("click", createAddQuoteForm);
categorySelect.addEventListener("change", showRandomQuote);
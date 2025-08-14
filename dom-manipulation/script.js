const quoteDisplay = document.getElementById("quoteDisplay")
const newQuote = document.getElementById("newQuote")
const categorySelect = document.getElementById("categorySelect");
const addQuote = document.getElementById("addQuote")
const exportBtn = document.getElementById("exportJson");
const importFile = document.getElementById("importFile");


let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "inspiration" },
  { text: "Don’t let yesterday take up too much of today.", category: "inspiration" },
  { text: "I'm not arguing, I'm just explaining why I'm right.", category: "humor" },
  { text: "I'm on a seafood diet. I see food, and I eat it.", category: "humor" }
];

// Load from localstorage 
if (localStorage.getItem("quotes")) {
  quotes = JSON.parse(localStorage.getItem("quotes"));
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}



function populateCategories() {
  const categories = ["all", ...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = ""; // Clear dropdown

  categories.forEach(c => {
    const option = document.createElement("option");
    option.value = c;
    option.textContent = c;
    categoryFilter.appendChild(option);
  });

  // Restore last category
  const lastCategory = localStorage.getItem("lastCategory") || "all";
  if (categories.includes(lastCategory)) {
    categoryFilter.value = lastCategory;
  }
}
populateCategories();


// Show random quote
function showRandomQuote() {
  const selectedCategory = categoryFilter.value;
  const filtered = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  if (filtered.length === 0) {
    quoteDisplay.innerText = "No quotes available in this category.";
    return;
  }

  const randomQuote = filtered[Math.floor(Math.random() * filtered.length)];
  quoteDisplay.innerText = `"${randomQuote.text}" — (${randomQuote.category})`;
}

// Filter quotes (just updates random selection)
function filterQuotes() {
  localStorage.setItem("lastCategory", categoryFilter.value);
  showRandomQuote();
}


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

  saveQuotes();

  // Refresh categories and auto-select the new one
  populateCategories();

  // Optionally show something from the new category right away
  showRandomQuote();

  // Clear inputs
  textInput.value = "";
  catInput.value  = "";
}

// Export quotes as JSON
function exportQuotes() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// Import quotes from JSON
function importQuotes(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid JSON format.");
      }
    } catch {
      alert("Error reading JSON file.");
    }
  };
  reader.readAsText(file);
}
addQuote.addEventListener("click", createAddQuoteForm);
newQuote.addEventListener("click", showRandomQuote);
categorySelect.addEventListener("change", showRandomQuote);
exportBtn.addEventListener("click", exportQuotes);
importFile.addEventListener("change", importQuotes);

showRandomQuote();
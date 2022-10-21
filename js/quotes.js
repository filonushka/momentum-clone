export { prepareQuotesWidget };

import { getRandomNum } from "./random.js";

const quote = document.querySelector(".quote");
const quoteAuthor = document.querySelector(".quote-author");
const changeQuoteBtn = document.querySelector(".change-quote__button");

function prepareQuotesWidget() {
  changeQuoteBtn.addEventListener("click", changeQuote);

  showQuotes();
}

async function showQuotes() {
  const quotes = `data-quotes.json`;
  const res = await fetch(quotes);
  const data = await res.json();

  let quoteIndex = getRandomNum(0, 102);
  quote.textContent = `"${data[quoteIndex].quote}"`;
  quoteAuthor.textContent = data[quoteIndex].author;
}

function changeQuote() {
  showQuotes();
}

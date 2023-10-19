import { useState, useEffect } from 'react';
import './App.scss';
import ColorsArray from './colorsArray.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';


let quoteAPI = "https://api.quotable.io/random";

function App() {

const [quote, setQuote] = useState({
  content: "Your entire life only happens in this moment. The present moment is life itself. Yet, people live as if the opposite were true and treat the present moment as a stepping stone to the next moment - a means to an end.",
  author: "Eckhart Tolle"
});
const [accentColor, setAccentColor] = useState('#282c34');

const fetchQuote = async () => {
  const response = await fetch(quoteAPI);
  const newQuote = await response.json();
  setQuote({
      content: newQuote.content,
      author: newQuote.author
    });
  getRandomColor();
}

const getRandomColor = () => {
  let randomInt = Math.floor(Math.random() * ColorsArray.length);
  setAccentColor(ColorsArray[randomInt]);
}

const tweetGenerator = () => {
  return `https://twitter.com/intent/tweet?text=${quote.content}%20-%20${quote.author}`;
}

useEffect(() => {
    fetchQuote();
  }, []);
  return (
    <>
    <div id="body" style={{backgroundColor: accentColor, color: accentColor, transition: "all 1.5s ease"}}>
        <div id="quote-box">
            <p id="text">
            <FontAwesomeIcon className="icon" icon={faQuoteLeft} />
            {quote.content}
          </p>
          <p id="author">
            - {quote.author}
          </p>
          <div id="buttons">
          <a id="tweet-quote"
            href={tweetGenerator()} target='_blank' style={{backgroundColor: accentColor, transition: "all 1.5s ease"}}>
            <FontAwesomeIcon icon={faXTwitter} /></a>
          <button id="new-quote" onClick={()=>{fetchQuote()}} style={{backgroundColor: accentColor, transition: "all 1.5s ease"}}>New quote</button>
          </div>
        </div>
        <a href="https://github.com/emreguendogdu" id="og-sign">osmangund®</a>
    </div>
    </>
  );
}

export default App;

import { useState, useEffect } from "react"
import "./App.scss"
import ColorsArray from "./components/colorsArray.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXTwitter } from "@fortawesome/free-brands-svg-icons"
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons"

const quoteAPI = "https://api.quotable.io/random"

function App() {
  const [quote, setQuote] = useState({
    content: "",
    author: "",
  })
  const [accentColor, setAccentColor] = useState("#282c34")

  const fetchQuote = async () => {
    const response = await fetch(quoteAPI)
    const newQuote = await response.json()
    setQuote({
      content: newQuote.content,
      author: newQuote.author,
    })
    getRandomColor()
  }

  const getRandomColor = () => {
    let randomInt = Math.floor(Math.random() * ColorsArray.length)
    setAccentColor(ColorsArray[randomInt])
  }

  const tweetGenerator = () => {
    return `https://twitter.com/intent/tweet?text=${quote.content}%20-%20${quote.author}`
  }

  useEffect(() => {
    fetchQuote()
  }, [])

  return (
    <>
      <main
        id="app"
        style={{
          backgroundColor: accentColor,
          color: accentColor,
          transition: "all 1.5s ease",
        }}
      >
        <div id="quote-box">
          <p id="text">
            {quote.content ? (
              <FontAwesomeIcon className="icon" icon={faQuoteLeft} />
            ) : (
              ""
            )}
            {quote.content}
          </p>
          {quote.author ? <p id="author">- {quote.author}</p> : ""}
          <div id="buttons">
            <a
              id="tweet-quote"
              href={() => {
                tweetGenerator()
              }}
              target="_blank"
              rel="noreferrer"
              style={{
                backgroundColor: accentColor,
                transition: "all 1.5s ease",
              }}
            >
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
            <button
              id="new-quote"
              onClick={() => {
                fetchQuote()
              }}
              style={{
                backgroundColor: accentColor,
                transition: "all 1.5s ease",
              }}
            >
              New quote
            </button>
          </div>
        </div>
        <a
          href="https://github.com/osmangund"
          id="og-sign"
          target="_blank"
          rel="noreferrer"
        >
          osmangund®
        </a>
      </main>
    </>
  )
}

export default App

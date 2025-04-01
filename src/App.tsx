import { useEffect, useState } from "react"
import Books from "./component/Books";
import { GiSpellBook } from "react-icons/gi";
import AddBooks from "./component/AddBooks";
import AboutUs from './component/AboutUs';
import { FaStar, FaBookOpen } from "react-icons/fa";

export interface Book {
  id: number,
  name: string,
  author: string,
  description: string,
  price: number
  imgUrl: string
}
function App() {

  const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);

  const [page, setPage] = useState<string>("Books")

  const [showWelcome, setShowWelcome] = useState(true);

  const [books, setBooks] = useState<Book[]>([
    { id: 1, name: "Crash Landing on You", author: "Jun Ji Hyun", description: "A love story between a South Korean heiress and a North Korean officer.", price: 18, imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_n9BidNvuz9bCAc5AFXay1vOZ-nYeytwwTw&s" },
    { id: 2, name: "Goblin: The Lonely and Great God", author: "Kim Eun Sook", description: "A romantic fantasy about an immortal goblin and his bride.", price: 20, imgUrl: "https://www.themoviedb.org/t/p/original/c2gon6zbqzL73DOl8mPQMMUJXvE.jpg" },
    { id: 3, name: "Descendants of the Sun", author: "Kim Won Suk", description: "A love story between a soldier and a doctor in a war zone.", price: 22, imgUrl: "https://m.media-amazon.com/images/I/91yc+EJ2qUL._AC_UF1000,1000_QL80_.jpg" },
    { id: 4, name: "It's Okay to Not Be Okay", author: "Jo Yong", description: "A healing romance between a psychiatric ward worker and a children's book author.", price: 20, imgUrl: "https://m.media-amazon.com/images/M/MV5BNzZmOWMwNjktNzdkOC00MDcxLWE3YTItNzIwOTRjOGFlYWZlXkEyXkFqcGc@._V1_.jpg" },
    { id: 5, name: "Hotel Del Luna", author: "Hong Sisters", description: "A mysterious hotel for ghosts and its cold owner.", price: 19, imgUrl: "https://static.sociofyme.com/thumb/151153170/151153170.jpg?imgsize=55056&width=420&height=746&resizemode=76" },
    { id: 6, name: "The Heirs", author: "Kim Eun Sook", description: "A story of rich high school students and their struggles with love and family.", price: 17, imgUrl: "https://images.justwatch.com/poster/287650504/s718/season-1.jpg" },
    { id: 7, name: "Strong Woman Do Bong Soon", author: "Baek Mi Kyung", description: "A woman with superhuman strength works as a bodyguard for a CEO.", price: 18, imgUrl: "https://images.justwatch.com/poster/319986072/s332/Staffel-1" },
    { id: 8, name: "Reply 1988", author: "Shin Won Ho", description: "A nostalgic story about family, friendship, and first love in the 1980s.", price: 20, imgUrl: "https://m.media-amazon.com/images/M/MV5BYjhjYjg1MTYtYjNhYy00YjU2LTliZmEtMWRmZDhjODdkOTE0XkEyXkFqcGc@._V1_.jpg" },
    { id: 9, name: "Vincenzo", author: "Park Jae Bum", description: "A mafia consigliere returns to Korea to fight for justice.", price: 23, imgUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5b/Vincenzo_TV_series.jpg/220px-Vincenzo_TV_series.jpg" },
    { id: 10, name: "Hometown Cha-Cha-Cha", author: "Shin Ha Eun", description: "A heartwarming romance between a dentist and a jack-of-all-trades in a seaside village.", price: 19, imgUrl: "https://upload.wikimedia.org/wikipedia/id/thumb/3/3e/Hometown_Cha-Cha-Cha.jpg/220px-Hometown_Cha-Cha-Cha.jpg" },
    { id: 11, name: "Start-Up", author: "Park Hye Ryun", description: "A story about young entrepreneurs chasing their dreams in Korea's Silicon Valley.", price: 21, imgUrl: "https://miro.medium.com/v2/resize:fit:1400/1*am-e_KwXVlAdXVrYF81L6g.jpeg" },
    { id: 12, name: "While You Were Sleeping", author: "Park Hye Ryun ", description: "A woman who can see future events in her dreams teams up with a prosecutor.", price: 18, imgUrl: "https://asianwiki.com/images/1/1f/While_You_Were_Sleeping-CP1-2.jpg" },
    { id: 13, name: "Moon Lovers: Scarlet Heart Ryeo", author: "Tong Hua", description: "A modern woman is transported back to the Goryeo era.", price: 22, imgUrl: "https://kpopmarket.co/cdn/shop/files/3_62bdc299-309b-4fce-a3e0-85206e4a66f5_1024x1024.jpg?v=1723620721" },
    { id: 14, name: "Doctor Stranger", author: "Park Jin Woo", description: "A genius surgeon escapes North Korea and struggles to find his place in South Korea.", price: 19, imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMbBCAj447qU15GeBXV4r7rDQC_SqI1SDIdQ&s" },
    { id: 15, name: "The King: Eternal Monarch", author: "Kim Eun Sook", description: "A Korean emperor travels to a parallel universe to save his kingdom.", price: 24, imgUrl: "https://i5.walmartimages.com/seo/The-King-Eternal-Monarch-Korean-TV-Drama-Boxset-DVD_b0f63a16-f0ba-418d-8203-2eced8f15a50.ef832e1886c25bcae6a768363dba67ff.jpeg" },
    { id: 16, name: "Legend of the Blue Sea", author: "Park Ji Eun", description: "A mermaid ends up in the modern world and falls for a swindler.", price: 22, imgUrl: "https://i.mydramalist.com/BjZj6f.jpg" },
    { id: 17, name: "Extraordinary Attorney Woo", author: "Moon Ji Won", description: "A brilliant lawyer with autism navigates the legal world.", price: 25, imgUrl: "https://m.media-amazon.com/images/I/71qprqdHQdL.jpg" },
    { id: 18, name: "Alchemy of Souls", author: "Hong Sisters", description: "A fantasy story about mages and their destinies in an ancient kingdom.", price: 23, imgUrl: "https://m.media-amazon.com/images/M/MV5BOGFhNGQzMWUtZWJhNi00NGZiLTg1MjEtMTQzZmU4Njg2MWRhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { id: 19, name: "Doom at your servise", author: "Im Me Ah Ri", description: "Romance, Fantasy, Comedy, Drama", price: 24, imgUrl: "https://occ-0-90-92.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABZesp954jAZjYNeuPe8vNf9so57nKw6UwjGxVlVW6M4zal38PfO4B2dDpNFFVVuucFtqt6u7CV0ADDAuqyqWpZYJZ6QAN5xxnFhd.jpg?r=cb0" },
    { id: 20, name: "He and She : Inspired quotes by the K-drama , Ill Go to You When the weather is Nice", author:"Noorah Omar", description: "This is an Exotic book which is completely unusual like love books and journals.", price: 30, imgUrl: "https://m.media-amazon.com/images/I/61EZFTONGpS._SL1200_.jpg" },
    { id: 21, name: "The K2", author:"Ji Chang Wook", description: "A highly trained special ops agent goes off the grid after being framed for murder, and is hired as a bodyguard when the powerful and influential father of a troubled girl sees his skills." , price: 30, imgUrl: "https://resizing.flixster.com/zycKMbZB2bqYAE31vstrpxiJoyY=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p13325063_i_v13_af.jpg"},
  ]);
  const saveBook = (data: Book) => {
    if (data.id) {
      setBooks(books.map((book) => (book.id === data.id ? data : book)));
    } else {
      const newId = books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
      setBooks([...books, { ...data, id: newId }]);
    }
    setSelectedBook(undefined);
  };

  const editBook = (book: Book) => {
    setSelectedBook(book);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3500); 
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    {showWelcome && (
        <div className="welcome-overlay">
          <div className="welcome-content">
            <FaBookOpen size={60} className="book-icon" color="#4a6baf" />
            <h1 className="welcome-text">Welcome to Our Book Store!</h1>
            <p className="welcome-subtext">Discover your next favorite read</p>
            <div className="stars-container">
              {[...Array(40)].map((_, i) => (
                <FaStar 
                  key={i}
                  className="star"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    fontSize: `${Math.random() * 16 + 8}px`,
                    color: i % 3 === 0 ? '#ffd700' : i % 2 === 0 ? '#ff6b6b' : '#74b9ff'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <header className="header shadow-sm">
        <div className="d-flex align-items-center">
          <GiSpellBook size={50} className="me-2" color="grey"/>
          <h1 className="display-3 text-secondary">
            Book Store
          </h1>
        </div>
        <div className="icons d-flex gap-2">
          <button
            className={`btn rounded-pill px-4 ${page === "AddBooks" ? "active" : ""}`}
            onClick={() => setPage("AddBooks")}
          >
            Add Books
          </button>
          <button
            className={`btn rounded-pill px-4 ${page === "Books" ? "active" : ""}`}
            onClick={() => setPage("Books")}
          >
            Books
          </button>
          <button
            className={`btn rounded-pill px-4 ${page === "AboutUs" ? "active" : ""}`}
            onClick={() => setPage("AboutUs")}
          >
            About Us
          </button>
        </div>
      </header>
      <div className="container mt-5">
        {page === "Books" && <Books editBook={editBook} books={books} deleteBook={( id: number ) => setBooks(books.filter(book => book.id !== id))} setPage={setPage} />} 
        {page === "AddBooks" && <AddBooks books={books} selectedBook={selectedBook} saveBook={saveBook} setSelectedBook={setSelectedBook} />      }
        {page === "AboutUs" && <AboutUs />}
      </div>
    </>
  )
}

export default App
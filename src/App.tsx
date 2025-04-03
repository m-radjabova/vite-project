import { useEffect, useState } from "react";
import Books from "./component/Books";
import AddBooks from "./component/AddBooks";
import AboutUs from "./component/AboutUs";
import { FaStar, FaBookOpen } from "react-icons/fa";
import BookInfo from "./component/BookInfo";
import Cart from "./component/Cart";
import AddToCart from "./component/AddToCart";
import Carousel from "./component/Carousel";
import Footer from './component/Footer';
import CreateContextPro from "./hooks/CreateContextPro";
import Header from './component/Header';

export interface Book {
  id: number;
  name: string;
  author: string;
  description: string;
  price: number;
  imgUrl: string;
  isLiked: boolean;
}

function App() {
  const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);
  const [page, setPage] = useState<string>("Books");
  const [showWelcome, setShowWelcome] = useState(true);
  const [cart, setCart] = useState<Book[]>([]);
  const [books, setBooks] = useState<Book[]>([
    { id: 1, name: "Crash Landing on You", author: "Jun Ji Hyun", description: "A love story between a South Korean heiress and a North Korean officer.", price: 18, imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_n9BidNvuz9bCAc5AFXay1vOZ-nYeytwwTw&s", isLiked: false },
    { id: 2, name: "Goblin: The Lonely and Great God", author: "Kim Eun Sook", description: "A romantic fantasy about an immortal goblin and his bride.", price: 20, imgUrl: "https://www.themoviedb.org/t/p/original/c2gon6zbqzL73DOl8mPQMMUJXvE.jpg", isLiked: false },
    { id: 3, name: "Descendants of the Sun", author: "Kim Won Suk", description: "A love story between a soldier and a doctor in a war zone.", price: 22, imgUrl: "https://m.media-amazon.com/images/I/91yc+EJ2qUL._AC_UF1000,1000_QL80_.jpg", isLiked: false },
    { id: 4, name: "It's Okay to Not Be Okay", author: "Jo Yong", description: "A healing romance between a psychiatric ward worker and a children's book author.", price: 20, imgUrl: "https://m.media-amazon.com/images/M/MV5BNzZmOWMwNjktNzdkOC00MDcxLWE3YTItNzIwOTRjOGFlYWZlXkEyXkFqcGc@._V1_.jpg", isLiked: false },
    { id: 5, name: "Hotel Del Luna", author: "Hong Sisters", description: "A mysterious hotel for ghosts and its cold owner.", price: 19, imgUrl: "https://static.sociofyme.com/thumb/151153170/151153170.jpg?imgsize=55056&width=420&height=746&resizemode=76", isLiked: false },
    { id: 6, name: "The Heirs", author: "Kim Eun Sook", description: "A story of rich high school students and their struggles with love and family.", price: 17, imgUrl: "https://images.justwatch.com/poster/287650504/s718/season-1.jpg", isLiked: false },
    { id: 7, name: "Strong Woman Do Bong Soon", author: "Baek Mi Kyung", description: "A woman with superhuman strength works as a bodyguard for a CEO.", price: 18, imgUrl: "https://images.justwatch.com/poster/319986072/s332/Staffel-1", isLiked: false },
    { id: 8, name: "Reply 1988", author: "Shin Won Ho", description: "A nostalgic story about family, friendship, and first love in the 1980s.", price: 20, imgUrl: "https://m.media-amazon.com/images/M/MV5BYjhjYjg1MTYtYjNhYy00YjU2LTliZmEtMWRmZDhjODdkOTE0XkEyXkFqcGc@._V1_.jpg", isLiked: false },
    { id: 9, name: "Vincenzo", author: "Park Jae Bum", description: "A mafia consigliere returns to Korea to fight for justice.", price: 23, imgUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5b/Vincenzo_TV_series.jpg/220px-Vincenzo_TV_series.jpg", isLiked: false },
    { id: 10, name: "Hometown Cha-Cha-Cha", author: "Shin Ha Eun", description: "A heartwarming romance between a dentist and a jack-of-all-trades in a seaside village.", price: 19, imgUrl: "https://upload.wikimedia.org/wikipedia/id/thumb/3/3e/Hometown_Cha-Cha-Cha.jpg/220px-Hometown_Cha-Cha-Cha.jpg", isLiked: false },
    { id: 11, name: "Start-Up", author: "Park Hye Ryun", description: "A story about young entrepreneurs chasing their dreams in Korea's Silicon Valley.", price: 21, imgUrl: "https://miro.medium.com/v2/resize:fit:1400/1*am-e_KwXVlAdXVrYF81L6g.jpeg", isLiked: false },
    { id: 12, name: "While You Were Sleeping", author: "Park Hye Ryun ", description: "A woman who can see future events in her dreams teams up with a prosecutor.", price: 18, imgUrl: "https://asianwiki.com/images/1/1f/While_You_Were_Sleeping-CP1-2.jpg" , isLiked: false },
    { id: 13, name: "Moon Lovers: Scarlet Heart Ryeo", author: "Tong Hua", description: "A modern woman is transported back to the Goryeo era.", price: 22, imgUrl: "https://kpopmarket.co/cdn/shop/files/3_62bdc299-309b-4fce-a3e0-85206e4a66f5_1024x1024.jpg?v=1723620721", isLiked: false },
    { id: 14, name: "Doctor Stranger", author: "Park Jin Woo", description: "A genius surgeon escapes North Korea and struggles to find his place in South Korea.", price: 19, imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMbBCAj447qU15GeBXV4r7rDQC_SqI1SDIdQ&s", isLiked: false },
    { id: 15, name: "The King: Eternal Monarch", author: "Kim Eun Sook", description: "A Korean emperor travels to a parallel universe to save his kingdom.", price: 24, imgUrl: "https://i5.walmartimages.com/seo/The-King-Eternal-Monarch-Korean-TV-Drama-Boxset-DVD_b0f63a16-f0ba-418d-8203-2eced8f15a50.ef832e1886c25bcae6a768363dba67ff.jpeg", isLiked: false },
    { id: 16, name: "Legend of the Blue Sea", author: "Park Ji Eun", description: "A mermaid ends up in the modern world and falls for a swindler.", price: 22, imgUrl: "https://i.mydramalist.com/BjZj6f.jpg", isLiked: false },
    { id: 17, name: "Extraordinary Attorney Woo", author: "Moon Ji Won", description: "A brilliant lawyer with autism navigates the legal world.", price: 25, imgUrl: "https://m.media-amazon.com/images/I/71qprqdHQdL.jpg" , isLiked: false },
    { id: 18, name: "Alchemy of Souls", author: "Hong Sisters", description: "A fantasy story about mages and their destinies in an ancient kingdom.", price: 23, imgUrl: "https://m.media-amazon.com/images/M/MV5BOGFhNGQzMWUtZWJhNi00NGZiLTg1MjEtMTQzZmU4Njg2MWRhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", isLiked: false },
    { id: 19, name: "Doom at your servise", author: "Im Me Ah Ri", description: "Romance, Fantasy, Comedy, Drama", price: 24, imgUrl: "https://occ-0-90-92.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABZesp954jAZjYNeuPe8vNf9so57nKw6UwjGxVlVW6M4zal38PfO4B2dDpNFFVVuucFtqt6u7CV0ADDAuqyqWpZYJZ6QAN5xxnFhd.jpg?r=cb0", isLiked: false },
    { id: 20, name: "He and She : Inspired quotes by the K-drama , Ill Go to You When the weather is Nice", author:"Noorah Omar", description: "This is an Exotic book which is completely unusual like love books and journals.", price: 30, imgUrl: "https://m.media-amazon.com/images/I/61EZFTONGpS._SL1200_.jpg", isLiked: false },
    { id: 21, name: "The K2", author:"Ji Chang Wook", description: "A highly trained special ops agent goes off the grid after being framed for murder, and is hired as a bodyguard when the powerful and influential father of a troubled girl sees his skills." , price: 30, imgUrl: "https://resizing.flixster.com/zycKMbZB2bqYAE31vstrpxiJoyY=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p13325063_i_v13_af.jpg", isLiked: false },
  ]);

  useEffect(() => {
    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const saveBook = (data: Book) => {
    if (data.id) {
      setBooks(books.map((book) => (book.id === data.id ? data : book)));
    } else {
      setBooks([...books, { ...data, id: books.length + 1}]);
    }
    setSelectedBook(undefined);
    setPage("Books");
  };

  const editBook = (book: Book) => {
    setSelectedBook(book);
    setPage("AddBooks");
  };

  const deleteBook = (id: number) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <CreateContextPro>

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
                    color: i % 3 === 0 ? "#ffd700" : i % 2 === 0 ? "#ff6b6b" : "#74b9ff",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <Header/>
      <div className="container mt-3">
        {page === "Books" && <Carousel />}
        {page === "Books" && (
          <Books
            setBooks={setBooks}
            setPage={setPage}
            setSelectedBook={setSelectedBook}
            editBook={editBook}
            books={books}
            deleteBook={deleteBook}
          />
        )}
        {page === "AddBooks" && (
          <AddBooks
            books={books}
            selectedBook={selectedBook}
            saveBook={saveBook}
            setSelectedBook={setSelectedBook}
          />
        )}
        {page === "AboutUs" && <AboutUs />}
        {page === "BookInfo" && (
          <BookInfo
            deleteBook={deleteBook}
            editBook={editBook}
            setPage={setPage}
            book={selectedBook}
            toggleLike={(id: number) => {
              setBooks((prevBooks) =>
                prevBooks.map((book) =>
                  book.id === id ? { ...book, isLiked: !book.isLiked } : book
                )
              );
            }}
            cart={cart}
            setCart={setCart}
          />
        )}
        {page === "Cart" && <Cart cart={cart} setCart={setCart} />}
        {page === "Books" && selectedBook && (
          <div>
            <AddToCart book={selectedBook} cart={cart} setCart={setCart} />
          </div>
        )}
      </div>
      {page === "Books" && <Footer />}

    </CreateContextPro>
  );
}

export default App;
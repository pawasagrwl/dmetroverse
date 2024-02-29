import { ThemeProvider } from "./context/ThemeContext"; // Adjust the import path as necessary
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { useState } from "react";

function App() {
  const [showFoodFacilities, setShowFoodFacilities] = useState(true);
  const [showRedditPosts, setShowRedditPosts] = useState(true);
  return (
    <ThemeProvider>
      <div className="App">
        <Header
          setShowFoodFacilities={setShowFoodFacilities}
          setShowRedditPosts={setShowRedditPosts}
          showFoodFacilities={showFoodFacilities}
          showRedditPosts={showRedditPosts}
        />
        <Body
          showFoodFacilities={showFoodFacilities}
          showRedditPosts={showRedditPosts}
        />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;

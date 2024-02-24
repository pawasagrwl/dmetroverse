import { ThemeProvider } from './context/ThemeContext'; // Adjust the import path as necessary
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Header />
        <Body />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;

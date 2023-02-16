import { Search } from "./components/Search";
import "./styles/index.scss";

function App() {
  return (
    <>
    <main>
      <img className="logo u-margin-bottom" src="/sky-logo.png" alt="Sky logo" />
      <p className="c-text-lead">Let's Get Started.</p>
    </main>
    <Search />
    </>
  );
}

export default App;

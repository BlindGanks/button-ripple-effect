import "./App.css";
import Button from "./components/Button";
import Ripple from "./components/Ripple";

function App() {
  return (
    <>
      <Button>
        Click me if you love cats! 😼😼
        <Ripple color={"#f99417"} />
      </Button>
    </>
  );
}

export default App;

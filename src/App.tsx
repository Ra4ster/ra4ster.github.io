import "./App.css";
import { useLocation, useNavigate } from "react-router";
import ChoiceSelector from "./components/ChoiceSelector";

const choices = ["Who", "What", "When", "Where", "Why", "How"];

export default function App() {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/+$/, "").toLowerCase();
  const selectedChoice = choices.findIndex(
    (choice) => path === `/${choice.toLowerCase()}`,
  );
  const navigate = useNavigate();
  const handleSelect = (index: number) => {
    navigate(`/${choices[index].toLowerCase()}`);
  };

  return (
    <div className="bg-white min-h-screen min-w-screen flex justify-center items-center mx-auto">
      <div
        id="centergrid"
        className="flex w-[40%] max-h-screen items-center justify-center items-baseline text-black text-4xl p-2"
      >
        <ChoiceSelector
          choices={choices}
          selected={selectedChoice < 0 ? 0 : selectedChoice}
          onSelect={handleSelect}
        />
        <h1 className="">is Jack Rose?</h1>
      </div>
    </div>
  );
}

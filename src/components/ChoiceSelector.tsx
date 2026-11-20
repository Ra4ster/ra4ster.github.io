import { Link } from "react-router";
import { useState, useRef } from "react";
import "./ChoiceSelector.css";

type ChoiceSelectorProps = {
  choices: string[];
  selected: number;
  onSelect: (index: number) => void;
};

type CustomCSSProperties = React.CSSProperties & {
  [key: `--${string}`]: string | number;
};

export default function ChoiceSelector({
  choices,
  selected,
  onSelect,
}: ChoiceSelectorProps) {
  const proper_indices = new Array(choices.length);
  for (let i = 0; i < choices.length; i++) proper_indices[i] = i - selected;

  const positions = proper_indices.map((idx) => idx * 40);
  const opacities = proper_indices.map((idx) =>
    Math.max(0.15, 1 - Math.abs(idx) * 0.25),
  );

  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const lastScrollTime = useRef(0);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (
    <div
      className={`choice-selector ${
        isHovered ? "expanded" : ""
      } ${isScrolling ? "scrolling" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onWheel={(e) => {
        const now = Date.now();
        if (now - lastScrollTime.current < 300) return;

        const direction = Math.sign(e.deltaY);
        if (direction === 0) return;

        const nextIndex = Math.max(
          0,
          Math.min(choices.length - 1, selected + direction),
        );
        if (nextIndex !== selected) {
          onSelect(nextIndex);
          lastScrollTime.current = now;

          setIsScrolling(true);
          if (scrollTimeout.current !== null) {
            clearTimeout(scrollTimeout.current);
          }

          scrollTimeout.current = setTimeout(() => {
            setIsScrolling(false);
          }, 300);
        }
      }}
    >
      {choices.map((choice, i) => (
        <Link
          key={choice}
          to={`/${choices[i].toLowerCase()}`}
          className={`choice-selector__choice ${selected == i ? "selected" : ""}`}
          style={
            {
              "--position": `${positions[i]}px`,
              "--choice-opacity": `${opacities[i]}`,
            } as CustomCSSProperties
          }
        >
          {choice}
        </Link>
      ))}
    </div>
  );
}

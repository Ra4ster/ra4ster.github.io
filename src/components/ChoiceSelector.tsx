import { Link } from "react-router";
import { useRef, useState, useEffect } from "react";
import "./ChoiceSelector.css";

type Choice = {
  label: string;
  path: string;
};

type Props = {
  className?: string;
  choices: Choice[];
  selected: number;
  onSelect: (index: number) => void;
};

export default function ChoiceSelector({
  className = "",
  choices,
  selected,
  onSelect,
}: Props) {
  const [scrolling, setScrolling] = useState(false);
  const lastScroll = useRef(0);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  function handleWheel(e: React.WheelEvent) {
    const now = Date.now();
    if (now - lastScroll.current < 300) return;

    const direction = Math.sign(e.deltaY);
    const next = Math.max(
      0,
      Math.min(choices.length - 1, selected + direction),
    );

    if (!direction || next === selected) return;

    onSelect(next);
    lastScroll.current = now;
    setScrolling(true);

    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setScrolling(false), 300);
  }

  return (
    <div
      className={`choice-selector ${scrolling ? "scrolling" : ""} ${className}`}
      onWheel={handleWheel}
    >
      {choices.map((choice, i) => {
        const offset = i - selected;

        return (
          <Link
            key={choice.label}
            to={choice.path}
            className={`choice-selector__choice ${i === selected ? "selected" : ""}`}
            style={
              {
                "--offset": offset,
                "--choice-opacity": Math.max(0.15, 1 - Math.abs(offset) * 0.25),
              } as React.CSSProperties
            }
          >
            {choice.label}
          </Link>
        );
      })}
    </div>
  );
}

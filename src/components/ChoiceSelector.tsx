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
    const next =
      selected < 0
        ? direction > 0
          ? 0
          : choices.length - 1
        : Math.max(0, Math.min(choices.length - 1, selected + direction));

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
      {selected < 0 && (
        <span className="choice-selector__placeholder" aria-hidden="true">
          ______
        </span>
      )}
      {choices.map((choice, i) => {
        const offset = selected >= 0 ? i - selected : i;
        const opacity =
          selected >= 0
            ? Math.max(0.15, 1 - Math.abs(offset) * 0.25)
            : Math.max(0.2, 1 - i * 0.15);

        return (
          <Link
            key={choice.label}
            to={choice.path}
            className={`choice-selector__choice ${i === selected ? "selected" : ""}`}
            style={
              {
                "--offset": offset,
                "--choice-opacity": opacity,
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

import { useEffect, useState } from "react";

function Hero() {
  const lines = [
    { text: "Hello,", className: "text-pink-400" },
    { text: "My name is Kunal Singh;", className: "text-sky-400" },
    { text: "Welcome,", className: "text-pink-400" },
    { text: "to my <coding/> website:", className: "text-gray-200" },
  ];

  const [currentLine, setCurrentLine] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (currentLine >= lines.length) return;

    if (charIndex < lines[currentLine].text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + lines[currentLine].text[charIndex]);
        setCharIndex(charIndex + 1);
      }, 30);
      return () => clearTimeout(timeout);
    } else {
      const lineTimeout = setTimeout(() => {
        setCurrentLine(currentLine + 1);
        setCurrentText("");
        setCharIndex(0);
      }, 300);
      return () => clearTimeout(lineTimeout);
    }
  }, [charIndex, currentLine]);

  return (
    <div className="font-mono text-3xl md:text-4xl leading-snug text-center">
      {lines.slice(0, currentLine).map((line, i) => (
        <div key={i} className={line.className}>
          {line.text}
        </div>
      ))}

      {currentLine < lines.length && (
        <div className={lines[currentLine].className}>
          {currentText}
          <span className="animate-pulse">|</span>
        </div>
      )}
    </div>
  );
}

export default Hero;

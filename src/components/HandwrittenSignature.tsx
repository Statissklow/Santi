"use client";

import { useEffect, useState } from "react";

interface HandwrittenSignatureProps {
  text?: string;
  className?: string;
}

export default function HandwrittenSignature({
  text = "Tradition durch Innovation",
  className = "",
}: HandwrittenSignatureProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayedText.length < text.length) {
        const delay = 65 + Math.random() * 50;
        timeout = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length + 1));
        }, delay);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 3400);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(text.slice(0, Math.max(0, displayedText.length - 2)));
        }, 30);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(false);
        }, 800);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, text]);

  return (
    <div
      className={`inline-flex items-center select-none ${className}`}
      aria-hidden="true"
    >
      <span className="font-[family-name:var(--font-caveat)] text-2xl sm:text-3xl md:text-4xl text-[#e44c65] tracking-wide font-normal italic drop-shadow-[0_2px_14px_rgba(228,76,101,0.45)]">
        {displayedText}
        <span
          className={`inline-block w-1.5 h-6 ml-1 bg-[#e44c65] rounded-full align-middle transition-opacity duration-150 ${
            displayedText.length === text.length && !isDeleting
              ? "opacity-0"
              : "opacity-80 animate-pulse"
          }`}
        />
      </span>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark((prev) => !prev);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path className="stroke-current" d="M20.394 10.948A9.96 9.96 0 0 1 12 19.995a9.96 9.96 0 0 1-7.394-3.898a.75.75 0 0 0-.294.152A7.487 7.487 0 0 0 2.75 12a7.487 7.487 0 0 0 1.534 5.618.75.75 0 0 0 .382-.075 9.96 9.96 0 0 1 5.038-1.897z" />
        </svg>
      ) : (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {/* sun icon path goes here */}
        </svg>
      )}
    </button>
  );
}
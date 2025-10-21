import React, { useState, useEffect } from "react";
import Header from "./Header";
import BreachChecker from "./BreachChecker";
import PasswordTools from "./PasswordTools";
import SecurityTips from "./SecurityTips";
const Home: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check if user has a preference stored in localStorage
    const savedTheme = localStorage.getItem("theme");
    // Check if user prefers dark mode at OS level
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    return savedTheme === "dark" || (!savedTheme && prefersDark);
  });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Update the document class and localStorage when theme changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <div
      className={`min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200`}
    >
      <Header isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />

      <main className="container mx-auto px-4 py-8 space-y-10">
        <section className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img
              src="/guardly-logo.svg"
              alt="Guardly Logo"
              className="h-20 w-20"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4">GUARDLY</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Monitor and improve your online security posture with our
            comprehensive tools
          </p>
        </section>

        <section className="grid grid-cols-1 gap-10">
          <div className="w-full max-w-5xl mx-auto">
            <BreachChecker />
          </div>

          <div className="w-full max-w-5xl mx-auto">
            <PasswordTools />
          </div>

          <div className="w-full max-w-5xl mx-auto">
            <SecurityTips />
          </div>
        </section>

        <footer className="mt-16 text-center text-gray-500 dark:text-gray-400 text-sm pb-8">
          <p>© {new Date().getFullYear()} GUARDLY</p>
          <p className="mt-2">
            Protecting your digital life with powerful, easy-to-use tools
          </p>
          <div className="mt-3 flex justify-center items-center space-x-4">
            <a
              href="https://ahmed-dev1.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              Personal Website
            </a>
            <a
              href="https://github.com/ahmed86-star"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-blue-500 transition-colors gap-1.5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-github"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
              ahmed86-star
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;

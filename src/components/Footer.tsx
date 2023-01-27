import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="m-auto mt-8 flex w-full max-w-2xl justify-center gap-x-2 border-t py-6 text-center text-sm text-gray-500 dark:border-t-zinc-700">
      Copyright &copy; {year} - <span>Matheus Gomes</span>
    </footer>
  );
};

export default Footer;

import React from "react";
import { Search as SearchIcon } from "lucide-react";

const Search = ({ setSearch }: { setSearch: (search: string) => void }) => {
  const [input, setInput] = React.useState("");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleKey = (event: { key: string }) => {
    document.getElementById("input")?.classList.remove("shake");
    if (event.key === "Enter" && input !== "") {
      setSearch(input.toLowerCase());
    } else if (event.key === "Enter" && input === "") {
      document.getElementById("input")?.classList.add("shake");
      setTimeout(() => {
        document.getElementById("input")?.classList.remove("shake");
      }, 600);
    }
  };

  const handleBtn = () => {
    if (input != "") {
      setSearch(input.toLowerCase());
    } else {
      document.getElementById("input")?.classList.add("shake");
      setTimeout(() => {
        document.getElementById("input")?.classList.remove("shake");
      }, 600);
    }
  };

  return (
    <div
      id="input"
      className="m-auto flex w-full max-w-2xl items-center justify-between rounded-xl border bg-[#fafafa] py-2 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white"
    >
      <SearchIcon
        size={25}
        className="ml-4 hidden text-gray-500 dark:text-white sm:block"
      />
      <input
        type="text"
        placeholder="Digite o nome de um usuário"
        value={input}
        onChange={handleInput}
        onKeyDown={handleKey}
        className="w-[80%] border-none bg-[#fafafa] px-4 py-2 outline-none dark:bg-zinc-700 dark:text-white"
      />
      <button
        type="button"
        title="Pesquise o nome de um usuário aqui"
        className="mr-4 rounded-xl bg-white py-2 px-4 shadow dark:bg-zinc-800"
        onClick={handleBtn}
      >
        <span className="hidden sm:block">Pesquisar</span>
        <SearchIcon
          size={25}
          className="text-gray-500 dark:text-white sm:hidden"
        />
      </button>
    </div>
  );
};

export default Search;

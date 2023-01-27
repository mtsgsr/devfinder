import React from "react";
import { Building2, Link, MapPin, Twitter } from "lucide-react";

interface User {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  location: string;
  html_url: string;
  company: string;
  blog: string;
  twitter_username: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

const Card = ({ search }: { search: string }) => {
  const [user, setUser] = React.useState<User>();
  const [error, setError] = React.useState("");
  let date;

  if (user) {
    date = new Date(user.created_at);
  }

  const fetchUser = async (url: string) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setUser(json);
      if (response.status === 403) {
        setError(
          "Limite de pesquisa excedido. Aguarde 1 hora e tente novamente."
        );
      } else if (response.status === 404) {
        setError("Usuário não encontrado.");
      } else {
        setError(response.statusText);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  React.useEffect(() => {
    if (search.length > 0) {
      fetchUser(`https://api.github.com/users/${search}`);
    }
  }, [search]);

  if (error !== "")
    return <div className="m-auto mt-4 max-w-2xl text-center">{error}</div>;

  return (
    <main>
      {user && (
        <section className="m-auto mt-4 grid w-full max-w-2xl grid-cols-[125px,_1fr] grid-rows-[fit-content,_0.5fr,_0.5fr,_1fr] gap-y-6 rounded-xl border bg-[#fafafa] p-4 dark:border-zinc-600 dark:bg-zinc-700  md:grid-rows-[70px,_0.5fr,_0.5fr,_1fr] md:p-8">
          {user.avatar_url && (
            <img
              src={user.avatar_url}
              alt="Avatar"
              className="w-4/5 rounded-full"
            />
          )}
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="flex flex-col">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <a
                href={user.html_url}
                target="_blank"
                className="text-gray-500 dark:text-lime-400"
              >
                @{user.login}
              </a>
            </div>
            <p>
              {`Entrou em ${date?.toLocaleDateString()}` || "Dado indisponível"}
            </p>
          </div>
          <p className="col-span-2 row-start-2 md:col-start-2 md:mb-4">
            {user.bio || "Este perfil não possui biografia."}
          </p>
          <div className="col-span-2 row-start-3 flex flex-wrap justify-between rounded-xl bg-white p-4 shadow dark:bg-zinc-800 md:col-start-2">
            <div className="text-center">
              <p className="text-sm sm:text-base">Repositórios</p>
              <span className="font-bold dark:text-lime-400 md:text-lg">
                {user.public_repos}
              </span>
            </div>
            <div className="text-center">
              <p className="text-sm sm:text-base">Seguidores</p>
              <span className="font-bold dark:text-lime-400 md:text-lg">
                {user.followers}
              </span>
            </div>
            <div className="text-center">
              <p className="text-sm sm:text-base">Seguindo</p>
              <span className="font-bold dark:text-lime-400 md:text-lg">
                {user.following}
              </span>
            </div>
          </div>
          <div className="col-span-2 row-start-4 flex flex-col md:col-start-2">
            <div className="mt-4 grid grid-cols-1 gap-y-4 sm:grid-cols-[repeat(2,minmax(max-content,_1fr))]">
              <div className="grid gap-4 md:gap-2">
                <p className="flex items-center gap-x-2 text-sm sm:text-base">
                  <MapPin size={20} />
                  {user.location || "Não disponível"}
                </p>
                <p className="flex items-center gap-x-2 text-sm sm:text-base">
                  <Building2 size={20} />
                  {user.company || "Não disponível"}
                </p>
              </div>
              <div className="grid gap-4 md:gap-2">
                <a
                  href={
                    user.twitter_username
                      ? `https://twitter.com/${user.twitter_username}`
                      : undefined
                  }
                  target="_blank"
                  className="flex items-center gap-x-2 text-sm sm:text-base"
                >
                  <Twitter size={20} />
                  {user.twitter_username || "Não disponível"}
                </a>
                <a
                  href={user.blog ? user.blog : undefined}
                  target="_blank"
                  className="flex items-center gap-x-2 text-sm sm:text-base"
                >
                  <Link size={20} />
                  {user.blog || "Não disponível"}
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default Card;

// Error404.tsx
import React from "react";
import { Link } from "react-router-dom";

interface Error404Props {
  msg: string;
}

export const Error404: React.FC<Error404Props> = ({ msg }) => {
  return (
    <div className="flex flex-col items-center justify-center m-64 text-center">
      <h1 className="text-4xl font-bold mb-4">Error 404</h1>
      <p className="text-xl text-accent-1 font-bold">{msg}</p>
      <Link
        to="/"
        className="mt-6 font-bold text-xl py-3 px-6 bg-gradient-to-br shadow-xl from-color-text_light/50 via-color-text_light  to-color-text_light/50 text-accent-3 rounded-xl transition-all ease-in-out duration-300
             hover:bg-gradient-to-tr hover:from-color-text_light/50
             hover:via-color-text_light hover:to-color-text_light/50 hover:border-4 hoverscale-110"
      >
        See All Movies
      </Link>
    </div>
  );
};

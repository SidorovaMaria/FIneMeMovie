import { useState, useEffect } from "react";
import { Budget, Trailer } from "../components/Films/filmsSlice";
interface BudgetCountryProps {
  budget: Budget; // The prop is typed to be a `Budget`
}

interface ShowTrailerProps {
  trailer: Trailer;
}
export const BudgetCountry: React.FC<BudgetCountryProps> = ({ budget }) => {
  if (budget.type == "BUDGET") {
    return;
  }
  const collectedFrom = (type: string) => {
    if (type === "WORLD") {
      return <p>Мире</p>;
    } else if (type === "USA") {
      return <p> Америке</p>;
    } else if (type === "RUS") {
      return <p>России</p>;
    } else if (type === "BUDHET") {
      return;
    }
  };

  return (
    <div>
      <h4 className="font-semibold text-lightestBlue text-lg text-right">
        {collectedFrom(budget.type)}
      </h4>
      <p className="text-accent-1 font-bold text-sm text-end tracking-wider">
        {budget.amount.toLocaleString("en-US")}
        {budget.symbol}
      </p>
    </div>
  ); // Access budget properties here
};

export const ShowTrailer: React.FC<ShowTrailerProps> = ({ trailer }) => {
  const extractVideoId = trailer.url.match("(?:/v/|[?&]v=)([a-zA-Z0-9_-]+)");
  const videoId = extractVideoId ? extractVideoId[1] : null;

  const [isVideoAvailable, setIsVideoAvailable] = useState(false);
  const checkVideoAvailability = async (id: string | null) => {
    if (!id) return setIsVideoAvailable(false);
    try {
      // Using oEmbed API to check if the video is available
      const response = await fetch(
        ` https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`
      );

      if (response.status === 200) {
        setIsVideoAvailable(true);
      } else if (response.status === 404 || response.status === 403) {
        setIsVideoAvailable(false);
      } else {
        setIsVideoAvailable(false);
      }
    } catch (error) {
      setIsVideoAvailable(false);
    }
  };
  useEffect(() => {
    checkVideoAvailability(String(videoId));
  }, [trailer.url]);

  return (
    <div className="text-white font-bold text-lg">
      {isVideoAvailable ? (
        <div>
          <iframe
            width="300"
            height="auto"
            src={trailer.url.replace("watch?v=", "embed/")}
            title="YouTube Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <h2>{trailer.name}</h2>
        </div>
      ) : null}
    </div>
  );
};

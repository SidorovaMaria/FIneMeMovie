import { Budget } from "../components/Films/filmsSlice";
interface BudgetCountryProps {
  budget: Budget; // The prop is typed to be a `Budget`
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

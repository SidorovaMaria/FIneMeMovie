// if (filmPageStatus === "pending") {
//     return (
//       <div>
//         <Loading />
//       </div>
//     );
//   }

import { useAppSelector } from "../utils/hook";
export const FooterSmall = () => {
  const filmPageStatus = useAppSelector((state) => state.films.filmPageStatus);
  if (filmPageStatus === "pending") {
    return;
  }
  return (
    <div>
      F
      <footer className="z-20 w-full text-center p-4 bg-accent-2 border-t-4 border-accent-1 shadow md:flex md:items-center md:justify-between md:p-6 ">
        <span className="text-sm text-white/60  sm:text-center ">
          © 2024{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Maria Sidorova
          </a>{" "}
          All Rights Reserved. Test Project for Bokus
        </span>
        <ul className="flex flex-wrap items-center text-sm font- tracking-wide justify-center mt-4 md:mt-0">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              About Bokus
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Privacy Policy
            </a>
          </li>

          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

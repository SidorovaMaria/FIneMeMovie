export const FooterSmall = () => {
  return (
    <div>
      F
      <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-accent-2 border-t-4 border-accent-1 shadow md:flex md:items-center md:justify-between md:p-6 ">
        <span className="text-sm text-white/60  sm:text-center ">
          © 2024{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Maria Sidorova
          </a>{" "}
          All Rights Reserved. Test Project for Bokus
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500  sm:mt-0">
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

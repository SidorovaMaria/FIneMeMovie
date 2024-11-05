const NavBar = () => {
  return (
    <section className="px-10  py-10 bg-gradient-to-b rounded-b-2xl shadow-xl shadow-accent-2  bg-[#1e1d23]">
      {/* Logo  */}
      <div className="flex flex-col items-center gap-2  ">
        <h1 className="font-fancy text-4xl tracking-wide text-accent-1 ">
          FindMeMovies
        </h1>
      </div>
    </section>
  );
};

export default NavBar;

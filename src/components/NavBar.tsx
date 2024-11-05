const NavBar = () => {
  return (
    <section className="px-10  py-10 bg-gradient-to-b rounded-b-2xl shadow-xl shadow-accent-2  bg-[#1e1d23]">
      {/* Logo  */}
      <div className="flex flex-col items-center gap-2  ">
        <h1 className="font-fancy text-4xl tracking-wide text-accent-1 ">
          FindMeMovies
        </h1>
        <p className="text-base font-bold  text-center max-w-[60%]  ">
          Добро пожаловать в мир кино! Исследуйте захватывающие фильмы, узнай их
          рейтинги и наслаждайтесь увлекательными трейлерами. Погружайтесь в
          захватывающие истории и откройте для себя свои любимые фильмы!
        </p>
      </div>
    </section>
  );
};

export default NavBar;

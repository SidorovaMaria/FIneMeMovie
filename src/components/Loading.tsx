const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-start  text-center text-accent-2 p-20">
      <div className="w-20 h-20 border-8 border-accent-1 border-t-accent-3 rounded-full animate-spin mb-4"></div>
      <p className="text-2xl tracking-widest font-extrabold">
        Getting your film
      </p>
    </div>
  );
};

export default Loading;

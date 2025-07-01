const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="flex w-full flex-col">
        <div className="relative w-full h-96">

          <div className="absolute top-0  right-65 w-72 h-72 bg-primary/40 rounded-full animate-blob "></div>
          <div className="absolute top-32 right-20 w-96 h-96 bg-secondary/30 rounded-full animate-blob"></div>
          <div className="absolute top-40 left-50 w-54 h-54 bg-accent/40 rounded-full animate-blob "></div>

        </div>

        <div className="divider"></div>

        <div className="grid h-20 place-items-center">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-base-content/60">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};


export default AuthImagePattern;

const CherryFlowerLogo = () => {
  return (
    <div className="w-12 h-12 bg-base-200 rounded-lg flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 stroke-primary"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        {/* Center circle */}
        <circle cx="12" cy="12" r="2" />
        
        {/* Petals */}
        <path d="M12 4c1 2 3 2 3 4 0 1-1 2-3 2s-3-1-3-2c0-2 2-2 3-4z" />
        <path d="M12 20c-1-2-3-2-3-4 0-1 1-2 3-2s3 1 3 2c0 2-2 2-3 4z" />
        <path d="M4 12c2-1 2-3 4-3 1 0 2 1 2 3s-1 3-2 3c-2 0-2-2-4-3z" />
        <path d="M20 12c-2 1-2 3-4 3-1 0-2-1-2-3s1-3 2-3c2 0 2 2 4 3z" />
      </svg>
    </div>
  );
};

export default CherryFlowerLogo;

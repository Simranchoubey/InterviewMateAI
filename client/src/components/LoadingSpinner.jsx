const LoadingSpinner = ({ size = 'md', text = '' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-10 h-10 border-2',
    lg: 'w-16 h-16 border-3'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className={`${sizeClasses[size]} border-gold/10 rounded-full absolute inset-0`}></div>
        <div className={`${sizeClasses[size]} border-gold border-t-transparent rounded-full animate-spin relative z-10 shadow-[0_0_15px_rgba(250,204,21,0.3)]`}></div>
      </div>
      {text && <p className="text-gold text-[10px] font-bold uppercase tracking-[0.3em] animate-pulse">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
const SkeletonCard = ({ className = '' }) => (
  <div className={`bg-surface border border-white/5 rounded-3xl p-8 animate-pulse ${className}`}>
    <div className="flex items-center space-x-6 mb-8">
      <div className="w-14 h-14 bg-white/5 rounded-2xl"></div>
      <div className="flex-1">
        <div className="h-4 bg-white/5 rounded w-3/4 mb-3"></div>
        <div className="h-3 bg-white/5 rounded w-1/2"></div>
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-3 bg-white/5 rounded w-full"></div>
      <div className="h-3 bg-white/5 rounded w-5/6"></div>
      <div className="h-3 bg-white/5 rounded w-4/6"></div>
    </div>
  </div>
);

export const SkeletonText = ({ lines = 3, className = '' }) => (
  <div className={`space-y-4 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} className="h-3 bg-white/5 rounded animate-pulse" style={{ width: `${100 - (i * 10)}%` }}></div>
    ))}
  </div>
);

export default SkeletonCard;
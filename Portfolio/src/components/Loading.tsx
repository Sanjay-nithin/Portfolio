import { useEffect, useState } from "react";

interface LoadingProps {
  onComplete: () => void;
}

const Loading = ({ onComplete }: LoadingProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900">
      <div className="text-center relative">
        
        {/* Elegant center ring with soft gradient */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-gradient-to-r from-violet-500 via-blue-500 to-purple-600 animate-spin-slow"
               style={{ boxShadow: '0 0 20px rgba(100,100,255,0.3)' }} />
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-violet-600 to-blue-800 shadow-inner" />
        </div>

        {/* Loading text */}
        <h2 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-violet-400 via-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
          Loading Portfolio
        </h2>
        <p className="text-violet-300/80 font-light mb-6">
          Please wait a moment...
        </p>

        {/* Progress bar */}
        <div className="w-64 mx-auto mb-4">
          <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 via-blue-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${progress}%`,
                boxShadow: '0 0 10px rgba(100,100,255,0.5)',
              }}
            />
          </div>
          <div className="text-center mt-2">
            <span className="text-violet-200 text-sm font-medium">{progress}% Complete</span>
          </div>
        </div>
      </div>

      {/* Optional: subtle background pulse */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-violet-500/5 via-transparent to-transparent animate-pulse" />
      </div>
    </div>
  );
};

export default Loading;

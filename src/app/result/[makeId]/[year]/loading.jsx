export default function Loading() {
    return (
      <div className="flex flex-col min-h-screen justify-center items-center text-2xl">
        <div className="animate-pulse space-y-4">
          <div className="w-64 h-8 bg-gray-300 rounded"></div>
          <div className="w-64 h-8 bg-gray-300 rounded"></div>
          <div className="w-64 h-8 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }
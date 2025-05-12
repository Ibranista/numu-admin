export default function MatchLoadingSkeleton() {
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="h-6 bg-purple-200 rounded w-3/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-green-200 rounded w-1/4 mt-4"></div>
            <ul className="ml-4 list-disc">
              <li className="h-4 bg-gray-200 rounded w-16 mt-2"></li>
            </ul>
          </div>
        </div>

        <div>
          <div className="h-6 bg-purple-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-4 h-[400px] overflow-y-auto pr-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-blue-50 p-4 rounded-lg flex items-center justify-between"
              >
                <div>
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-3 bg-gray-100 rounded w-40"></div>
                </div>
                <div className="h-8 w-20 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

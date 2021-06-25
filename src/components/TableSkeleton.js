const TableSkeleton = ({ rows = 10, cols = 10 }) => (
  <div className="rounded-md space-y-6 animate-pulse">
    <span className="h-20 w-full rounded-md block bg-gray-200" />
    <div className="space-y-4">
      {/* Rows */}
      {[...new Array(rows)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          {/* Columns */}
          {[...new Array(cols)].map((_, i) => (
            <span
              key={i}
              className="h-12 w-full rounded-md block bg-gray-200"
            />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default TableSkeleton;

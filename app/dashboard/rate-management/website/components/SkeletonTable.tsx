export function SkeletonTable({ cols, rows }: { cols: number; rows: number }) {
  return (
    <div className="p-6 space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: cols }).map((_, j) => (
            <div
              key={j}
              className="h-8 flex-1 animate-pulse rounded-lg bg-gray-100"
              style={{ animationDelay: `${j * 80}ms` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

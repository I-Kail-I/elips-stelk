import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface Column<T> {
  header: React.ReactNode;
  accessor: (item: T) => React.ReactNode;
  className?: string;
}

export function AdminTable<T>({
  columns,
  data,
  isLoading,
  error,
}: {
  columns: Column<T>[];
  data: T[] | undefined;
  isLoading: boolean;
  error?: Error | null;
}) {
  if (isLoading) return <TableSkeleton columns={columns.length} />;
  if (error) {
    return (
      <div className="border-border flex flex-col items-center rounded-xl border-2 border-red-400/50 bg-red-50/50 p-8 text-center dark:bg-red-950/20">
        <p className="text-sm font-semibold text-red-600 dark:text-red-400">
          {error.message ?? 'Gagal ambil data'}
        </p>
      </div>
    );
  }
  if (!data || data.length === 0) {
    return (
      <div className="border-border bg-card flex flex-col items-center rounded-xl border-2 p-8 text-center">
        <p className="text-muted-foreground text-sm">Kosong nih.</p>
      </div>
    );
  }

  return (
    <div className="border-border overflow-hidden rounded-xl border-2">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted border-border border-b-2">
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={cn(
                    'px-4 py-3 text-left text-xs font-bold tracking-wider uppercase',
                    col.className,
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIdx) => (
              <tr
                key={rowIdx}
                className="border-border hover:bg-muted/50 border-b transition-colors last:border-b-0"
              >
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className={cn('px-4 py-3', col.className)}>
                    {col.accessor(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TableSkeleton({ columns }: { columns: number }) {
  return (
    <div className="border-border overflow-hidden rounded-xl border-2">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted border-border border-b-2">
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} className="px-4 py-3 text-left">
                  <Skeleton className="h-3 w-20" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, row) => (
              <tr key={row} className="border-border border-b">
                {Array.from({ length: columns }).map((_, col) => (
                  <td key={col} className="px-4 py-3">
                    <Skeleton className="h-4 w-full" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

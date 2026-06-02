import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';
import { cn } from '@/lib/utils';
import { Skeleton } from './skeleton';

type ReusableTableSkeletonProps = {
  columns: number | Array<{ id: string; show?: boolean }>;
  rows?: number;
  tableTitle?: React.ReactNode;
  showPagination?: boolean;
  className?: string;
};

export function ReusableTableSkeleton({
  columns,
  rows = 5,
  tableTitle,
  showPagination = false,
  className,
}: ReusableTableSkeletonProps) {
  // Calculate number of visible columns
  const columnCount =
    typeof columns === 'number'
      ? columns
      : columns.filter(col => col.show !== false).length;

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-border bg-card',
        className
      )}
    >
      <div>
        {tableTitle && (
          <div className='w-auto min-w-fit border-b border-border bg-card p-5'>
            {tableTitle}
          </div>
        )}
        <Table>
          <TableHeader className='bg-muted/35'>
            <TableRow>
              {Array.from({ length: columnCount }).map((_, index) => (
                <TableHead
                  key={index}
                  className={cn('px-5 py-5', tableTitle && 'border-t')}
                >
                  <Skeleton className='h-4 w-20' />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <TableRow key={rowIndex} className='bg-card'>
                {Array.from({ length: columnCount }).map((_, colIndex) => (
                  <TableCell key={colIndex} className='px-5 py-3.5'>
                    <Skeleton className='h-4 w-full' />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {showPagination && (
        <div className='flex items-center justify-between border-t border-border bg-muted/35 px-5 py-4'>
          <Skeleton className='h-4 w-32' />
          <div className='flex items-center gap-2'>
            <Skeleton className='h-9 w-9' />
            <Skeleton className='h-9 w-9' />
            <Skeleton className='h-9 w-9' />
            <Skeleton className='h-9 w-9' />
          </div>
        </div>
      )}
    </div>
  );
}

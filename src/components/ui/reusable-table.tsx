import { useEffect, useMemo, useRef } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';
import ReusablePagination, { consumeTableScroll } from './reusable-pagination';
import { cn } from '@/lib/utils';

type Columns = {
  id: string;
  label: string;
  align?: 'left' | 'right' | 'center';
  renderCell?: (row: any) => void;
  renderData?: (row: any) => void;
  show?: boolean;
};

type ReusableTableProps = {
  columns: Columns[];
  rows: any[];
  currentPage?: number | undefined;
  totalPages?: number | undefined;
  totalItems?: number | undefined;
  itemsPerPage?: number | undefined;
  tableTitle?: React.ReactNode;
  onRowClick?: (row: any) => void;
};

export function ReusableTable({
  columns,
  rows,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  tableTitle,
  onRowClick,
}: ReusableTableProps) {
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!consumeTableScroll()) return;
    const el = tableRef.current;
    if (!el) return;
    let parent = el.parentElement;
    while (parent) {
      const overflowY = window.getComputedStyle(parent).overflowY;
      if (
        (overflowY === 'auto' || overflowY === 'scroll') &&
        parent.scrollHeight > parent.clientHeight
      ) {
        const offset =
          el.getBoundingClientRect().top -
          parent.getBoundingClientRect().top +
          parent.scrollTop;
        parent.scrollTo({ top: offset, behavior: 'smooth' });
        return;
      }
      parent = parent.parentElement;
    }
  }, [rows]);

  const filteredColumns = useMemo(() => {
    return columns.filter(column => column.show || column.show === undefined);
  }, [columns]);

  return (
    <div
      ref={tableRef}
      className={cn('overflow-hidden rounded-xl border border-border bg-card')}
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
              {filteredColumns.map(column => {
                const alignClass =
                  column.align === 'right'
                    ? 'text-right'
                    : column.align === 'center'
                      ? 'text-center'
                      : 'text-left';
                return (
                  <TableHead
                    key={column.id}
                    className={cn(
                      alignClass,
                      'px-5 py-5',
                      tableTitle && 'border-t'
                    )}
                  >
                    {column.label}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows?.map(row => {
              return (
                <TableRow
                key={row.id}
                className={cn('bg-card hover:bg-muted/50', onRowClick && 'cursor-pointer')}
                onClick={() => onRowClick?.(row)}
              >
                  {filteredColumns.map(column => {
                    const alignClass =
                      column.align === 'right'
                        ? 'text-right'
                        : column.align === 'center'
                          ? 'text-center'
                          : 'text-left';
                    return (
                      <TableCell
                        key={column.id}
                        className={cn(alignClass, 'px-5 py-3.5')}
                      >
                        {renderCell(column, row)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {currentPage !== undefined && totalPages !== undefined ? (
        <ReusablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
        />
      ) : null}
    </div>
  );
}

function renderCell(column: Columns, row: any) {
  if (typeof column.renderCell === 'function') {
    return column.renderCell(column.id === 'menu' ? row : row[column.id]);
  }

  if (typeof column.renderData === 'function') {
    return column.renderData(row);
  }

  return row[column.id];
}

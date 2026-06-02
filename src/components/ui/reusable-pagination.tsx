'use client';

let pendingTableScroll = false;
export const requestTableScroll = () => {
  pendingTableScroll = true;
};
export const consumeTableScroll = () => {
  const val = pendingTableScroll;
  pendingTableScroll = false;
  return val;
};

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './pagination';
import useFilterHandler from '@/hooks/use-filter-handler';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  itemsPerPage?: number;
}

export default function ReusablePagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage = 5,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const { filterHandler } = useFilterHandler();

  // Calculate showing range
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems ?? 0);

  return (
    <div className='flex items-center justify-between border-t border-border bg-muted/35 p-5'>
      <div className='w-full text-sm text-muted-foreground'>
        {totalItems !== undefined
          ? `Showing ${startItem} to ${endItem} of ${totalItems} entries`
          : null}
      </div>
      <Pagination className='flex justify-end'>
        <PaginationContent className='gap-2.5'>
          <PaginationItem>
            <button
              onClick={() => {
                requestTableScroll();
                filterHandler({ page: currentPage - 1 });
              }}
              disabled={currentPage === 1}
            >
              <PaginationPrevious disabled={currentPage === 1} />
            </button>
          </PaginationItem>

          <div className='flex items-center gap-1.5'>
            {pages.map(page => (
              <PaginationItem key={page}>
                <button
                  onClick={() => {
                    requestTableScroll();
                    filterHandler({ page: page.toString() });
                  }}
                >
                  <PaginationLink isActive={page === currentPage}>
                    {page}
                  </PaginationLink>
                </button>
              </PaginationItem>
            ))}
          </div>

          <PaginationItem>
            <button
              onClick={() => {
                requestTableScroll();
                filterHandler({ page: currentPage + 1 });
              }}
              disabled={currentPage === totalPages}
            >
              <PaginationNext disabled={currentPage === totalPages} />
            </button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

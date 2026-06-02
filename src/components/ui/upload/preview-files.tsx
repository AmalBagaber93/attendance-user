import { DownloadIcon, X } from 'lucide-react';
import { FileThumbnail } from './file-thumbnail';
import { fData } from '@/lib/format-number';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';

export function PreviewFiles({
  files,
  onRemove,
  canRemove = true,
}: {
  files: File[];
  onRemove: (file: File, idx: number) => void;
  canRemove?: boolean;
}) {
  return (
    <div className='flex flex-col gap-2.5 mt-5'>
      {files.map((file, idx) => (
        <PreviewFile
          idx={idx}
          key={file.name}
          file={file}
          onRemove={onRemove}
          canRemove={canRemove}
        />
      ))}
    </div>
  );
}

export function PreviewFile({
  file,
  onRemove,
  idx,
  containerClassName = '',
  canRemove = true,
}: {
  file: any;
  onRemove?: (file: File, idx: number) => void;
  idx?: number;
  containerClassName?: string;
  canRemove?: boolean;
}) {
  return (
    <div className={cn('flex gap-2 h-14 w-full', containerClassName)}>
      <div className='flex justify-between flex-1 border border-border rounded-xl p-2.5'>
        <div
          className={cn(
            'flex items-center gap-3.5',
            file?.url && 'cursor-pointer'
          )}
          onClick={() => {
            if (file?.url) {
              window.open(file.url, '_blank');
            }
          }}
        >
          <FileThumbnail file={file} />
          <div className='flex flex-col'>
            <p className='text-sm font-[500]'>{file.name}</p>
            <p className='text-sm text-muted-foreground'>{fData(file.size)}</p>
          </div>
        </div>
        {canRemove && onRemove && typeof idx === 'number' && (
          <button
            className='hover:opacity-50'
            onClick={() => {
              onRemove(file, idx);
            }}
          >
            <X size={18} />
          </button>
        )}
      </div>
      {file?.url && (
        <Link href={file?.url} target='_blank'>
          <div className='border border-border hover:border-border/50 rounded-xl p-2.5 w-14 h-full flex items-center justify-center'>
            <DownloadIcon />
          </div>
        </Link>
      )}
    </div>
  );
}

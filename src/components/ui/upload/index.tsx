import { useTranslations } from 'next-intl';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { UploadIcon } from '@/components/icons/upload-icon';
import { PreviewFiles } from './preview-files';
import { useFormContext } from 'react-hook-form';
import { FormMessage } from '../form';
import { cn } from '@/lib/utils';
import { Button } from '../button';
import { Spinner } from '../spinner';

function formatMimeTypesForDisplay(mimeTypes: string[]): string {
  const mimeToDisplay: Record<string, string> = {
    'application/pdf': 'PDF',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      'DOCX',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      'PPTX',
    'application/msword': 'DOC',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
    'application/vnd.ms-excel': 'XLS',
    'application/zip': 'ZIP',
    'application/x-rar-compressed': 'RAR',
    'image/png': 'PNG',
    'image/jpeg': 'JPG',
    'image/jpg': 'JPG',
    'image/gif': 'GIF',
  };

  const formatted = mimeTypes
    .map(mime => mimeToDisplay[mime] || mime.split('/').pop()?.toUpperCase())
    .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates

  return formatted.join(', ');
}

type UploadProps = {
  files: File[];
  name: string;
  hasError?: boolean;
  canRemove?: boolean;
  removeFunc?: (file: File, idx: number) => void;
  maxSizeMb?: number;
  acceptedTypes?: string[];
  isUploading?: boolean;
} & DropzoneOptions;

export function Upload({
  name,
  files,
  hasError,
  canRemove = true,
  removeFunc,
  maxSizeMb = 10,
  acceptedTypes = [],
  isUploading,
  ...dropzoneProps
}: UploadProps) {
  const t = useTranslations();

  const { setValue } = useFormContext();

  const { getRootProps, getInputProps } = useDropzone({
    ...dropzoneProps,
    disabled: dropzoneProps.disabled ?? isUploading,
  });

  const onRemove = (file: File, idx: number) => {
    const filesArray = Array.isArray(files) ? files : [];
    const filesFiltered = filesArray.filter((_, index) => index !== idx);

    setValue(name, filesFiltered);

    if (removeFunc) {
      removeFunc(file, idx);
    }
  };

  const renderPlaceholder = (
    <div
      className={cn(
        'flex flex-col gap-2 items-center justify-center rounded-xl p-8 border',
        hasError && 'border-destructive border',
        (dropzoneProps.disabled || isUploading) &&
          'opacity-60 cursor-not-allowed'
      )}
    >
      <UploadIcon />
      <p className='font-medium text-lg'>
        {t('Common.drag_and_drop_the_file_here')}
      </p>
      <p className='text-muted-foreground sm:w-2/3 md:w-1/2 text-center'>
        {t('Common.the_maximum_size', {
          maxSize: maxSizeMb.toString(),
        })}{' '}
        {t('Common.accepted_types', {
          acceptedTypes: formatMimeTypesForDisplay(acceptedTypes),
        })}
      </p>
      <Button
        variant='outline'
        type='button'
        disabled={isUploading}
        className='mt-2.5'
      >
        {isUploading && <Spinner className='mr-2' />}
        {t('Common.browse_files')}
      </Button>
    </div>
  );

  return (
    <div>
      <div {...getRootProps()}>
        {renderPlaceholder}
        <input {...getInputProps()} />
        <FormMessage className='mt-2.5 rtl:text-right ltr:text-left' />
      </div>
      <PreviewFiles files={files} onRemove={onRemove} canRemove={canRemove} />
    </div>
  );
}

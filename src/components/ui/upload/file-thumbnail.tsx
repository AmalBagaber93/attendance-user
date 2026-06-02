import Image from 'next/image';
import { objectUrl } from '@/lib/object-url';
import { fileData, fileFormat, fileThumb } from './utils';

export function FileThumbnail({ file }: { file: any }) {
  const { name = '', path = '', preview = '', size } = fileData(file);

  const isFile = file instanceof File;

  const format = fileFormat(isFile ? path || preview : file?.url);
  const imgUrl = isFile ? objectUrl(file) : file?.url;

  return (
    <Image
      src={format === 'image' ? imgUrl : fileThumb(format)}
      alt=''
      width={32}
      height={32}
    />
  );
}

import { toast } from 'sonner';
import { SuccessIcon } from './icons/success-icon';
import { RejectIcon } from './icons/reject-icon';
import { cn } from '@/lib/utils';

type CustomToastProps = {
  title: string;
  description?: string;
  variant?: 'success' | 'error' | 'info';
};

export function customToast({
  title,
  description,
  variant = 'success',
}: CustomToastProps) {
  const variants = {
    success: {
      icon: <SuccessIcon />,
      bg: 'bg-primary',
    },
    error: {
      icon: <RejectIcon />,
      bg: 'bg-destructive',
    },
  };

  const variantProps = variants[variant as keyof typeof variants];

  return toast.custom(t => (
    <div className='flex'>
      <div
        className={cn('relative w-2.5 h-auto rounded-s-lg', variantProps.bg)}
      />
      <div className='flex justify-between w-[480px] rounded-e-lg bg-card shadow-[0_8px_24px_rgba(0,0,0,0.15)] rtl:font-ibm-arabic py-4 px-4 h-full'>
        <div className='flex items-start gap-3'>
          {variantProps.icon}
          <div>
            <h3 className='text-md font-semibold'> {title}</h3>
            {description && (
              <p className='text-sm text-muted-foreground'>{description}</p>
            )}
          </div>
        </div>
        <button
          onClick={() => toast.dismiss(t)}
          className='ml-4 text-muted-foreground hover:text-foreground mb-5'
        >
          ✕
        </button>
      </div>
    </div>
  ));
}

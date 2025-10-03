interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingSpinner({
  size = 'md',
  className = '',
}: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizes[size]} border-4 border-red-600 border-t-transparent rounded-full animate-spin`}
      />
    </div>
  );
}

import { forwardRef } from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Icon size
   * @default 24
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Additional class name
   */
  className?: string;
}

/**
 * Base icon component
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, color = 'currentColor', children, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        {children}
      </svg>
    );
  }
);

Icon.displayName = 'Icon';

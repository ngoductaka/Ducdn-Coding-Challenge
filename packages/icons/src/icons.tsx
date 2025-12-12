import { forwardRef } from 'react';
import { Icon, IconProps } from './Icon';

/**
 * Check icon
 */
export const CheckIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <polyline points="20 6 9 17 4 12" />
    </Icon>
  );
});

CheckIcon.displayName = 'CheckIcon';

/**
 * X icon
 */
export const XIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </Icon>
  );
});

XIcon.displayName = 'XIcon';

/**
 * Plus icon
 */
export const PlusIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </Icon>
  );
});

PlusIcon.displayName = 'PlusIcon';

/**
 * Minus icon
 */
export const MinusIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
    </Icon>
  );
});

MinusIcon.displayName = 'MinusIcon';

/**
 * ChevronRight icon
 */
export const ChevronRightIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <polyline points="9 18 15 12 9 6" />
    </Icon>
  );
});

ChevronRightIcon.displayName = 'ChevronRightIcon';

/**
 * ChevronLeft icon
 */
export const ChevronLeftIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <polyline points="15 18 9 12 15 6" />
    </Icon>
  );
});

ChevronLeftIcon.displayName = 'ChevronLeftIcon';

/**
 * ChevronDown icon
 */
export const ChevronDownIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <polyline points="6 9 12 15 18 9" />
    </Icon>
  );
});

ChevronDownIcon.displayName = 'ChevronDownIcon';

/**
 * ChevronUp icon
 */
export const ChevronUpIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <polyline points="18 15 12 9 6 15" />
    </Icon>
  );
});

ChevronUpIcon.displayName = 'ChevronUpIcon';

/**
 * Search icon
 */
export const SearchIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </Icon>
  );
});

SearchIcon.displayName = 'SearchIcon';

/**
 * Settings icon
 */
export const SettingsIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v6m0 6v6m5.196-14.196L13.5 8.5m-3 3L6.804 6.804m14.392 5.196H15m-6 0H3m14.196 5.196L13.5 13.5m-3 3L6.804 17.196" />
    </Icon>
  );
});

SettingsIcon.displayName = 'SettingsIcon';

/**
 * Home icon
 */
export const HomeIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </Icon>
  );
});

HomeIcon.displayName = 'HomeIcon';

/**
 * User icon
 */
export const UserIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </Icon>
  );
});

UserIcon.displayName = 'UserIcon';

/**
 * Alert Circle icon
 */
export const AlertCircleIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </Icon>
  );
});

AlertCircleIcon.displayName = 'AlertCircleIcon';

/**
 * Info icon
 */
export const InfoIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </Icon>
  );
});

InfoIcon.displayName = 'InfoIcon';

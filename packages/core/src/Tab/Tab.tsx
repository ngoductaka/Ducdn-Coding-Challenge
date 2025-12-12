import React, { forwardRef, ButtonHTMLAttributes, ReactNode, useState } from 'react';
import * as styles from './Tab.css';
import { clsx } from 'clsx';
import {
  CheckIcon,
  XIcon,
  PlusIcon,
  MinusIcon,
  SearchIcon,
  SettingsIcon,
  HomeIcon,
  UserIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  AlertCircleIcon,
  InfoIcon,
} from '@company/icons';

export interface TabProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /**
   * Label for the tab
   */
  label: string;

  /**
   * Sub-label shown below the main label
   */
  subLabel?: string;

  /**
   * Icon to display before the label (can be string emoji or React node)
   */
  icon?: ReactNode;

  /**
   * Whether to show an action button (close button)
   */
  actionButton?: boolean;

  /**
   * Callback when action button is clicked
   */
  onActionClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Whether the tab is active/selected
   */
  active?: boolean;

  /**
   * Additional class name
   */
  className?: string;

  /**
   * Counter badge value to display
   */
  counter?: number;

  /**
   * Value for the tab (used in Tabs component)
   */
  value?: string;
}

/**
 * Tab component for navigation
 */
const TabComponent = forwardRef<HTMLButtonElement, TabProps>(
  (
    {
      label,
      subLabel,
      icon,
      actionButton = false,
      onActionClick,
      active = false,
      className,
      disabled,
      counter,
      onClick,
      value,
      ...props
    },
    ref
  ) => {
    const handleActionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (onActionClick) {
        onActionClick(e);
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        className={clsx(
          styles.tabButton,
          active && styles.tabActive,
          disabled && styles.tabDisabled,
          className
        )}
        disabled={disabled}
        onClick={onClick}
        role="tab"
        aria-selected={active}
        {...props}
      >
        <div className={styles.tabContent}>
          {icon && <span className={styles.tabIcon}>{icon}</span>}

          <div className={styles.tabLabels}>
            <span className={styles.tabLabel}>{label}</span>
            {subLabel && <span className={styles.tabSubLabel}>{subLabel}</span>}
          </div>

          {counter !== undefined && counter > 0 && (
            <span className={styles.tabCounter}>{counter}</span>
          )}

          {actionButton && (
            <button
              type="button"
              className={styles.tabActionButton}
              onClick={handleActionClick}
              aria-label="Close tab"
              disabled={disabled}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 3L3 9M3 3L9 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>

        {active && <span className={styles.tabIndicator} aria-hidden="true" />}
      </button>
    );
  }
);

TabComponent.displayName = 'Tab';

// Tabs Component Types (similar to Ant Design)
export interface TabItem {
  /**
   * Tab label text
   */
  label: string;

  /**
   * Unique key for the tab
   */
  value: string;

  /**
   * Icon to display
   */
  icon?: ReactNode;

  /**
   * Sub label text
   */
  subLabel?: string;

  /**
   * Whether tab is disabled
   */
  disabled?: boolean;

  /**
   * Counter badge value
   */
  counter?: number;

  /**
   * Whether to show action button
   */
  actionButton?: boolean;
}

export interface TabsProps {
  /**
   * Current active tab key (controlled)
   */
  activeKey?: string;

  /**
   * Default active tab key (uncontrolled)
   */
  defaultActiveKey?: string;

  /**
   * Callback when tab changes
   */
  onChange?: (activeKey: string) => void;

  /**
   * Array of tab items
   */
  items: TabItem[];

  /**
   * Additional class name
   */
  className?: string;

  /**
   * Whether tabs are scrollable
   * @default false
   */
  scrollable?: boolean;

  /**
   * Whether to show add tab button
   * @default false
   */
  addTab?: boolean;

  /**
   * Callback when add tab button is clicked
   */
  onAddTab?: () => void;

  /**
   * Callback when action button (close) is clicked on a tab
   */
  onActionClick?: (value: string, event: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Tabs component for managing a group of Tab components
 * Similar to Ant Design Tabs with items array API
 */
export const Tabs = ({
  activeKey,
  defaultActiveKey,
  onChange,
  items = [],
  className = '',
  scrollable = false,
  addTab = false,
  onAddTab,
  onActionClick,
}: TabsProps) => {
  const [internalActiveKey, setInternalActiveKey] = useState<string | undefined>(defaultActiveKey);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const tabListRef = React.useRef<HTMLDivElement>(null);

  const currentActiveKey = activeKey !== undefined ? activeKey : internalActiveKey;

  const handleTabClick = (value: string) => {
    if (activeKey === undefined) {
      setInternalActiveKey(value);
    }

    if (onChange) {
      onChange(value);
    }
  };

  const handleActionClick = (value: string, event: React.MouseEvent<HTMLButtonElement>) => {
    if (onActionClick) {
      onActionClick(value, event);
    }
  };

  const checkScrollability = () => {
    if (tabListRef.current && scrollable) {
      const { scrollLeft, scrollWidth, clientWidth } = tabListRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (tabListRef.current) {
      tabListRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (tabListRef.current) {
      tabListRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  React.useEffect(() => {
    if (scrollable) {
      checkScrollability();
      window.addEventListener('resize', checkScrollability);
      return () => window.removeEventListener('resize', checkScrollability);
    }
  }, [scrollable, items]);

  React.useEffect(() => {
    if (scrollable && tabListRef.current) {
      const element = tabListRef.current;
      element.addEventListener('scroll', checkScrollability);
      return () => element.removeEventListener('scroll', checkScrollability);
    }
  }, [scrollable]);

  const tabsClasses = clsx(styles.tabsContainer, scrollable && styles.tabsScrollable, className);
  const tabListClasses = clsx(styles.tabList, scrollable && styles.tabListScrollable);

  return (
    <div className={tabsClasses} role="tablist">
      <div className={styles.tabsWrapper}>
        {scrollable && (
          <button
            type="button"
            className={clsx(styles.scrollButton)}
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <ChevronLeftIcon className={styles.iconScrollButton} />
          </button>
        )}

        <div ref={tabListRef} className={tabListClasses}>
          {items.map(item => (
            <Tab
              key={item.value}
              value={item.value}
              label={item.label}
              icon={item.icon}
              subLabel={item.subLabel}
              counter={item.counter}
              active={currentActiveKey === item.value}
              disabled={item.disabled}
              actionButton={item.actionButton}
              onClick={() => handleTabClick(item.value)}
              onActionClick={e => handleActionClick(item.value, e)}
            />
          ))}
          {addTab && (
            <button
              type="button"
              className={styles.addTabButton}
              onClick={onAddTab}
              aria-label="Add tab"
            >
              <PlusIcon className={styles.iconScrollButton} />
            </button>
          )}
        </div>

        {scrollable && (
          <button
            type="button"
            className={clsx(styles.scrollButton, styles.scrollButtonRight)}
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <ChevronRightIcon className={styles.iconScrollButton} />
          </button>
        )}
      </div>
    </div>
  );
};

Tabs.displayName = 'Tabs';

export const Tab = TabComponent;

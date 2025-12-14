import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, XIcon } from '@company/icons';
import { clsx } from 'clsx';
import React, { ButtonHTMLAttributes, forwardRef, ReactNode, useState } from 'react';
import * as styles from './Tab.css';

export interface TabProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  label: string;
  subLabel?: string;
  icon?: ReactNode;
  actionButton?: boolean;
  onActionClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  active?: boolean;
  className?: string;
  counter?: number;
  value?: string;
}

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
          <div className={styles.tabLabels}>
            <div className={styles.tabContent}>
              {icon && <span className={styles.tabIcon}>{icon}</span>}
              <span className={styles.tabLabel}>{label}</span>

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
                  <XIcon className={styles.tabActionIcon} size={12} />
                </button>
              )}
            </div>
            {subLabel && (
              <span className={clsx(styles.tabSubLabel, icon && styles.tabSubLabelWithIcon)}>
                {subLabel}
              </span>
            )}
          </div>
        </div>

        {active && <span className={styles.tabIndicator} aria-hidden="true" />}
      </button>
    );
  }
);

TabComponent.displayName = 'Tab';

export interface TabItem {
  label: string;
  value: string;
  icon?: ReactNode;
  subLabel?: string;
  disabled?: boolean;
  counter?: number;
  actionButton?: boolean;
}

export interface TabsProps {
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (activeKey: string) => void;
  items: TabItem[];
  className?: string;
  scrollable?: boolean;
  addTab?: boolean;
  onAddTab?: () => void;
  onActionClick?: (value: string, event: React.MouseEvent<HTMLButtonElement>) => void;
  scrollLimit?: 'first' | 'last' | 'middle';
}

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
  scrollLimit = 'first',
}: TabsProps) => {
  const [internalActiveKey, setInternalActiveKey] = useState<string | undefined>(defaultActiveKey);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const tabListRef = React.useRef<HTMLDivElement>(null);
  const tabRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());

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

  const scrollToActiveTab = () => {
    if (!tabListRef.current || !scrollable || !currentActiveKey) return;

    const activeTabElement = tabRefs.current.get(currentActiveKey);
    if (!activeTabElement) return;

    const container = tabListRef.current;
    const containerRect = container.getBoundingClientRect();
    const tabRect = activeTabElement.getBoundingClientRect();

    if (scrollLimit === 'middle') {
      // Center the active tab
      const scrollPosition =
        activeTabElement.offsetLeft -
        container.offsetLeft -
        container.clientWidth / 2 +
        activeTabElement.clientWidth / 2;

      container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    } else if (scrollLimit === 'first') {
      // Ensure first tab is visible (scroll left if needed)
      if (tabRect.left < containerRect.left) {
        container.scrollTo({
          left: activeTabElement.offsetLeft - container.offsetLeft,
          behavior: 'smooth',
        });
      }
    } else if (scrollLimit === 'last') {
      // Ensure last tab is visible (scroll right if needed)
      if (tabRect.right > containerRect.right) {
        const scrollPosition =
          activeTabElement.offsetLeft -
          container.offsetLeft -
          container.clientWidth +
          activeTabElement.clientWidth;

        container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      }
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

  const handleAddTab = () => {
    if (onAddTab) {
      onAddTab();
      setTimeout(() => {
        if (tabListRef.current) {
          tabListRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
      }, 100);
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

  React.useEffect(() => {
    scrollToActiveTab();
  }, [currentActiveKey, scrollLimit, scrollable]);

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
              ref={el => {
                if (el) {
                  tabRefs.current.set(item.value, el);
                } else {
                  tabRefs.current.delete(item.value);
                }
              }}
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
              onClick={handleAddTab}
              aria-label="Add tab"
            >
              <PlusIcon size={17} className={styles.iconScrollButton} />
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

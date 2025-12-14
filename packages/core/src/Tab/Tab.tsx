import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, XIcon } from '@company/icons';
import { clsx } from 'clsx';
import React, {
  ButtonHTMLAttributes,
  forwardRef,
  ReactNode,
  useState,
  useEffect,
  useRef,
  useCallback,
  HTMLAttributes,
} from 'react';
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
        tabIndex={active ? 0 : -1}
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
                  tabIndex={-1}
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
  children?: ReactNode;
}

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  activeValue?: string;
  lazy?: boolean;
  forceRender?: boolean;
  children?: ReactNode;
  className?: string;
}

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  (
    { value, activeValue, lazy = false, forceRender = false, children, className, ...props },
    ref
  ) => {
    const isActive = value === activeValue;
    const [hasBeenActive, setHasBeenActive] = useState(!lazy || isActive);

    useEffect(() => {
      if (isActive && !hasBeenActive) {
        setHasBeenActive(true);
      }
    }, [isActive, hasBeenActive]);

    const shouldRender = forceRender || !lazy || hasBeenActive;

    if (!shouldRender) {
      return null;
    }

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`tabpanel-${value}`}
        aria-labelledby={`tab-${value}`}
        hidden={!isActive}
        className={clsx(styles.tabPanel, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabPanel.displayName = 'TabPanel';

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
  scrollLimit?: 'first' | 'last' | 'middle' | 'none';
  keyboardNavigation?: 'auto' | 'manual';
  orientation?: 'horizontal' | 'vertical';
  lazy?: boolean;
  children?: ReactNode;
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
  keyboardNavigation = 'auto',
  orientation = 'horizontal',
  lazy = false,
  children,
}: TabsProps) => {
  const [internalActiveKey, setInternalActiveKey] = useState<string | undefined>(
    defaultActiveKey || (items.length > 0 ? items[0].value : undefined)
  );
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const tabListRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const panelRefs = useRef<Map<string, HTMLDivElement>>(new Map());

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

  const getEnabledTabs = useCallback(() => {
    return items.filter(item => !item.disabled);
  }, [items]);

  const focusTab = useCallback((value: string) => {
    const tabElement = tabRefs.current.get(value);
    if (tabElement) {
      tabElement.focus();
    }
  }, []);

  const activateTab = useCallback(
    (value: string) => {
      if (activeKey === undefined) {
        setInternalActiveKey(value);
      }
      if (onChange) {
        onChange(value);
      }
    },
    [activeKey, onChange]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const enabledTabs = getEnabledTabs();
      if (enabledTabs.length === 0) return;

      const currentIndex = enabledTabs.findIndex(item => item.value === currentActiveKey);
      if (currentIndex === -1) return;

      let nextIndex = currentIndex;
      let shouldPreventDefault = false;

      const isHorizontal = orientation === 'horizontal';
      const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
      const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';

      if (event.key === nextKey) {
        nextIndex = (currentIndex + 1) % enabledTabs.length;
        shouldPreventDefault = true;
      } else if (event.key === prevKey) {
        nextIndex = currentIndex === 0 ? enabledTabs.length - 1 : currentIndex - 1;
        shouldPreventDefault = true;
      } else if (event.key === 'Home') {
        nextIndex = 0;
        shouldPreventDefault = true;
      } else if (event.key === 'End') {
        nextIndex = enabledTabs.length - 1;
        shouldPreventDefault = true;
      }

      if (shouldPreventDefault) {
        event.preventDefault();
        const nextTab = enabledTabs[nextIndex];

        if (keyboardNavigation === 'auto') {
          // Auto mode: arrow keys change selection immediately
          activateTab(nextTab.value);
          focusTab(nextTab.value);
        } else {
          // Manual mode: arrow keys only move focus, Enter/Space activates
          focusTab(nextTab.value);
        }
      }

      // In manual mode, Enter or Space activates the focused tab
      if (keyboardNavigation === 'manual' && (event.key === 'Enter' || event.key === ' ')) {
        const focusedValue = (event.target as HTMLElement).getAttribute('data-value');
        if (focusedValue && focusedValue !== currentActiveKey) {
          event.preventDefault();
          activateTab(focusedValue);
        }
      }
    },
    [currentActiveKey, getEnabledTabs, keyboardNavigation, orientation, activateTab, focusTab]
  );

  const checkScrollability = () => {
    if (tabListRef.current && scrollable && orientation === 'horizontal') {
      const { scrollLeft, scrollWidth, clientWidth } = tabListRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollToActiveTab = () => {
    if (!tabListRef.current || !scrollable || !currentActiveKey || scrollLimit === 'none') return;
    if (orientation !== 'horizontal') return;

    const activeTabElement = tabRefs.current.get(currentActiveKey);
    if (!activeTabElement) return;

    const container = tabListRef.current;
    const containerRect = container.getBoundingClientRect();
    const tabRect = activeTabElement.getBoundingClientRect();

    if (scrollLimit === 'middle') {
      const scrollPosition =
        activeTabElement.offsetLeft -
        container.offsetLeft -
        container.clientWidth / 2 +
        activeTabElement.clientWidth / 2;

      container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    } else if (scrollLimit === 'first') {
      if (tabRect.left < containerRect.left) {
        container.scrollTo({
          left: activeTabElement.offsetLeft - container.offsetLeft,
          behavior: 'smooth',
        });
      }
    } else if (scrollLimit === 'last') {
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

  useEffect(() => {
    if (scrollable && orientation === 'horizontal') {
      checkScrollability();
      window.addEventListener('resize', checkScrollability);
      return () => window.removeEventListener('resize', checkScrollability);
    }
  }, [scrollable, items, orientation]);

  useEffect(() => {
    if (scrollable && tabListRef.current && orientation === 'horizontal') {
      const element = tabListRef.current;
      element.addEventListener('scroll', checkScrollability);
      return () => element.removeEventListener('scroll', checkScrollability);
    }
  }, [scrollable, orientation]);

  useEffect(() => {
    scrollToActiveTab();
  }, [currentActiveKey, scrollLimit, scrollable]);

  const isVertical = orientation === 'vertical';
  const tabsClasses = clsx(
    styles.tabsContainer,
    scrollable && !isVertical && styles.tabsScrollable,
    isVertical && styles.tabsVertical,
    className
  );
  const tabListClasses = clsx(
    styles.tabList,
    scrollable && !isVertical && styles.tabListScrollable,
    isVertical && styles.tabListVertical
  );

  // Render panels from children or items
  const renderPanels = () => {
    if (children) {
      return children;
    }

    return items.map(item => (
      <TabPanel
        key={item.value}
        value={item.value}
        activeValue={currentActiveKey}
        lazy={lazy}
        ref={el => {
          if (el) {
            panelRefs.current.set(item.value, el);
          } else {
            panelRefs.current.delete(item.value);
          }
        }}
      >
        {item.children}
      </TabPanel>
    ));
  };

  return (
    <div className={clsx(styles.tabsRoot, isVertical && styles.tabsRootVertical)}>
      <div className={tabsClasses}>
        <div className={styles.tabsWrapper}>
          {scrollable && !isVertical && (
            <button
              type="button"
              className={clsx(styles.scrollButton)}
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              tabIndex={-1}
            >
              <ChevronLeftIcon className={styles.iconScrollButton} />
            </button>
          )}

          <div
            ref={tabListRef}
            className={tabListClasses}
            role="tablist"
            aria-orientation={orientation}
            onKeyDown={handleKeyDown}
          >
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
                data-value={item.value}
                label={item.label}
                icon={item.icon}
                subLabel={item.subLabel}
                counter={item.counter}
                active={currentActiveKey === item.value}
                disabled={item.disabled}
                actionButton={item.actionButton}
                onClick={() => handleTabClick(item.value)}
                onActionClick={e => handleActionClick(item.value, e)}
                id={`tab-${item.value}`}
                aria-controls={`tabpanel-${item.value}`}
              />
            ))}
            {addTab && (
              <button
                type="button"
                className={styles.addTabButton}
                onClick={handleAddTab}
                aria-label="Add tab"
                tabIndex={-1}
              >
                <PlusIcon size={17} className={styles.iconScrollButton} />
              </button>
            )}
          </div>

          {scrollable && !isVertical && (
            <button
              type="button"
              className={clsx(styles.scrollButton, styles.scrollButtonRight)}
              onClick={scrollRight}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              tabIndex={-1}
            >
              <ChevronRightIcon className={styles.iconScrollButton} />
            </button>
          )}
        </div>
      </div>

      {(children || items.some(item => item.children)) && (
        <div className={styles.tabPanelsContainer}>{renderPanels()}</div>
      )}
    </div>
  );
};

Tabs.displayName = 'Tabs';

export const Tab = TabComponent;

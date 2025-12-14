import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Tab, Tabs } from './Tab';
import { HomeIcon, UserIcon } from '@company/icons';
import { ThemeProvider } from '@company/react';

// Mock the theme classes
jest.mock('@company/tokens', () => ({
  ...jest.requireActual('@company/tokens'),
  lightTheme: 'lightTheme',
  darkTheme: 'darkTheme',
}));

describe('Tab Component', () => {
  describe('Basic Rendering', () => {
    it('should render tab with basic params', () => {
      render(<Tab label="Test Tab" icon={<HomeIcon />} subLabel="Sub Label" counter={5} />);
      expect(screen.getByRole('tab')).toBeInTheDocument();
      expect(screen.getByText('Test Tab')).toBeInTheDocument();
      const tab = screen.getByRole('tab');
      expect(tab.querySelector('svg')).toBeInTheDocument();
      expect(screen.getByText('Sub Label')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });
  });

  describe('Active State', () => {
    it('should apply active class when active prop is true', () => {
      render(<Tab label="Active Tab" active />);
      const tab = screen.getByRole('tab');
      expect(tab).toHaveAttribute('aria-selected', 'true');
    });

    it('should not apply active class when active prop is false', () => {
      render(<Tab label="Inactive Tab" active={false} />);
      const tab = screen.getByRole('tab');
      expect(tab).toHaveAttribute('aria-selected', 'false');
    });

    it('should render active indicator when active', () => {
      const { container } = render(<Tab label="Active Tab" active />);
      const indicator = container.querySelector('[aria-hidden="true"]');
      expect(indicator).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Tab label="Disabled Tab" disabled />);
      expect(screen.getByRole('tab')).toBeDisabled();
    });

    it('should not call onClick when disabled', () => {
      const handleClick = jest.fn();
      render(<Tab label="Disabled Tab" disabled onClick={handleClick} />);
      fireEvent.click(screen.getByRole('tab'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Event Handlers', () => {
    it('should call onClick when clicked', () => {
      const handleClick = jest.fn();
      render(<Tab label="Clickable Tab" onClick={handleClick} />);
      fireEvent.click(screen.getByRole('tab'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Tabs Component', () => {
  const mockItems = [
    { label: 'Tab 1', value: 'tab1' },
    { label: 'Tab 2', value: 'tab2' },
    { label: 'Tab 3', value: 'tab3' },
  ];

  describe('Basic Rendering', () => {
    it('should render all tabs from items array', () => {
      render(<Tabs items={mockItems} />);
      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Tab 2')).toBeInTheDocument();
      expect(screen.getByText('Tab 3')).toBeInTheDocument();
    });

    it('should render with custom className', () => {
      const { container } = render(<Tabs items={mockItems} className="custom-tabs" />);
      expect(container.querySelector('.custom-tabs')).toBeInTheDocument();
    });

    it('should render add tab button when addTab is true', () => {
      render(<Tabs items={mockItems} addTab />);
      expect(screen.getByLabelText('Add tab')).toBeInTheDocument();
    });

    it('should not render add tab button by default', () => {
      render(<Tabs items={mockItems} />);
      expect(screen.queryByLabelText('Add tab')).not.toBeInTheDocument();
    });
  });

  describe('Tab Selection', () => {
    it('should highlight first tab by default with defaultActiveKey', () => {
      render(<Tabs items={mockItems} defaultActiveKey="tab1" />);
      const tabs = screen.getAllByRole('tab');
      expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
      expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
    });

    it('should call onChange when tab is clicked', () => {
      const handleChange = jest.fn();
      render(<Tabs items={mockItems} onChange={handleChange} />);
      fireEvent.click(screen.getByText('Tab 2'));
      expect(handleChange).toHaveBeenCalledWith('tab2');
    });

    it('should work in controlled mode with activeKey', () => {
      const { rerender } = render(<Tabs items={mockItems} activeKey="tab1" />);
      let tabs = screen.getAllByRole('tab');
      expect(tabs[0]).toHaveAttribute('aria-selected', 'true');

      rerender(<Tabs items={mockItems} activeKey="tab2" />);
      tabs = screen.getAllByRole('tab');
      expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('Tab Items with Props', () => {
    it('should render tabs with icons', () => {
      const itemsWithIcons = [
        { label: 'Home', value: 'home', icon: <HomeIcon /> },
        { label: 'Profile', value: 'profile', icon: <UserIcon /> },
      ];
      render(<Tabs items={itemsWithIcons} />);
      const tabs = screen.getAllByRole('tab');
      expect(tabs[0].querySelector('svg')).toBeInTheDocument();
      expect(tabs[1].querySelector('svg')).toBeInTheDocument();
    });

    it('should render tabs with counters', () => {
      const itemsWithCounters = [
        { label: 'All', value: 'all', counter: 12 },
        { label: 'Unread', value: 'unread', counter: 5 },
      ];
      render(<Tabs items={itemsWithCounters} />);
      expect(screen.getByText('12')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('should render tabs with sub-labels', () => {
      const itemsWithSubLabels = [
        { label: 'Overview', value: 'overview', subLabel: 'Main dashboard' },
        { label: 'Analytics', value: 'analytics', subLabel: 'View reports' },
      ];
      render(<Tabs items={itemsWithSubLabels} />);
      expect(screen.getByText('Main dashboard')).toBeInTheDocument();
      expect(screen.getByText('View reports')).toBeInTheDocument();
    });

    it('should disable specific tabs', () => {
      const itemsWithDisabled = [
        { label: 'Tab 1', value: 'tab1' },
        { label: 'Tab 2', value: 'tab2', disabled: true },
      ];
      render(<Tabs items={itemsWithDisabled} />);
      const tabs = screen.getAllByRole('tab');
      expect(tabs[1]).toBeDisabled();
    });
  });

  describe('Action add new tab', () => {
    it('should call onAddTab when add button is clicked', () => {
      const handleAddTab = jest.fn();
      render(<Tabs items={mockItems} addTab onAddTab={handleAddTab} />);
      fireEvent.click(screen.getByLabelText('Add tab'));
      expect(handleAddTab).toHaveBeenCalledTimes(1);
    });
  });

  describe('Scrollable Tabs', () => {
    it('should render scroll buttons when scrollable is true', () => {
      render(<Tabs items={mockItems} scrollable />);
      expect(screen.getByLabelText('Scroll left')).toBeInTheDocument();
      expect(screen.getByLabelText('Scroll right')).toBeInTheDocument();
    });

    it('should not render scroll buttons by default', () => {
      render(<Tabs items={mockItems} />);
      expect(screen.queryByLabelText('Scroll left')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Scroll right')).not.toBeInTheDocument();
    });

    it('should have scroll buttons disabled initially', () => {
      render(<Tabs items={mockItems} scrollable />);
      expect(screen.getByLabelText('Scroll left')).toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('should have role="tablist" on container', () => {
      const { container } = render(<Tabs items={mockItems} />);
      expect(container.querySelector('[role="tablist"]')).toBeInTheDocument();
    });

    it('should maintain proper aria-selected states', () => {
      render(<Tabs items={mockItems} defaultActiveKey="tab2" />);
      const tabs = screen.getAllByRole('tab');
      expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
      expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
      expect(tabs[2]).toHaveAttribute('aria-selected', 'false');
    });
  });

  describe('Theme Support', () => {
    it('should render correctly in light theme', () => {
      render(
        <ThemeProvider defaultTheme="light">
          <Tabs items={mockItems} data-testid="tabs-light" />
        </ThemeProvider>
      );
      const tabs = screen.getAllByRole('tab');
      expect(tabs).toHaveLength(3);
      expect(document.documentElement.className).toBe('lightTheme');
    });

    it('should render correctly in dark theme', () => {
      render(
        <ThemeProvider defaultTheme="dark">
          <Tabs items={mockItems} data-testid="tabs-dark" />
        </ThemeProvider>
      );
      const tabs = screen.getAllByRole('tab');
      expect(tabs).toHaveLength(3);
      expect(document.documentElement.className).toBe('darkTheme');
    });

    it('should maintain functionality across themes', () => {
      const handleChange = jest.fn();
      const { rerender } = render(
        <ThemeProvider defaultTheme="light">
          <Tabs items={mockItems} onChange={handleChange} />
        </ThemeProvider>
      );

      const tabs = screen.getAllByRole('tab');
      fireEvent.click(tabs[1]);
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith('tab2');

      rerender(
        <ThemeProvider defaultTheme="dark">
          <Tabs items={mockItems} onChange={handleChange} />
        </ThemeProvider>
      );

      fireEvent.click(tabs[2]);
      expect(handleChange).toHaveBeenCalledTimes(2);
      expect(handleChange).toHaveBeenCalledWith('tab3');
    });

    it('should render active state correctly in both themes', () => {
      const { rerender } = render(
        <ThemeProvider defaultTheme="light">
          <Tabs items={mockItems} defaultActiveKey="tab2" />
        </ThemeProvider>
      );
      let tabs = screen.getAllByRole('tab');
      expect(tabs[1]).toHaveAttribute('aria-selected', 'true');

      rerender(
        <ThemeProvider defaultTheme="dark">
          <Tabs items={mockItems} defaultActiveKey="tab2" />
        </ThemeProvider>
      );
      tabs = screen.getAllByRole('tab');
      expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    });
  });
});

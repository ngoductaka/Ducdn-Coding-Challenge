import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, Tab } from './Tab';
import React from 'react';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    activeKey: {
      control: 'text',
      description: 'Current active tab key (controlled)',
    },
    defaultActiveKey: {
      control: 'text',
      description: 'Default active tab key (uncontrolled)',
    },
    scrollable: {
      control: 'boolean',
      description: 'Whether tabs are scrollable',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    addTab: {
      control: 'boolean',
      description: 'Whether to show add tab button',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic Tabs with items array - Ant Design style
 */
export const Basic: Story = {
  args: {
    items: [
      { label: 'Tab 1', value: 'tab1' },
      { label: 'Tab 2', value: 'tab2' },
      { label: 'Tab 3', value: 'tab3' },
    ],
    defaultActiveKey: 'tab1',
  },
};

/**
 * Tabs with icons
 */
export const WithIcons: Story = {
  args: {
    items: [
      { label: 'Home', value: 'home', icon: '🏠' },
      { label: 'Profile', value: 'profile', icon: '👤' },
      { label: 'Settings', value: 'settings', icon: '⚙️' },
      { label: 'Messages', value: 'messages', icon: '💬' },
    ],
    defaultActiveKey: 'home',
  },
};

/**
 * Tabs with counters/badges
 */
export const WithCounters: Story = {
  args: {
    items: [
      { label: 'All', value: 'all', counter: 12 },
      { label: 'Unread', value: 'unread', counter: 5 },
      { label: 'Archived', value: 'archived', counter: 0 },
      { label: 'Important', value: 'important', counter: 3 },
    ],
    defaultActiveKey: 'all',
  },
};

/**
 * Tabs with sub-labels
 */
export const WithSubLabels: Story = {
  args: {
    items: [
      { label: 'Overview', value: 'overview', subLabel: 'Main dashboard' },
      { label: 'Analytics', value: 'analytics', subLabel: 'View reports' },
      { label: 'Settings', value: 'settings', subLabel: 'Preferences' },
    ],
    defaultActiveKey: 'overview',
  },
};

/**
 * Tabs with action buttons (closeable tabs)
 */
export const WithActionButtons: Story = {
  args: {
    items: [
      { label: 'Tab 1', value: 'tab1', actionButton: true },
      { label: 'Tab 2', value: 'tab2', actionButton: true },
      { label: 'Tab 3', value: 'tab3', actionButton: true },
    ],
    defaultActiveKey: 'tab1',
    onActionClick: value => {
      console.log('Close tab:', value);
      alert(`Close tab: ${value}`);
    },
  },
};

/**
 * Tabs with disabled tab
 */
export const WithDisabled: Story = {
  args: {
    items: [
      { label: 'Tab 1', value: 'tab1' },
      { label: 'Tab 2', value: 'tab2', disabled: true },
      { label: 'Tab 3', value: 'tab3' },
    ],
    defaultActiveKey: 'tab1',
  },
};

/**
 * Scrollable tabs
 */
export const Scrollable: Story = {
  args: {
    items: Array.from({ length: 15 }, (_, i) => ({
      label: `Tab ${i + 1}`,
      value: `tab${i + 1}`,
    })),
    defaultActiveKey: 'tab1',
    scrollable: true,
  },
};

/**
 * Tabs with add button
 */
export const WithAddButton: Story = {
  args: {
    items: [
      { label: 'Tab 1', value: 'tab1' },
      { label: 'Tab 2', value: 'tab2' },
      { label: 'Tab 3', value: 'tab3' },
    ],
    defaultActiveKey: 'tab1',
    addTab: true,
    onAddTab: () => {
      console.log('Add new tab');
      alert('Add new tab clicked');
    },
  },
};

/**
 * Controlled tabs with state management
 */
export const Controlled: Story = {
  args: { items: [] },
  render: () => {
    const [activeKey, setActiveKey] = React.useState('tab1');

    const items = [
      { label: 'Tab 1', value: 'tab1' },
      { label: 'Tab 2', value: 'tab2' },
      { label: 'Tab 3', value: 'tab3' },
      { label: 'Tab 4', value: 'tab4' },
    ];

    return (
      <div style={{ padding: '24px' }}>
        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontSize: '14px', color: '#666' }}>
            Active Tab: <strong>{activeKey}</strong>
          </p>
        </div>
        <Tabs items={items} activeKey={activeKey} onChange={setActiveKey} />
        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f5f5f5' }}>
          <h3 style={{ margin: '0 0 8px 0' }}>Content for {activeKey}</h3>
          <p style={{ margin: 0, color: '#666' }}>This is the content area for the active tab.</p>
        </div>
      </div>
    );
  },
};

/**
 * Full-featured example with dynamic tabs
 */
export const FullFeatured: Story = {
  args: { items: [] },
  render: () => {
    const [tabs, setTabs] = React.useState([
      { label: 'Home', value: 'home', icon: '🏠', subLabel: 'Dashboard' },
      { label: 'Profile', value: 'profile', icon: '👤', counter: 3 },
      { label: 'Settings', value: 'settings', icon: '⚙️', actionButton: true },
      { label: 'Messages', value: 'messages', icon: '💬', counter: 99, actionButton: true },
    ]);
    const [activeKey, setActiveKey] = React.useState('home');

    const handleAddTab = () => {
      const newTabNumber = tabs.length + 1;
      const newTab = {
        label: `Tab ${newTabNumber}`,
        value: `tab${newTabNumber}`,
        icon: '📄',
        actionButton: true,
      };
      setTabs([...tabs, newTab]);
      setActiveKey(newTab.value);
    };

    const handleCloseTab = (value: string) => {
      const newTabs = tabs.filter(tab => tab.value !== value);
      setTabs(newTabs);

      if (activeKey === value && newTabs.length > 0) {
        const currentIndex = tabs.findIndex(tab => tab.value === value);
        const newIndex = Math.max(0, currentIndex - 1);
        setActiveKey(newTabs[newIndex].value);
      }
    };

    return (
      <div style={{ padding: '24px' }}>
        <Tabs
          items={tabs}
          activeKey={activeKey}
          onChange={setActiveKey}
          addTab
          onAddTab={handleAddTab}
          onActionClick={handleCloseTab}
        />
        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f5f5f5' }}>
          <h3 style={{ margin: '0 0 8px 0' }}>
            Content for {tabs.find(t => t.value === activeKey)?.label}
          </h3>
          <p style={{ margin: 0, color: '#666' }}>
            This is a dynamic tabs example where you can add and remove tabs.
          </p>
        </div>
      </div>
    );
  },
};

/**
 * All variants showcase
 */
export const AllVariants: Story = {
  args: { items: [] },
  render: () => (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* Basic */}
      <div>
        <h3 style={{ fontWeight: 600, marginBottom: '16px', fontSize: '16px' }}>Basic Tabs</h3>
        <Tabs
          items={[
            { label: 'Tab 1', value: 'tab1' },
            { label: 'Tab 2', value: 'tab2' },
            { label: 'Tab 3', value: 'tab3' },
          ]}
          defaultActiveKey="tab2"
        />
      </div>

      {/* With Icons */}
      <div>
        <h3 style={{ fontWeight: 600, marginBottom: '16px', fontSize: '16px' }}>With Icons</h3>
        <Tabs
          items={[
            { label: 'Home', value: 'home', icon: '🏠' },
            { label: 'Search', value: 'search', icon: '🔍' },
            { label: 'Settings', value: 'settings', icon: '⚙️' },
          ]}
          defaultActiveKey="search"
        />
      </div>

      {/* With Sub Labels */}
      <div>
        <h3 style={{ fontWeight: 600, marginBottom: '16px', fontSize: '16px' }}>With Sub Labels</h3>
        <Tabs
          items={[
            { label: 'Overview', value: 'overview', subLabel: 'Main dashboard' },
            { label: 'Analytics', value: 'analytics', subLabel: 'View reports' },
            { label: 'Settings', value: 'settings', subLabel: 'Preferences' },
          ]}
          defaultActiveKey="analytics"
        />
      </div>

      {/* With Counters */}
      <div>
        <h3 style={{ fontWeight: 600, marginBottom: '16px', fontSize: '16px' }}>With Counters</h3>
        <Tabs
          items={[
            { label: 'All', value: 'all', counter: 12 },
            { label: 'Unread', value: 'unread', counter: 5 },
            { label: 'Done', value: 'done' },
          ]}
          defaultActiveKey="unread"
        />
      </div>

      {/* With Action Buttons */}
      <div>
        <h3 style={{ fontWeight: 600, marginBottom: '16px', fontSize: '16px' }}>
          With Action Buttons
        </h3>
        <Tabs
          items={[
            { label: 'Tab 1', value: 'tab1', actionButton: true },
            { label: 'Tab 2', value: 'tab2', actionButton: true },
            { label: 'Tab 3', value: 'tab3', actionButton: true },
          ]}
          defaultActiveKey="tab2"
          onActionClick={value => console.log('Close:', value)}
        />
      </div>
    </div>
  ),
};

/**
 * States demonstration
 */
export const States: Story = {
  args: { items: [] },
  render: () => (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ fontWeight: 600, marginBottom: '16px', fontSize: '16px' }}>States</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Default</p>
            <Tabs
              items={[
                { label: 'Tab 1', value: 'tab1' },
                { label: 'Tab 2', value: 'tab2' },
              ]}
            />
          </div>

          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Active</p>
            <Tabs
              items={[
                { label: 'Tab 1', value: 'tab1' },
                { label: 'Tab 2', value: 'tab2' },
              ]}
              defaultActiveKey="tab1"
            />
          </div>

          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>With Disabled</p>
            <Tabs
              items={[
                { label: 'Tab 1', value: 'tab1' },
                { label: 'Tab 2', value: 'tab2', disabled: true },
                { label: 'Tab 3', value: 'tab3' },
              ]}
              defaultActiveKey="tab1"
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Anatomy documentation
 */
export const Anatomy: Story = {
  args: { items: [] },
  render: () => (
    <div style={{ padding: '24px', maxWidth: '800px' }}>
      <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: 600 }}>Tabs Anatomy</h2>

      <div style={{ marginBottom: '32px' }}>
        <Tabs
          items={[
            {
              label: 'Tab',
              value: 'tab1',
              subLabel: 'Sub label',
              icon: '📄',
              counter: 5,
              actionButton: true,
            },
            { label: 'Tab 2', value: 'tab2' },
          ]}
          defaultActiveKey="tab1"
          addTab
        />
      </div>

      <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
          Component Structure:
        </h3>
        <div style={{ marginBottom: '8px' }}>
          <strong>1. Icon</strong> - Optional icon displayed before the label
        </div>
        <div style={{ marginBottom: '8px' }}>
          <strong>2. Label</strong> - Main tab text (required)
        </div>
        <div style={{ marginBottom: '8px' }}>
          <strong>3. Sub Label</strong> - Optional secondary text below the label
        </div>
        <div style={{ marginBottom: '8px' }}>
          <strong>4. Counter Badge</strong> - Optional counter/badge display
        </div>
        <div style={{ marginBottom: '8px' }}>
          <strong>5. Action Button</strong> - Optional close/action button
        </div>
        <div style={{ marginBottom: '8px' }}>
          <strong>6. Add Tab Button</strong> - Optional button to add new tabs
        </div>
        <div style={{ marginBottom: '8px' }}>
          <strong>7. Active Indicator</strong> - Bottom border showing active tab
        </div>
        <div style={{ marginBottom: '8px' }}>
          <strong>8. Container Border</strong> - Bottom border for the tabs container
        </div>
      </div>
    </div>
  ),
};

/**
 * Interactive with content panels
 */
export const InteractiveWithContent: Story = {
  args: { items: [] },
  render: () => {
    const [activeKey, setActiveKey] = React.useState('home');

    const tabContent: Record<string, { title: string; content: string }> = {
      home: {
        title: 'Home Dashboard',
        content: 'Welcome to your home dashboard. Here you can see an overview of your activity.',
      },
      profile: {
        title: 'User Profile',
        content: 'View and edit your profile information, preferences, and settings.',
      },
      settings: {
        title: 'Settings',
        content: 'Manage your application settings and configurations.',
      },
      messages: {
        title: 'Messages',
        content: 'You have 5 unread messages. Check your inbox for updates.',
      },
    };

    const items = [
      { label: 'Home', value: 'home', icon: '🏠' },
      { label: 'Profile', value: 'profile', icon: '👤' },
      { label: 'Settings', value: 'settings', icon: '⚙️' },
      { label: 'Messages', value: 'messages', icon: '💬', counter: 5 },
    ];

    return (
      <div style={{ padding: '24px' }}>
        <div
          style={{
            border: '1px solid #e5e5e5',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <Tabs items={items} activeKey={activeKey} onChange={setActiveKey} />
          <div style={{ padding: '24px' }}>
            <h3 style={{ fontWeight: 600, marginBottom: '8px', fontSize: '18px' }}>
              {tabContent[activeKey]?.title}
            </h3>
            <p style={{ color: '#666', margin: 0 }}>{tabContent[activeKey]?.content}</p>
          </div>
        </div>
      </div>
    );
  },
};

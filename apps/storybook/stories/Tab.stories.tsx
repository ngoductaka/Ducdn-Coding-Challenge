import { TabItem, Tabs } from '@company/core';
import { HomeIcon, InfoIcon, SearchIcon, SettingsIcon, UserIcon } from '@company/icons';
import type { Meta, StoryObj } from '@storybook/react';
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
    scrollLimit: {
      control: 'select',
      options: ['first', 'last', 'middle'],
      description: 'Defines which part of the tab list is prioritized during scrolling',
      table: {
        defaultValue: { summary: 'first' },
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

export const WithIcons: Story = {
  args: {
    items: [
      { label: 'Home', value: 'home', icon: <HomeIcon /> },
      { label: 'Profile', value: 'profile', icon: <UserIcon /> },
      { label: 'Settings', value: 'settings', icon: <SettingsIcon /> },
      { label: 'Messages', value: 'messages', icon: <InfoIcon /> },
    ],
    defaultActiveKey: 'home',
  },
};

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
export const ScrollLimitComparison: Story = {
  args: { items: [] },
  render: () => {
    const [activeKeyFirst, setActiveKeyFirst] = React.useState('tab10');
    const [activeKeyLast, setActiveKeyLast] = React.useState('tab10');
    const [activeKeyMiddle, setActiveKeyMiddle] = React.useState('tab10');

    const items = Array.from({ length: 20 }, (_, i) => ({
      label: `Tab ${i + 1}`,
      value: `tab${i + 1}`,
    }));

    return (
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
        <div>
          <h3 style={{ fontWeight: 600, marginBottom: '8px', fontSize: '16px' }}>
            scrollLimit: "first" (default)
          </h3>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
            Prioritizes showing the first tab. The list won't scroll unless necessary.
          </p>
          <Tabs
            items={items}
            activeKey={activeKeyFirst}
            onChange={setActiveKeyFirst}
            scrollable
            scrollLimit="first"
          />
          <p style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
            Active: {activeKeyFirst}
          </p>
        </div>

        <div>
          <h3 style={{ fontWeight: 600, marginBottom: '8px', fontSize: '16px' }}>
            scrollLimit: "last"
          </h3>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
            Prioritizes showing the last tab. Scrolls right to keep the end visible.
          </p>
          <Tabs
            items={items}
            activeKey={activeKeyLast}
            onChange={setActiveKeyLast}
            scrollable
            scrollLimit="last"
          />
          <p style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
            Active: {activeKeyLast}
          </p>
        </div>

        <div>
          <h3 style={{ fontWeight: 600, marginBottom: '8px', fontSize: '16px' }}>
            scrollLimit: "middle"
          </h3>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
            Centers the active tab in view. Best for highlighting the current selection.
          </p>
          <Tabs
            items={items}
            activeKey={activeKeyMiddle}
            onChange={setActiveKeyMiddle}
            scrollable
            scrollLimit="middle"
          />
          <p style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
            Active: {activeKeyMiddle}
          </p>
        </div>
      </div>
    );
  },
};

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

export const FullFeatured: Story = {
  args: { items: [] },
  render: () => {
    const [tabs, setTabs] = React.useState<TabItem[]>([
      { label: 'Home', value: 'home', icon: <HomeIcon /> },
      { label: 'Profile', value: 'profile', icon: <UserIcon />, counter: 3 },
      {
        label: 'Settings',
        value: 'settings',
        icon: <SettingsIcon />,
        actionButton: true,
        counter: 3,
      },
    ]);
    const [activeKey, setActiveKey] = React.useState('home');

    const handleAddTab = () => {
      const newTabNumber = tabs.length + 1;
      const newTab = {
        label: `Tab ${newTabNumber}`,
        value: `tab${newTabNumber}`,
        icon: <InfoIcon />,
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
          scrollable
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

export const AllVariants: Story = {
  args: { items: [] },
  render: () => (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
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

      <div>
        <h3 style={{ fontWeight: 600, marginBottom: '16px', fontSize: '16px' }}>With Icons</h3>
        <Tabs
          items={[
            { label: 'Home', value: 'home', icon: <HomeIcon /> },
            { label: 'Search', value: 'search', icon: <SearchIcon /> },
            { label: 'Settings', value: 'settings', icon: <SettingsIcon /> },
          ]}
          defaultActiveKey="search"
        />
      </div>

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
              icon: <InfoIcon />,
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
      { label: 'Home', value: 'home', icon: <HomeIcon /> },
      { label: 'Profile', value: 'profile', icon: <UserIcon /> },
      { label: 'Settings', value: 'settings', icon: <SettingsIcon />, counter: 5 },
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

import {
  AlertCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  HomeIcon,
  InfoIcon,
  MinusIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
  XIcon,
} from '@company/icons';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Icons',
  component: CheckIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'number', min: 12, max: 64, step: 4 },
    },
    color: {
      control: 'color',
    },
  },
} satisfies Meta<typeof CheckIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllIcons: Story = {
  render: args => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
      <div style={{ textAlign: 'center' }}>
        <CheckIcon {...args} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>Check</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <XIcon {...args} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>X</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <PlusIcon {...args} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>Plus</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <MinusIcon {...args} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>Minus</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <SearchIcon {...args} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>Search</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <SettingsIcon {...args} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>Settings</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <HomeIcon {...args} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>Home</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <UserIcon {...args} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>User</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <ChevronRightIcon {...args} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>ChevronRight</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <ChevronLeftIcon {...args} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>ChevronLeft</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <ChevronDownIcon {...args} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>ChevronDown</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <ChevronUpIcon {...args} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>ChevronUp</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <AlertCircleIcon {...args} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>AlertCircle</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <InfoIcon {...args} />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>Info</div>
      </div>
    </div>
  ),
  args: {
    size: 24,
    color: 'currentColor',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <CheckIcon size={16} />
      <CheckIcon size={24} />
      <CheckIcon size={32} />
      <CheckIcon size={48} />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <CheckIcon size={32} color="red" />
      <CheckIcon size={32} color="green" />
      <CheckIcon size={32} color="blue" />
      <CheckIcon size={32} color="orange" />
    </div>
  ),
};

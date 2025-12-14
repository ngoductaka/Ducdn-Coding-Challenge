import { Radio, RadioGroup } from '@company/core';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['large', 'small'],
      description: 'Size variant of the radio button',
      table: {
        defaultValue: { summary: 'large' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text for the radio button',
    },
    helperText: {
      control: 'text',
      description: 'Helper text shown below the radio',
    },
    counter: {
      control: 'number',
      description: 'Counter value to display (optional)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio is disabled',
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Label',
    helperText: 'Helper text',
  },
};

export const WithCounter: Story = {
  args: {
    label: 'Label',
    counter: 9999,
  },
};

export const Small: Story = {
  args: {
    label: 'Label',
    size: 'small',
  },
};

/**
 * Large size variant (default)
 */
export const Large: Story = {
  args: {
    label: 'Label',
    size: 'large',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Label',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Label',
    disabled: true,
    defaultChecked: true,
  },
};

/**
 * Radio with only label (no caption)
 */
export const LabelOnly: Story = {
  args: {
    label: 'Label only',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Label',
    helperText: 'Additional helper text below',
  },
};

export const TryMe: Story = {
  render: () => {
    const [selected, setSelected] = React.useState('option1');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
        <h3 style={{ marginBottom: '8px', fontWeight: 600 }}>Try Keyboard Navigation</h3>

        <div
          style={{
            padding: '12px',
            backgroundColor: '#f0f0f0',
            borderRadius: '8px',
            fontSize: '14px',
            lineHeight: '1.6',
          }}
        >
          <strong>Keyboard controls:</strong>
          <ul style={{ marginTop: '8px', marginBottom: '0', paddingLeft: '20px' }}>
            <li>
              <kbd>↑</kbd> / <kbd>↓</kbd> or <kbd>←</kbd> / <kbd>→</kbd> - Navigate between options
            </li>
            <li>
              <kbd>Home</kbd> - Jump to first option
            </li>
            <li>
              <kbd>End</kbd> - Jump to last option
            </li>
            <li>
              <kbd>Tab</kbd> - Move focus in/out of radio group
            </li>
          </ul>
        </div>

        <RadioGroup name="try-me-group" value={selected} onChange={setSelected}>
          <Radio label="First Option" value="option1" counter={9999} />
          <Radio label="Second Option" value="option2" />
          <Radio label="Third Option" value="option3" />
          <Radio label="Fourth Option" value="option4" />
          <Radio label="Fifth Option (Disabled)" value="option5" disabled />
        </RadioGroup>

        <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
          Selected: <strong>{selected}</strong>
        </p>
      </div>
    );
  },
};

export const RadioGroupExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px' }}>
      <RadioGroup name="example-group" defaultValue="option1">
        <Radio label="Option 1" value="option1" />
        <Radio label="Option 2" value="option2" />
        <Radio label="Option 3" value="option3" counter={42} />
        <Radio label="Option 4 (Disabled)" value="option4" disabled />
      </RadioGroup>
    </div>
  ),
};

export const RadioGroupWithOptions: Story = {
  render: () => {
    const [selected, setSelected] = React.useState('apple');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px' }}>
        <h3 style={{ marginBottom: '8px', fontWeight: 600 }}>Select a fruit</h3>

        <RadioGroup
          name="fruit-group"
          value={selected}
          onChange={setSelected}
          options={[
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
            { label: 'Orange', value: 'orange' },
            { label: 'Grape (Disabled)', value: 'grape', disabled: true },
          ]}
        />

        <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
          Selected: <strong>{selected}</strong>
        </p>
      </div>
    );
  },
};

export const RadioGroupSimpleOptions: Story = {
  render: () => {
    const [selected, setSelected] = React.useState('Small');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px' }}>
        <h3 style={{ marginBottom: '8px', fontWeight: 600 }}>Select a size</h3>

        <RadioGroup
          name="size-group"
          value={selected}
          onChange={setSelected}
          options={['Small', 'Medium', 'Large', 'Extra Large']}
        />

        <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
          Selected: <strong>{selected}</strong>
        </p>
      </div>
    );
  },
};

export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '500px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontWeight: 600 }}>Large (Default)</h4>
        <Radio name="size-large" label="Large Size" size="large" defaultChecked />
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontWeight: 600 }}>Small</h4>
        <Radio name="size-small" label="Small Size" size="small" defaultChecked />
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ padding: '24px', display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Default</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Default</p>
            <Radio name="state-default" value="default" />
          </div>

          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
              Hover (hover over it)
            </p>
            <Radio name="state-hover" value="hover" />
          </div>

          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Selected</p>
            <Radio name="state-selected" value="selected" defaultChecked />
          </div>

          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Disabled</p>
            <Radio name="state-disabled" value="disabled" disabled />
          </div>

          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
              Selected Disabled
            </p>
            <Radio
              name="state-selected-disabled"
              value="selected-disabled"
              disabled
              defaultChecked
            />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Small</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Default</p>
            <Radio name="state-small-default" value="default" size="small" />
          </div>

          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
              Hover (hover over it)
            </p>
            <Radio name="state-small-hover" value="hover" size="small" />
          </div>

          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Selected</p>
            <Radio name="state-small-selected" value="selected" size="small" defaultChecked />
          </div>

          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Disabled</p>
            <Radio name="state-small-disabled" value="disabled" size="small" disabled />
          </div>

          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
              Selected Disabled
            </p>
            <Radio
              name="state-small-selected-disabled"
              value="selected-disabled"
              size="small"
              disabled
              defaultChecked
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

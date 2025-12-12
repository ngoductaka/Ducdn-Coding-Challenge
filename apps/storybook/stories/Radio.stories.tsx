import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup } from '@company/core';
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
      control: 'boolean',
      description: 'Whether to show a counter',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    counterValue: {
      control: 'number',
      description: 'Counter value to display',
      table: {
        defaultValue: { summary: '9999' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio is disabled',
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default radio with label
 */
export const Default: Story = {
  args: {
    label: 'Label',
    helperText: 'Helper text',
  },
};

/**
 * Radio with counter displayed
 */
export const WithCounter: Story = {
  args: {
    label: 'Label',
    counter: true,
    counterValue: 9999,
  },
};

/**
 * Small size variant
 */
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

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    label: 'Label',
    disabled: true,
  },
};

/**
 * Disabled and checked state
 */
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

/**
 * Radio with helper text
 */
export const WithHelperText: Story = {
  args: {
    label: 'Label',
    helperText: 'Additional helper text below',
  },
};

/**
 * Radio group example - Try me 👇
 */
export const TryMe: Story = {
  render: () => {
    const [selected, setSelected] = React.useState('option1');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px' }}>
        <h3 style={{ marginBottom: '8px', fontWeight: 600 }}>Try me 👇</h3>

        <RadioGroup name="try-me-group" value={selected} onChange={setSelected}>
          <Radio label="Label" value="option1" counter counterValue={9999} />
          <Radio label="Another Option" value="option2" />
          <Radio label="Third Option" value="option3" />
        </RadioGroup>

        <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
          Selected: <strong>{selected}</strong>
        </p>
      </div>
    );
  },
};

/**
 * Radio group example with all features
 */
export const RadioGroupExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px' }}>
      <RadioGroup name="example-group" defaultValue="option1">
        <Radio label="Option 1" value="option1" />
        <Radio label="Option 2" value="option2" />
        <Radio label="Option 3" value="option3" counter counterValue={42} />
        <Radio label="Option 4 (Disabled)" value="option4" disabled />
      </RadioGroup>
    </div>
  ),
};

/**
 * RadioGroup with options array
 */
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

/**
 * RadioGroup with simple string options
 */
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

/**
 * Comparison of size variants
 */
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

/**
 * All States Overview - matching design system
 */
export const AllStates: Story = {
  render: () => (
    <div style={{ padding: '24px', display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
      {/* Default Size Column */}
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

      {/* Small Size Column */}
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

/**
 * When to use documentation
 */
export const WhenToUse: Story = {
  render: () => (
    <div style={{ maxWidth: '700px', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <h2 style={{ marginBottom: '16px', fontSize: '24px', fontWeight: 600 }}>When to use</h2>

      <ul style={{ lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
        <li>
          Use radio items when users <strong>must select</strong> a <strong>single</strong> option
          from a list of mutually exclusive options.
        </li>
        <li>
          Examples of usage include: forms, filter groups, data tables, modals, and side panels.
        </li>
      </ul>

      <h3 style={{ marginTop: '32px', marginBottom: '16px', fontSize: '20px', fontWeight: 600 }}>
        Configuration options
      </h3>

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          border: '1px solid #e5e5e5',
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: '#f5f5f5',
              borderBottom: '2px solid #e5e5e5',
            }}
          >
            <th
              style={{
                textAlign: 'left',
                padding: '12px 16px',
                fontWeight: 600,
                borderRight: '1px solid #e5e5e5',
              }}
            >
              Property
            </th>
            <th
              style={{
                textAlign: 'left',
                padding: '12px 16px',
                fontWeight: 600,
                borderRight: '1px solid #e5e5e5',
              }}
            >
              Values
            </th>
            <th
              style={{
                textAlign: 'left',
                padding: '12px 16px',
                fontWeight: 600,
              }}
            >
              Default Value
            </th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
            <td
              style={{
                padding: '12px 16px',
                borderRight: '1px solid #e5e5e5',
              }}
            >
              Size
            </td>
            <td
              style={{
                padding: '12px 16px',
                borderRight: '1px solid #e5e5e5',
              }}
            >
              Large / Small
            </td>
            <td style={{ padding: '12px 16px' }}>Large</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
            <td
              style={{
                padding: '12px 16px',
                borderRight: '1px solid #e5e5e5',
              }}
            >
              HelperText
            </td>
            <td
              style={{
                padding: '12px 16px',
                borderRight: '1px solid #e5e5e5',
              }}
            >
              yes / no
            </td>
            <td style={{ padding: '12px 16px' }}>no</td>
          </tr>
          <tr>
            <td
              style={{
                padding: '12px 16px',
                borderRight: '1px solid #e5e5e5',
              }}
            >
              Counter
            </td>
            <td
              style={{
                padding: '12px 16px',
                borderRight: '1px solid #e5e5e5',
              }}
            >
              yes / no
            </td>
            <td style={{ padding: '12px 16px' }}>no</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};

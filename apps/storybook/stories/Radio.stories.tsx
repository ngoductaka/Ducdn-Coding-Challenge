import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from '@company/core';
import React from 'react';

const meta = {
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
    caption: {
      control: 'text',
      description: 'Caption text shown below the label',
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
    checked: {
      control: 'boolean',
      description: 'Whether the radio is checked (controlled)',
    },
    value: {
      control: 'text',
      description: 'Value of the radio input',
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when the radio is changed',
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
 * Default radio with label and caption
 */
export const Default: Story = {
  args: {
    label: 'Label',
    caption: 'Caption',
  },
};

/**
 * Radio with counter displayed
 */
export const WithCounter: Story = {
  args: {
    label: 'Label',
    caption: 'Caption',
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
    caption: 'Caption',
    size: 'small',
  },
};

/**
 * Large size variant (default)
 */
export const Large: Story = {
  args: {
    label: 'Label',
    caption: 'Caption',
    size: 'large',
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    label: 'Label',
    caption: 'Caption',
    disabled: true,
  },
};

/**
 * Disabled and checked state
 */
export const DisabledChecked: Story = {
  args: {
    label: 'Label',
    caption: 'Caption',
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
    caption: 'Caption',
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

        <Radio
          name="try-me-group"
          label="Label"
          caption="Caption"
          value="option1"
          checked={selected === 'option1'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelected(e.target.value)}
          counter
          counterValue={9999}
        />

        <Radio
          name="try-me-group"
          label="Another Option"
          caption="Another description"
          value="option2"
          checked={selected === 'option2'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelected(e.target.value)}
        />

        <Radio
          name="try-me-group"
          label="Third Option"
          caption="Third description"
          value="option3"
          checked={selected === 'option3'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelected(e.target.value)}
        />

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
export const RadioGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px' }}>
      <Radio
        name="example-group"
        label="Option 1"
        caption="First option description"
        defaultChecked
      />
      <Radio name="example-group" label="Option 2" caption="Second option description" />
      <Radio
        name="example-group"
        label="Option 3"
        caption="Third option description"
        counter
        counterValue={42}
      />
      <Radio
        name="example-group"
        label="Option 4 (Disabled)"
        caption="This option is disabled"
        disabled
      />
    </div>
  ),
};

/**
 * Comparison of size variants
 */
export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '500px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontWeight: 600 }}>Large (Default)</h4>
        <Radio
          name="size-large"
          label="Large Size"
          caption="This is a large radio button"
          size="large"
          defaultChecked
        />
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontWeight: 600 }}>Small</h4>
        <Radio
          name="size-small"
          label="Small Size"
          caption="This is a small radio button"
          size="small"
          defaultChecked
        />
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

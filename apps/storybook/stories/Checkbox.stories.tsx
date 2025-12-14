import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, CheckboxGroup } from '@company/core';
import React from 'react';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'small'],
      description: 'Size variant of the checkbox',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text for the checkbox',
    },
    helperText: {
      control: 'text',
      description: 'Helper text shown below the checkbox',
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
      description: 'Whether the checkbox is disabled',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in indeterminate state',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Label',
  },
};

export const WithCounter: Story = {
  args: {
    label: 'Label',
    counter: true,
    counterValue: 9999,
    helperText: 'Helper text',
  },
};

export const Small: Story = {
  args: {
    label: 'Label',
    size: 'small',
  },
};

export const DefaultSize: Story = {
  args: {
    label: 'Label',
    size: 'default',
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Label',
    indeterminate: true,
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

export const DisabledIndeterminate: Story = {
  args: {
    label: 'Label',
    disabled: true,
    indeterminate: true,
  },
};

export const LabelOnly: Story = {
  args: {
    label: 'Label only',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Label',
    helperText: 'Helper text',
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ padding: '24px', display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
      {/* Default Size Column */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>Check</p>
        <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Default</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Default</p>
                <Checkbox label="Label" name="state-default" />
              </div>

              <div>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                  Hover (hover over it)
                </p>
                <Checkbox label="Label" name="state-hover" />
              </div>

              <div>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Selected</p>
                <Checkbox label="Label" name="state-selected" defaultChecked />
              </div>

              <div>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Disabled</p>
                <Checkbox label="Label" name="state-disabled" disabled />
              </div>

              <div>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                  Selected Disabled
                </p>
                <Checkbox label="Label" name="state-selected-disabled" disabled defaultChecked />
              </div>
            </div>
          </div>

          {/* Small Size Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Small</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Default</p>
                <Checkbox label="Label" name="state-small-default" size="small" />
              </div>

              <div>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                  Hover (hover over it)
                </p>
                <Checkbox label="Label" name="state-small-hover" size="small" />
              </div>

              <div>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Selected</p>
                <Checkbox label="Label" name="state-small-selected" size="small" defaultChecked />
              </div>

              <div>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Disabled</p>
                <Checkbox label="Label" name="state-small-disabled" size="small" disabled />
              </div>

              <div>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                  Selected Disabled
                </p>
                <Checkbox
                  label="Label"
                  name="state-small-selected-disabled"
                  size="small"
                  disabled
                  defaultChecked
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>Indeterminate</p>
        <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Default</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Default</p>
                <Checkbox label="Label" name="state-default" />
              </div>

              <div>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                  Hover (hover over it)
                </p>
                <Checkbox label="Label" name="state-hover" />
              </div>

              <div>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Selected</p>
                <Checkbox label="Label" indeterminate name="state-selected" defaultChecked />
              </div>

              <div>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Disabled</p>
                <Checkbox label="Label" name="state-disabled" disabled />
              </div>

              <div>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                  Selected Disabled
                </p>
                <Checkbox label="Label" name="state-selected-disabled" disabled defaultChecked />
              </div>
            </div>
          </div>

          {/* Small Size Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Small</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Default</p>
                <Checkbox label="Label" name="state-small-default" size="small" />
              </div>

              <div>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                  Hover (hover over it)
                </p>
                <Checkbox label="Label" name="state-small-hover" size="small" />
              </div>

              <div>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Selected</p>
                <Checkbox label="Label" name="state-small-selected" size="small" defaultChecked />
              </div>

              <div>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Disabled</p>
                <Checkbox label="Label" name="state-small-disabled" size="small" disabled />
              </div>

              <div>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                  Selected Disabled
                </p>
                <Checkbox
                  label="Label"
                  name="state-small-selected-disabled"
                  size="small"
                  disabled
                  defaultChecked
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const ProjectsExample: Story = {
  render: () => {
    const [allChecked, setAllChecked] = React.useState(false);
    const [projects, setProjects] = React.useState<string[]>(['project1', 'project2']);

    const allProjects = ['project1', 'project2', 'project3'];
    const isIndeterminate = projects.length > 0 && projects.length < allProjects.length;

    const handleAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      setAllChecked(checked);
      setProjects(checked ? allProjects : []);
    };

    const handleProjectsChange = (values: string[]) => {
      setProjects(values);
      setAllChecked(values.length === allProjects.length);
    };

    return (
      <div style={{ padding: '24px', display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
        {/* Indeterminate State with Keyboard Navigation */}
        <div
          style={{
            border: '1px solid #e5e5e5',
            borderRadius: '8px',
            padding: '16px',
            minWidth: '280px',
          }}
        >
          <Checkbox
            label="All projects"
            checked={allChecked}
            indeterminate={isIndeterminate}
            onChange={handleAllChange}
          />
          <div style={{ marginLeft: '28px', marginTop: '12px' }}>
            <CheckboxGroup
              name="projects-group"
              value={projects}
              onChange={handleProjectsChange}
              options={['project1', 'project2', 'project3']}
            />
          </div>
          <p
            style={{
              marginTop: '12px',
              fontSize: '12px',
              color: '#666',
              fontStyle: 'italic',
            }}
          >
            Use Tab to navigate between checkboxes, Space to toggle
          </p>
        </div>
      </div>
    );
  },
};

export const TryKeyboardNavigation: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>(['option1', 'option3']);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
        <h3 style={{ marginBottom: '8px', fontWeight: 600 }}>Keyboard Navigation</h3>

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
              <kbd>Tab</kbd> - Move focus forward
            </li>
            <li>
              <kbd>Shift</kbd> + <kbd>Tab</kbd> - Move focus backward
            </li>
            <li>
              <kbd>Space</kbd> - Toggle focused checkbox
            </li>
          </ul>
        </div>

        <CheckboxGroup name="keyboard-test" value={selected} onChange={setSelected}>
          <Checkbox label="First Option" value="option1" counter counterValue={42} />
          <Checkbox label="Second Option" value="option2" helperText="This has helper text" />
          <Checkbox label="Third Option" value="option3" />
          <Checkbox label="Fourth Option" value="option4" />
          <Checkbox label="Fifth Option (Disabled)" value="option5" disabled />
          <Checkbox label="Sixth Option" value="option6" />
        </CheckboxGroup>

        <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
          Selected: <strong>{selected.length > 0 ? selected.join(', ') : 'none'}</strong>
        </p>
      </div>
    );
  },
};

export const CheckboxGroupWithOptions: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>(['apple', 'orange']);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px' }}>
        <h3 style={{ marginBottom: '8px', fontWeight: 600 }}>Select fruits</h3>

        <CheckboxGroup
          name="fruit-group"
          value={selected}
          onChange={setSelected}
          options={[
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
            { label: 'Orange', value: 'orange' },
            { label: 'Grape', value: 'grape' },
            { label: 'Mango (Disabled)', value: 'mango', disabled: true },
          ]}
        />

        <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
          Selected: <strong>{selected.length > 0 ? selected.join(', ') : 'none'}</strong>
        </p>
      </div>
    );
  },
};

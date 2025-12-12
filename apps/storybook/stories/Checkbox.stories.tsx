import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@company/core';
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

/**
 * Default checkbox with label
 */
export const Default: Story = {
  args: {
    label: 'Label',
  },
};

/**
 * Checkbox with counter displayed
 */
export const WithCounter: Story = {
  args: {
    label: 'Label',
    counter: true,
    counterValue: 9999,
    helperText: 'Helper text',
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
 * Default size variant
 */
export const DefaultSize: Story = {
  args: {
    label: 'Label',
    size: 'default',
  },
};

/**
 * Indeterminate state
 */
export const Indeterminate: Story = {
  args: {
    label: 'Label',
    indeterminate: true,
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
 * Disabled and indeterminate state
 */
export const DisabledIndeterminate: Story = {
  args: {
    label: 'Label',
    disabled: true,
    indeterminate: true,
  },
};

/**
 * Checkbox with only label (no caption)
 */
export const LabelOnly: Story = {
  args: {
    label: 'Label only',
  },
};

/**
 * Checkbox with helper text
 */
export const WithHelperText: Story = {
  args: {
    label: 'Label',
    helperText: 'Helper text',
  },
};

/**
 * All States Overview - matching design system
 */
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
      {/*  */}

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

/**
 * Interactive example with projects
 */
export const ProjectsExample: Story = {
  render: () => {
    const [allChecked, setAllChecked] = React.useState(false);
    const [projects, setProjects] = React.useState({
      project1: true,
      project2: true,
      project3: false,
    });

    const allProjectsCount = Object.keys(projects).length;
    const checkedCount = Object.values(projects).filter(Boolean).length;
    const isIndeterminate = checkedCount > 0 && checkedCount < allProjectsCount;

    const handleAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      setAllChecked(checked);
      setProjects({
        project1: checked,
        project2: checked,
        project3: checked,
      });
    };

    const handleProjectChange =
      (project: keyof typeof projects) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const newProjects = { ...projects, [project]: e.target.checked };
        setProjects(newProjects);
        const newCheckedCount = Object.values(newProjects).filter(Boolean).length;
        setAllChecked(newCheckedCount === allProjectsCount);
      };

    return (
      <div style={{ padding: '24px', display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
        {/* Indeterminate State */}
        <div
          style={{
            border: '1px solid #e5e5e5',
            borderRadius: '8px',
            padding: '16px',
            minWidth: '200px',
          }}
        >
          <Checkbox
            label="All projects"
            checked={allChecked}
            indeterminate={isIndeterminate}
            onChange={handleAllChange}
          />
          <div style={{ marginLeft: '28px', marginTop: '12px' }}>
            <div style={{ marginTop: 20 }}>
              <Checkbox
                label="Project 1"
                checked={projects.project1}
                onChange={handleProjectChange('project1')}
                style={{ marginBottom: '8px' }}
              />
            </div>
            <div style={{ marginTop: 20 }}>
              <Checkbox
                label="Project 2"
                checked={projects.project2}
                onChange={handleProjectChange('project2')}
                style={{ marginBottom: '8px' }}
              />
            </div>
            <div style={{ marginTop: 20 }}>
              <Checkbox
                label="Project 3"
                checked={projects.project3}
                onChange={handleProjectChange('project3')}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

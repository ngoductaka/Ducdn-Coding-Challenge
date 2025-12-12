import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Default</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Default</p>
            <Checkbox name="state-default" />
          </div>

          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
              Hover (hover over it)
            </p>
            <Checkbox name="state-hover" />
          </div>

          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Selected</p>
            <Checkbox name="state-selected" defaultChecked />
          </div>

          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Disabled</p>
            <Checkbox name="state-disabled" disabled />
          </div>

          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
              Selected Disabled
            </p>
            <Checkbox name="state-selected-disabled" disabled defaultChecked />
          </div>
        </div>
      </div>

      {/* Small Size Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Small</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Default</p>
            <Checkbox name="state-small-default" size="small" />
          </div>

          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
              Hover (hover over it)
            </p>
            <Checkbox name="state-small-hover" size="small" />
          </div>

          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Selected</p>
            <Checkbox name="state-small-selected" size="small" defaultChecked />
          </div>

          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Disabled</p>
            <Checkbox name="state-small-disabled" size="small" disabled />
          </div>

          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
              Selected Disabled
            </p>
            <Checkbox name="state-small-selected-disabled" size="small" disabled defaultChecked />
          </div>
        </div>
      </div>

      {/* Indeterminate Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Indeterminate</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Indeterminate</p>
            <Checkbox name="state-indeterminate" indeterminate />
          </div>

          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
              Indeterminate Disabled
            </p>
            <Checkbox name="state-indeterminate-disabled" indeterminate disabled />
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
        {/* Unchecked State */}
        <div
          style={{
            border: '1px solid #e5e5e5',
            borderRadius: '8px',
            padding: '16px',
            minWidth: '200px',
          }}
        >
          <Checkbox label="All projects" />
          <div style={{ marginLeft: '28px', marginTop: '12px' }}>
            <Checkbox label="Project 1" style={{ marginBottom: '8px' }} />
            <Checkbox label="Project 2" style={{ marginBottom: '8px' }} />
            <Checkbox label="Project 3" />
          </div>
        </div>

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
            <Checkbox
              label="Project 1"
              checked={projects.project1}
              onChange={handleProjectChange('project1')}
              style={{ marginBottom: '8px' }}
            />
            <Checkbox
              label="Project 2"
              checked={projects.project2}
              onChange={handleProjectChange('project2')}
              style={{ marginBottom: '8px' }}
            />
            <Checkbox
              label="Project 3"
              checked={projects.project3}
              onChange={handleProjectChange('project3')}
            />
          </div>
        </div>

        {/* All Checked State */}
        <div
          style={{
            border: '1px solid #e5e5e5',
            borderRadius: '8px',
            padding: '16px',
            minWidth: '200px',
          }}
        >
          <Checkbox label="All projects" defaultChecked />
          <div style={{ marginLeft: '28px', marginTop: '12px' }}>
            <Checkbox label="Project 1" defaultChecked style={{ marginBottom: '8px' }} />
            <Checkbox label="Project 2" defaultChecked style={{ marginBottom: '8px' }} />
            <Checkbox label="Project 3" defaultChecked />
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Anatomy documentation
 */
export const Anatomy: Story = {
  render: () => (
    <div style={{ padding: '24px', maxWidth: '800px' }}>
      <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: 600 }}>Anatomy</h2>

      <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
        <Checkbox label="Label" helperText="Helper text" counter counterValue={9999} />

        <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
          <div style={{ marginBottom: '8px' }}>
            <strong>1.</strong> checkbox
          </div>
          <div style={{ marginBottom: '8px' }}>
            <strong>2.</strong> label
          </div>
          <div style={{ marginBottom: '8px' }}>
            <strong>3.</strong> helper text (optional)
          </div>
          <div style={{ marginBottom: '8px' }}>
            <strong>4.</strong> counter (optional)
          </div>
        </div>
      </div>
    </div>
  ),
};

import { colors, radii } from '@company/tokens';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Design Tokens/Colors',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;

const ColorSwatch = ({ color, name }: { color: string; name: string }) => (
  <div style={{ textAlign: 'center' }}>
    <div
      style={{
        width: '80px',
        height: '80px',
        backgroundColor: color,
        borderRadius: radii.md,
        border: '1px solid #e5e5e5',
        marginBottom: '8px',
      }}
    />
    <div style={{ fontSize: '12px', fontWeight: 500 }}>{name}</div>
    <div style={{ fontSize: '11px', color: '#737373' }}>{color}</div>
  </div>
);

export const Brand: StoryObj = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: '24px',
      }}
    >
      {Object.entries(colors.brand).map(([shade, color]) => (
        <ColorSwatch key={shade} color={color} name={shade} />
      ))}
    </div>
  ),
};

export const Neutral: StoryObj = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: '24px',
      }}
    >
      {Object.entries(colors.neutral).map(([shade, color]) => (
        <ColorSwatch key={shade} color={color} name={shade} />
      ))}
    </div>
  ),
};

export const Semantic: StoryObj = {
  render: () => (
    <div>
      <h3 style={{ marginBottom: '16px' }}>Success</h3>
      <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
        {Object.entries(colors.success).map(([shade, color]) => (
          <ColorSwatch key={shade} color={color} name={shade} />
        ))}
      </div>

      <h3 style={{ marginBottom: '16px' }}>Warning</h3>
      <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
        {Object.entries(colors.warning).map(([shade, color]) => (
          <ColorSwatch key={shade} color={color} name={shade} />
        ))}
      </div>

      <h3 style={{ marginBottom: '16px' }}>Error</h3>
      <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
        {Object.entries(colors.error).map(([shade, color]) => (
          <ColorSwatch key={shade} color={color} name={shade} />
        ))}
      </div>

      <h3 style={{ marginBottom: '16px' }}>Info</h3>
      <div style={{ display: 'flex', gap: '24px' }}>
        {Object.entries(colors.info).map(([shade, color]) => (
          <ColorSwatch key={shade} color={color} name={shade} />
        ))}
      </div>
    </div>
  ),
};

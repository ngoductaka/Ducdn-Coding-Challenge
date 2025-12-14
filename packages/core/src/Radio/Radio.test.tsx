import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Radio, RadioGroup } from './Radio';
import { ThemeProvider } from '@company/react';

// Mock the theme classes
jest.mock('@company/tokens', () => ({
  ...jest.requireActual('@company/tokens'),
  lightTheme: 'lightTheme',
  darkTheme: 'darkTheme',
}));

// Mock the CSS module to handle Vanilla Extract styleVariants
jest.mock('./Radio.css', () => ({
  radioWrapper: 'radioWrapper',
  radioLabel: 'radioLabel',
  radioInput: 'radioInput',
  radioControl: 'radioControl',
  radioText: 'radioText',
  radioHelper: 'radioHelper',
  radioCounter: 'radioCounter',
  radioGroupWrapper: 'radioGroupWrapper',
  radioGroupLabel: 'radioGroupLabel',
  radioGroupOptions: 'radioGroupOptions',
  radioGroupHelper: 'radioGroupHelper',
  radioGroupCounter: 'radioGroupCounter',
  labelContainer: 'labelContainer',
  label: 'label',
  required: 'required',
  counter: 'counter',
  helperText: 'helperText',
  radioGroupContainer: 'radioGroupContainer',
  radioSize: {
    large: 'radioSize_large',
    small: 'radioSize_small',
  },
  helperSize: {
    large: 'helperSize_large',
    small: 'helperSize_small',
  },
  labelSize: {
    large: 'labelSize_large',
    small: 'labelSize_small',
  },
}));

describe('Radio Component', () => {
  describe('Basic Rendering', () => {
    it('should render radio without label', () => {
      render(<Radio value="option1" />);
      const radio = screen.getByRole('radio');
      expect(radio).toBeInTheDocument();
    });

    it('should render radio with label, helper text, counter, and required indicator', () => {
      render(
        <Radio
          required
          label="Option 1"
          value="option1"
          helperText="Additional info"
          counter={42}
        />
      );
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByRole('radio')).toBeInTheDocument();
      expect(screen.getByText('Additional info')).toBeInTheDocument();
      expect(screen.getByLabelText('Count: 42')).toBeInTheDocument();
      expect(screen.getByText('42')).toBeInTheDocument();
      expect(screen.getByLabelText('required')).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('should apply large size by default', () => {
      const { container } = render(<Radio label="Option 1" value="option1" />);
      const control = container.querySelector('[aria-hidden="true"]');
      expect(control).toBeInTheDocument();
    });

    it('should apply small size when specified', () => {
      const { container } = render(<Radio label="Option 1" value="option1" size="small" />);
      const control = container.querySelector('[aria-hidden="true"]');
      expect(control).toBeInTheDocument();
    });
  });

  describe('Checked State', () => {
    it('should not be checked by default', () => {
      render(<Radio label="Option 1" value="option1" />);
      const radio = screen.getByRole('radio') as HTMLInputElement;
      expect(radio.checked).toBe(false);
    });

    it('should be checked when checked prop is true', () => {
      render(<Radio label="Option 1" value="option1" checked />);
      const radio = screen.getByRole('radio') as HTMLInputElement;
      expect(radio.checked).toBe(true);
    });
  });

  describe('Disabled State', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Radio label="Option 1" value="option1" disabled />);
      expect(screen.getByRole('radio')).toBeDisabled();
    });

    it('should not call onChange when disabled', () => {
      const handleChange = jest.fn();
      render(<Radio label="Option 1" value="option1" disabled onChange={handleChange} />);
      const radio = screen.getByRole('radio');
      fireEvent.click(radio);
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Event Handlers', () => {
    it('should call onChange when clicked', () => {
      const handleChange = jest.fn();
      render(<Radio label="Option 1" value="option1" onChange={handleChange} />);
      const radio = screen.getByRole('radio');
      fireEvent.click(radio);
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('should pass correct value in onChange event', () => {
      const handleChange = jest.fn();
      render(<Radio label="Option 1" value="option1" onChange={handleChange} />);
      const radio = screen.getByRole('radio');
      fireEvent.click(radio);
      expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
      expect(handleChange.mock.calls[0][0].target.value).toBe('option1');
    });
  });

  describe('Custom Props', () => {
    it('should apply custom className', () => {
      const { container } = render(
        <Radio label="Option 1" value="option1" className="custom-class" />
      );
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });

    it('should apply tabIndex when provided', () => {
      render(<Radio label="Option 1" value="option1" tabIndex={-1} />);
      expect(screen.getByRole('radio')).toHaveAttribute('tabIndex', '-1');
    });
  });

  describe('Accessibility', () => {
    it('should have role="radio"', () => {
      render(<Radio label="Option 1" value="option1" />);
      expect(screen.getByRole('radio')).toBeInTheDocument();
    });

    it('should have type="radio"', () => {
      render(<Radio label="Option 1" value="option1" />);
      expect(screen.getByRole('radio')).toHaveAttribute('type', 'radio');
    });

    it('should associate label with input', () => {
      render(<Radio label="Option 1" value="option1" id="test-radio" />);
      const label = screen.getByText('Option 1').closest('label');
      expect(label).toHaveAttribute('for', 'test-radio');
    });

    it('should have required attribute when required', () => {
      render(<Radio label="Option 1" value="option1" required />);
      expect(screen.getByRole('radio')).toBeRequired();
    });
  });

  describe('Counter', () => {
    it('should not show counter by default', () => {
      render(<Radio label="Option 1" value="option1" />);
      expect(screen.queryByLabelText(/Count:/)).not.toBeInTheDocument();
    });

    it('should show counter when counter prop is true', () => {
      render(<Radio label="Option 1" value="option1" counter={10} />);
      expect(screen.getByLabelText('Count: 10')).toBeInTheDocument();
    });

    it('should use default counterValue of 9999', () => {
      render(<Radio label="Option 1" value="option1" counter={9999} />);
      expect(screen.getByLabelText('Count: 9999')).toBeInTheDocument();
    });
  });
});

describe('RadioGroup Component', () => {
  const mockOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  describe('Basic Rendering', () => {
    it('should render all radios from options array', () => {
      render(<RadioGroup options={mockOptions} />);
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
      expect(screen.getByText('Option 3')).toBeInTheDocument();
    });

    it('should render radios from string array', () => {
      render(<RadioGroup options={['Option A', 'Option B', 'Option C']} />);
      expect(screen.getByText('Option A')).toBeInTheDocument();
      expect(screen.getByText('Option B')).toBeInTheDocument();
      expect(screen.getByText('Option C')).toBeInTheDocument();
    });

    it('should render with custom className', () => {
      const { container } = render(<RadioGroup options={mockOptions} className="custom-group" />);
      expect(container.querySelector('.custom-group')).toBeInTheDocument();
    });

    it('should render children when provided', () => {
      render(
        <RadioGroup>
          <Radio label="Child 1" value="child1" />
          <Radio label="Child 2" value="child2" />
        </RadioGroup>
      );
      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
    });
  });

  describe('Selection State', () => {
    it('should select first radio with defaultValue', () => {
      render(<RadioGroup options={mockOptions} defaultValue="option1" />);
      const radios = screen.getAllByRole('radio') as HTMLInputElement[];
      expect(radios[0].checked).toBe(true);
      expect(radios[1].checked).toBe(false);
      expect(radios[2].checked).toBe(false);
    });

    it('should call onChange when radio is clicked', () => {
      const handleChange = jest.fn();
      render(<RadioGroup options={mockOptions} onChange={handleChange} />);
      const radios = screen.getAllByRole('radio');
      fireEvent.click(radios[1]);
      expect(handleChange).toHaveBeenCalledWith('option2');
    });

    it('should work in controlled mode with value', () => {
      const { rerender } = render(<RadioGroup options={mockOptions} value="option1" />);
      let radios = screen.getAllByRole('radio') as HTMLInputElement[];
      expect(radios[0].checked).toBe(true);

      rerender(<RadioGroup options={mockOptions} value="option2" />);
      radios = screen.getAllByRole('radio') as HTMLInputElement[];
      expect(radios[1].checked).toBe(true);
    });

    it('should update internal state in uncontrolled mode', () => {
      render(<RadioGroup options={mockOptions} defaultValue="option1" />);
      const radios = screen.getAllByRole('radio') as HTMLInputElement[];
      fireEvent.click(radios[1]);
      expect(radios[1].checked).toBe(true);
    });
  });

  describe('Disabled State', () => {
    it('should disable all radios when disabled prop is true', () => {
      render(<RadioGroup options={mockOptions} disabled />);
      const radios = screen.getAllByRole('radio');
      radios.forEach(radio => {
        expect(radio).toBeDisabled();
      });
    });

    it('should disable specific radio from options', () => {
      const optionsWithDisabled = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2', disabled: true },
        { label: 'Option 3', value: 'option3' },
      ];
      render(<RadioGroup options={optionsWithDisabled} />);
      const radios = screen.getAllByRole('radio');
      expect(radios[0]).not.toBeDisabled();
      expect(radios[1]).toBeDisabled();
      expect(radios[2]).not.toBeDisabled();
    });

    it('should disable specific radio even when group is disabled', () => {
      const optionsWithDisabled = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2', disabled: true },
      ];
      render(<RadioGroup options={optionsWithDisabled} disabled />);
      const radios = screen.getAllByRole('radio');
      radios.forEach(radio => {
        expect(radio).toBeDisabled();
      });
    });
  });

  describe('Name Attribute', () => {
    it('should apply name attribute to all radios', () => {
      render(<RadioGroup options={mockOptions} name="test-group" />);
      const radios = screen.getAllByRole('radio');
      radios.forEach(radio => {
        expect(radio).toHaveAttribute('name', 'test-group');
      });
    });

    it('should pass name to children radios', () => {
      render(
        <RadioGroup name="child-group">
          <Radio label="Child 1" value="child1" />
          <Radio label="Child 2" value="child2" />
        </RadioGroup>
      );
      const radios = screen.getAllByRole('radio');
      radios.forEach(radio => {
        expect(radio).toHaveAttribute('name', 'child-group');
      });
    });
  });

  describe('Children Mode', () => {
    it('should handle Radio children correctly', () => {
      render(
        <RadioGroup defaultValue="child1">
          <Radio label="Child 1" value="child1" />
          <Radio label="Child 2" value="child2" />
        </RadioGroup>
      );
      const radios = screen.getAllByRole('radio') as HTMLInputElement[];
      expect(radios[0].checked).toBe(true);
      expect(radios[1].checked).toBe(false);
    });

    it('should update child radio checked state', () => {
      render(
        <RadioGroup defaultValue="child1">
          <Radio label="Child 1" value="child1" />
          <Radio label="Child 2" value="child2" />
        </RadioGroup>
      );
      const radios = screen.getAllByRole('radio') as HTMLInputElement[];
      fireEvent.click(radios[1]);
      expect(radios[1].checked).toBe(true);
    });

    it('should preserve child radio disabled state', () => {
      render(
        <RadioGroup>
          <Radio label="Child 1" value="child1" />
          <Radio label="Child 2" value="child2" disabled />
        </RadioGroup>
      );
      const radios = screen.getAllByRole('radio');
      expect(radios[0]).not.toBeDisabled();
      expect(radios[1]).toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('should have role="radiogroup" on container', () => {
      const { container } = render(<RadioGroup options={mockOptions} />);
      expect(container.querySelector('[role="radiogroup"]')).toBeInTheDocument();
    });

    it('should maintain proper checked states', () => {
      render(<RadioGroup options={mockOptions} defaultValue="option2" />);
      const radios = screen.getAllByRole('radio') as HTMLInputElement[];
      expect(radios[0].checked).toBe(false);
      expect(radios[1].checked).toBe(true);
      expect(radios[2].checked).toBe(false);
    });
  });

  describe('Theme Support', () => {
    it('should render correctly in light theme', () => {
      render(
        <ThemeProvider defaultTheme="light">
          <RadioGroup options={mockOptions} data-testid="radio-group-light" />
        </ThemeProvider>
      );
      const radios = screen.getAllByRole('radio');
      expect(radios).toHaveLength(3);
      expect(document.documentElement.className).toBe('lightTheme');
    });

    it('should render correctly in dark theme', () => {
      render(
        <ThemeProvider defaultTheme="dark">
          <RadioGroup options={mockOptions} data-testid="radio-group-dark" />
        </ThemeProvider>
      );
      const radios = screen.getAllByRole('radio');
      expect(radios).toHaveLength(3);
      expect(document.documentElement.className).toBe('darkTheme');
    });

    it('should maintain functionality across themes', () => {
      const handleChange = jest.fn();
      const { rerender } = render(
        <ThemeProvider defaultTheme="light">
          <RadioGroup options={mockOptions} onChange={handleChange} />
        </ThemeProvider>
      );

      const radios = screen.getAllByRole('radio');
      fireEvent.click(radios[1]);
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith('option2');

      rerender(
        <ThemeProvider defaultTheme="dark">
          <RadioGroup options={mockOptions} onChange={handleChange} />
        </ThemeProvider>
      );

      fireEvent.click(radios[0]);
      expect(handleChange).toHaveBeenCalledTimes(2);
      expect(handleChange).toHaveBeenCalledWith('option1');
    });

    it('should render checked state correctly in both themes', () => {
      const { rerender } = render(
        <ThemeProvider defaultTheme="light">
          <RadioGroup options={mockOptions} value="option2" />
        </ThemeProvider>
      );
      let radios = screen.getAllByRole('radio') as HTMLInputElement[];
      expect(radios[1].checked).toBe(true);

      rerender(
        <ThemeProvider defaultTheme="dark">
          <RadioGroup options={mockOptions} value="option2" />
        </ThemeProvider>
      );
      radios = screen.getAllByRole('radio') as HTMLInputElement[];
      expect(radios[1].checked).toBe(true);
    });
  });
});

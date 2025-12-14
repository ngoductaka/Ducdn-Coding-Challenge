import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Checkbox, CheckboxGroup } from './Checkbox';
import { ThemeProvider } from '@company/react';

// Mock the theme classes
jest.mock('@company/tokens', () => ({
  ...jest.requireActual('@company/tokens'),
  lightTheme: 'lightTheme',
  darkTheme: 'darkTheme',
}));

jest.mock('./Checkbox.css', () => ({
  checkboxWrapper: 'checkboxWrapper',
  checkboxLabel: 'checkboxLabel',
  checkboxContainer: 'checkboxContainer',
  checkboxInput: 'checkboxInput',
  checkboxControl: 'checkboxControl',
  labelContainer: 'labelContainer',
  label: 'label',
  counter: 'counter',
  helperText: 'helperText',
  indeterminateState: 'indeterminateState',
  checkboxSize: {
    default: 'checkboxSize_default',
    small: 'checkboxSize_small',
  },
  labelSize: {
    default: 'labelSize_default',
    small: 'labelSize_small',
  },
  helperGap: {
    default: 'helperGap_default',
    small: 'helperGap_small',
  },
}));

describe('Checkbox Component', () => {
  describe('Basic Rendering', () => {
    it('should render checkbox without label', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('should render checkbox with label, helper text, counter, and required indicator', () => {
      render(
        <Checkbox
          required
          label="Accept terms"
          helperText="You must accept the terms"
          counter
          counterValue={42}
        />
      );
      expect(screen.getByText('Accept terms')).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
      expect(screen.getByText('You must accept the terms')).toBeInTheDocument();
      expect(screen.getByLabelText('Count: 42')).toBeInTheDocument();
      expect(screen.getByText('42')).toBeInTheDocument();
      expect(screen.getByLabelText('required')).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('should apply default size by default', () => {
      const { container } = render(<Checkbox label="Accept" />);
      const control = container.querySelector('[aria-hidden="true"]');
      expect(control).toBeInTheDocument();
      expect(control).toHaveClass('checkboxSize_default');
    });

    it('should apply small size when specified', () => {
      const { container } = render(<Checkbox label="Accept" size="small" />);
      const control = container.querySelector('[aria-hidden="true"]');
      expect(control).toBeInTheDocument();
      expect(control).toHaveClass('checkboxSize_small');
    });
  });

  describe('Checked State', () => {
    it('should not be checked by default', () => {
      render(<Checkbox label="Accept" />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
    });

    it('should be checked when checked prop is true', () => {
      render(<Checkbox label="Accept" checked onChange={() => {}} />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });
  });

  describe('Indeterminate State', () => {
    it('should not be indeterminate by default', () => {
      render(<Checkbox label="Accept" />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(false);
    });

    it('should be indeterminate when indeterminate prop is true', () => {
      render(<Checkbox label="Accept" indeterminate />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(true);
    });

    it('should apply indeterminate styling', () => {
      const { container } = render(<Checkbox label="Accept" indeterminate />);
      const control = container.querySelector('[aria-hidden="true"]');
      expect(control).toHaveClass('indeterminateState');
    });
  });

  describe('Disabled State', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Checkbox label="Accept" disabled />);
      expect(screen.getByRole('checkbox')).toBeDisabled();
    });

    it('should still trigger onChange when disabled and clicked', () => {
      const handleChange = jest.fn();
      render(<Checkbox label="Accept" disabled onChange={handleChange} />);
      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('Event Handlers', () => {
    it('should call onChange when clicked', () => {
      const handleChange = jest.fn();
      render(<Checkbox label="Accept" onChange={handleChange} />);
      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('should pass correct checked value in onChange event', () => {
      const handleChange = jest.fn();
      render(<Checkbox label="Accept" onChange={handleChange} />);
      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
      expect(handleChange.mock.calls[0][0].target.checked).toBe(true);
    });
  });

  describe('Custom Props', () => {
    it('should apply custom className', () => {
      const { container } = render(<Checkbox label="Accept" className="custom-class" />);
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });

    it('should apply tabIndex when provided', () => {
      render(<Checkbox label="Accept" tabIndex={-1} />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('tabIndex', '-1');
    });

    it('should forward additional props', () => {
      render(<Checkbox label="Accept" data-testid="custom-checkbox" />);
      expect(screen.getByTestId('custom-checkbox')).toBeInTheDocument();
    });

    it('should forward ref', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Checkbox label="Accept" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.type).toBe('checkbox');
    });

    it('should use custom id when provided', () => {
      render(<Checkbox label="Accept" id="custom-id" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('id', 'custom-id');
    });

    it('should generate unique id when not provided', () => {
      const { container: container1 } = render(<Checkbox label="Accept 1" />);
      const { container: container2 } = render(<Checkbox label="Accept 2" />);
      const checkbox1 = container1.querySelector('input');
      const checkbox2 = container2.querySelector('input');
      expect(checkbox1?.id).toBeDefined();
      expect(checkbox2?.id).toBeDefined();
      expect(checkbox1?.id).not.toBe(checkbox2?.id);
    });
  });

  describe('Accessibility', () => {
    it('should have role="checkbox"', () => {
      render(<Checkbox label="Accept" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('should have type="checkbox"', () => {
      render(<Checkbox label="Accept" />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('type', 'checkbox');
    });

    it('should associate label with input', () => {
      render(<Checkbox label="Accept" id="test-checkbox" />);
      const label = screen.getByText('Accept').closest('label');
      expect(label).toHaveAttribute('for', 'test-checkbox');
    });

    it('should have required attribute when required', () => {
      render(<Checkbox label="Accept" required />);
      expect(screen.getByRole('checkbox')).toBeRequired();
    });

    it('should have aria-hidden on visual control', () => {
      const { container } = render(<Checkbox label="Accept" />);
      const control = container.querySelector('.checkboxControl');
      expect(control).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Counter', () => {
    it('should not show counter by default', () => {
      render(<Checkbox label="Accept" />);
      expect(screen.queryByLabelText(/Count:/)).not.toBeInTheDocument();
    });

    it('should show counter when counter prop is true', () => {
      render(<Checkbox label="Accept" counter counterValue={10} />);
      expect(screen.getByLabelText('Count: 10')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('should use default counterValue of 9999', () => {
      render(<Checkbox label="Accept" counter />);
      expect(screen.getByLabelText('Count: 9999')).toBeInTheDocument();
      expect(screen.getByText('9999')).toBeInTheDocument();
    });

    it('should not show counter when counterValue is 0', () => {
      render(<Checkbox label="Accept" counter counterValue={0} />);
      expect(screen.queryByLabelText(/Count:/)).not.toBeInTheDocument();
    });
  });

  describe('Helper Text', () => {
    it('should not show helper text by default', () => {
      render(<Checkbox label="Accept" />);
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    });

    it('should show helper text when provided', () => {
      render(<Checkbox label="Accept" helperText="This is helper text" />);
      expect(screen.getByText('This is helper text')).toBeInTheDocument();
    });

    it('should apply size-specific gap for helper text', () => {
      const { container } = render(<Checkbox label="Accept" helperText="Helper" size="small" />);
      const helperElement = screen.getByText('Helper');
      expect(helperElement).toHaveClass('helperGap_small');
    });
  });

  describe('Label Rendering', () => {
    it('should not render label container when no label provided', () => {
      const { container } = render(<Checkbox />);
      expect(container.querySelector('.labelContainer')).not.toBeInTheDocument();
    });

    it('should render label with correct size class', () => {
      render(<Checkbox label="Accept" size="small" />);
      const labelElement = screen.getByText('Accept');
      expect(labelElement).toHaveClass('labelSize_small');
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing onChange gracefully', () => {
      render(<Checkbox label="Accept" />);
      const checkbox = screen.getByRole('checkbox');
      expect(() => fireEvent.click(checkbox)).not.toThrow();
    });

    it('should handle both checked and indeterminate states', () => {
      render(<Checkbox label="Accept" checked indeterminate onChange={() => {}} />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
      expect(checkbox.indeterminate).toBe(true);
    });

    it('should update indeterminate state when prop changes', () => {
      const { rerender } = render(<Checkbox label="Accept" indeterminate={false} />);
      let checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(false);

      rerender(<Checkbox label="Accept" indeterminate={true} />);
      checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(true);
    });

    it('should render without any optional props', () => {
      const { container } = render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
      expect(container.querySelector('.labelContainer')).not.toBeInTheDocument();
      expect(container.querySelector('.helperText')).not.toBeInTheDocument();
      expect(container.querySelector('.counter')).not.toBeInTheDocument();
    });
  });

  describe('Required Indicator', () => {
    it('should show asterisk when required', () => {
      render(<Checkbox label="Accept" required />);
      const requiredIndicator = screen.getByLabelText('required');
      expect(requiredIndicator).toBeInTheDocument();
      expect(requiredIndicator.textContent).toBe('*');
    });

    it('should not show asterisk when not required', () => {
      render(<Checkbox label="Accept" />);
      expect(screen.queryByLabelText('required')).not.toBeInTheDocument();
    });
  });

  describe('Theme Support', () => {
    it('should render correctly in light theme', () => {
      render(
        <ThemeProvider defaultTheme="light">
          <Checkbox label="Light theme checkbox" data-testid="checkbox-light" />
        </ThemeProvider>
      );
      const checkbox = screen.getByTestId('checkbox-light');
      expect(checkbox).toBeInTheDocument();
      expect(document.documentElement.className).toBe('lightTheme');
    });

    it('should render correctly in dark theme', () => {
      render(
        <ThemeProvider defaultTheme="dark">
          <Checkbox label="Dark theme checkbox" data-testid="checkbox-dark" />
        </ThemeProvider>
      );
      const checkbox = screen.getByTestId('checkbox-dark');
      expect(checkbox).toBeInTheDocument();
      expect(document.documentElement.className).toBe('darkTheme');
    });

    it('should maintain functionality across themes', () => {
      const handleChange = jest.fn();
      const { rerender } = render(
        <ThemeProvider defaultTheme="light">
          <Checkbox label="Theme test" onChange={handleChange} />
        </ThemeProvider>
      );

      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      expect(handleChange).toHaveBeenCalledTimes(1);

      rerender(
        <ThemeProvider defaultTheme="dark">
          <Checkbox label="Theme test" onChange={handleChange} />
        </ThemeProvider>
      );

      fireEvent.click(checkbox);
      expect(handleChange).toHaveBeenCalledTimes(2);
    });

    it('should render checked state correctly in both themes', () => {
      const { rerender } = render(
        <ThemeProvider defaultTheme="light">
          <Checkbox label="Checked" checked onChange={() => {}} />
        </ThemeProvider>
      );
      let checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(true);

      rerender(
        <ThemeProvider defaultTheme="dark">
          <Checkbox label="Checked" checked onChange={() => {}} />
        </ThemeProvider>
      );
      checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });

    it('should render disabled state correctly in both themes', () => {
      const { rerender } = render(
        <ThemeProvider defaultTheme="light">
          <Checkbox label="Disabled" disabled />
        </ThemeProvider>
      );
      let checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.disabled).toBe(true);

      rerender(
        <ThemeProvider defaultTheme="dark">
          <Checkbox label="Disabled" disabled />
        </ThemeProvider>
      );
      checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.disabled).toBe(true);
    });

    it('should render indeterminate state correctly in both themes', () => {
      const { rerender } = render(
        <ThemeProvider defaultTheme="light">
          <Checkbox label="Indeterminate" indeterminate />
        </ThemeProvider>
      );
      let checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(true);

      rerender(
        <ThemeProvider defaultTheme="dark">
          <Checkbox label="Indeterminate" indeterminate />
        </ThemeProvider>
      );
      checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(true);
    });
  });

  describe('CheckboxGroup', () => {
    describe('Basic Rendering', () => {
      it('should render checkbox group with children', () => {
        render(
          <CheckboxGroup name="test-group">
            <Checkbox label="Option 1" value="1" />
            <Checkbox label="Option 2" value="2" />
            <Checkbox label="Option 3" value="3" />
          </CheckboxGroup>
        );
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
        expect(screen.getByText('Option 3')).toBeInTheDocument();
      });

      it('should render checkbox group with options array', () => {
        render(
          <CheckboxGroup
            name="test-group"
            options={[
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
              { label: 'Option 3', value: '3' },
            ]}
          />
        );
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
        expect(screen.getByText('Option 3')).toBeInTheDocument();
      });

      it('should render checkbox group with simple string options', () => {
        render(<CheckboxGroup name="test-group" options={['Option 1', 'Option 2', 'Option 3']} />);
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
        expect(screen.getByText('Option 3')).toBeInTheDocument();
      });
    });

    describe('Value Management', () => {
      it('should handle controlled value', () => {
        const { rerender } = render(
          <CheckboxGroup name="test-group" value={['1']}>
            <Checkbox label="Option 1" value="1" />
            <Checkbox label="Option 2" value="2" />
          </CheckboxGroup>
        );
        const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
        expect(checkboxes[0].checked).toBe(true);
        expect(checkboxes[1].checked).toBe(false);

        rerender(
          <CheckboxGroup name="test-group" value={['1', '2']}>
            <Checkbox label="Option 1" value="1" />
            <Checkbox label="Option 2" value="2" />
          </CheckboxGroup>
        );
        expect(checkboxes[0].checked).toBe(true);
        expect(checkboxes[1].checked).toBe(true);
      });

      it('should handle uncontrolled value with defaultValue', () => {
        render(
          <CheckboxGroup name="test-group" defaultValue={['2']}>
            <Checkbox label="Option 1" value="1" />
            <Checkbox label="Option 2" value="2" />
            <Checkbox label="Option 3" value="3" />
          </CheckboxGroup>
        );
        const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
        expect(checkboxes[0].checked).toBe(false);
        expect(checkboxes[1].checked).toBe(true);
        expect(checkboxes[2].checked).toBe(false);
      });

      it('should call onChange with updated values when checkbox is toggled', () => {
        const handleChange = jest.fn();
        render(
          <CheckboxGroup name="test-group" value={['1']} onChange={handleChange}>
            <Checkbox label="Option 1" value="1" />
            <Checkbox label="Option 2" value="2" />
          </CheckboxGroup>
        );
        const checkbox2 = screen.getByLabelText('Option 2');
        fireEvent.click(checkbox2);
        expect(handleChange).toHaveBeenCalledWith(['1', '2']);
      });

      it('should remove value from array when unchecking', () => {
        const handleChange = jest.fn();
        render(
          <CheckboxGroup name="test-group" value={['1', '2']} onChange={handleChange}>
            <Checkbox label="Option 1" value="1" />
            <Checkbox label="Option 2" value="2" />
          </CheckboxGroup>
        );
        const checkbox1 = screen.getByLabelText('Option 1');
        fireEvent.click(checkbox1);
        expect(handleChange).toHaveBeenCalledWith(['2']);
      });
    });

    describe('Disabled State', () => {
      it('should disable all checkboxes when group is disabled', () => {
        render(
          <CheckboxGroup name="test-group" disabled>
            <Checkbox label="Option 1" value="1" />
            <Checkbox label="Option 2" value="2" />
          </CheckboxGroup>
        );
        const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
        expect(checkboxes[0].disabled).toBe(true);
        expect(checkboxes[1].disabled).toBe(true);
      });

      it('should disable individual checkboxes with disabled prop', () => {
        render(
          <CheckboxGroup name="test-group">
            <Checkbox label="Option 1" value="1" />
            <Checkbox label="Option 2" value="2" disabled />
          </CheckboxGroup>
        );
        const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
        expect(checkboxes[0].disabled).toBe(false);
        expect(checkboxes[1].disabled).toBe(true);
      });
    });
  });
});

import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';
import { useState } from 'react';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default modal with basic content
 */
export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Modal Title">
          <p>This is the modal content. It can contain any React components.</p>
          <p>The modal is fully accessible with keyboard navigation and focus management.</p>
        </Modal>
      </>
    );
  },
};

/**
 * Modal with footer actions
 */
export const WithFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal with Footer</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Confirm Action"
          footer={
            <>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Confirm
              </Button>
            </>
          }
        >
          <p>Are you sure you want to proceed with this action?</p>
          <p>This action cannot be undone.</p>
        </Modal>
      </>
    );
  },
};

/**
 * Modal with long content (scrollable)
 */
export const LongContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal with Long Content</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Terms and Conditions"
          footer={<Button onClick={() => setIsOpen(false)}>I Accept</Button>}
        >
          <div>
            <h3>1. Introduction</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>

            <h3>2. Terms of Use</h3>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>

            <h3>3. Privacy Policy</h3>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>

            <h3>4. Limitations</h3>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>

            <h3>5. Additional Terms</h3>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium.
            </p>

            <h3>6. Final Provisions</h3>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
              consequuntur magni dolores.
            </p>
          </div>
        </Modal>
      </>
    );
  },
};

/**
 * Modal that doesn't close on overlay click
 */
export const NoOverlayClose: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal (No Overlay Close)</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Important Notice"
          closeOnOverlayClick={false}
          footer={<Button onClick={() => setIsOpen(false)}>Close</Button>}
        >
          <p>This modal can only be closed using the close button or the Escape key.</p>
          <p>Clicking outside the modal will not close it.</p>
        </Modal>
      </>
    );
  },
};

/**
 * Modal that doesn't close on Escape key
 */
export const NoEscapeClose: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal (No Escape Close)</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Required Action"
          closeOnEsc={false}
          footer={<Button onClick={() => setIsOpen(false)}>I Understand</Button>}
        >
          <p>This modal requires you to acknowledge before closing.</p>
          <p>The Escape key will not close this modal.</p>
        </Modal>
      </>
    );
  },
};

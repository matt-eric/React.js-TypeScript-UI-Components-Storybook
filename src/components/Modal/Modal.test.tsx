import React from 'react';
import { render } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './Modal.stories';

const { Default } = composeStories(stories);

test('Renders a Backdrop component', () => {
  const component = render(<Default {...Default.args} />);
  const button = component.getByTestId('modal-button') as HTMLButtonElement;
  button.click();
  const backdrop = component.getByTestId('backdrop') as HTMLDivElement;
  expect(backdrop).toBeInTheDocument();
});
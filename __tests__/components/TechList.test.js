import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

import TechList from '~/components/TechList';

describe('TechList component', () => {
  // The local storage should be cleaned after the tests, 'cause it is shared
  // within all the tests
  beforeEach(() => {
    localStorage.clear();
  });

  it('should be able to add a new tech inside the list', () => {
    // The render is a virual DOM where the components will be rendered to
    // test some behaiviour or some functionallity
    const { getByText, getByTestId, getByLabelText } = render(<TechList />);

    // Fires a change for the input with the informed label
    fireEvent.change(getByLabelText('Tech'), {
      target: {
        value: 'Node.js',
      },
    });

    // Submits the form
    fireEvent.submit(getByTestId('tech-form'));

    // Function to help visualize the DOM after an event was triggered
    // debug();

    // Fire the click event above the button with the text "Add"
    // fireEvent.click(getByText('Add'));

    // debug();
    // Expect to exitst the text "Node.js" inside the DOM
    // expect(getByText('Node.js')).toBeTruthy();
    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
    expect(getByLabelText('Tech')).toHaveValue('');
  });

  it('should store the techs', () => {
    let { getByText, getByTestId, getByLabelText } = render(<TechList />);

    // Fires a change for the input with the informed label
    fireEvent.change(getByLabelText('Tech'), {
      target: {
        value: 'Node.js',
      },
    });

    // Submits the form
    fireEvent.submit(getByTestId('tech-form'));
    cleanup();

    // The parenthesis allows to use the object destructuring without the need
    // to redefine the values
    ({ getByText, getByTestId, getByLabelText } = render(<TechList />));

    // Test if the localStorage.setItem was called with the following params
    // That doesn't guarantee that the browser is providing the localStorage but give
    // the security that the function has been called and thus been communicated with the API
    // To test if the browser is providing the localStorage isn't a responsibility of the tests of the application
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'techs',
      JSON.stringify(['Node.js'])
    );

    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
  });
});

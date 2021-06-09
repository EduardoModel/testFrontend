import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';

import TechListRedux from '~/components/TechListRedux';

import { addTech } from '~/store/modules/techs/actions';

// The mock is basically to substitute the functions from the redux that are been
// used within the component
// The objective of the test isn't to test if the state of the redux is working but
// to verify if the behavior of the component is right
jest.mock('react-redux');

describe('TechListRedux', () => {
  // As reminder: this test is an an E2E test and not an integration test(the whole flux would be tested)!
  it('should retrieve the techs from the redux state and render them inside the component', () => {
    // Here the standard behavior of the function useSelector will be overwritten
    // In this case a static state will be defined and returned to the component
    useSelector.mockImplementation(callback =>
      callback({
        techs: ['Node.js', 'ReactJS'],
      })
    );

    const { getByText, getByTestId } = render(<TechListRedux />);

    // debug();

    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
    expect(getByTestId('tech-list')).toContainElement(getByText('ReactJS'));
  });

  // This test is only to verify if the function was called
  // The check if the tech was added inside the redux state doesn't belong to this test file
  // This responsability will be covered by the tests for the reducer
  it('should be able to add a new technology', () => {
    const { getByTestId, getByLabelText } = render(<TechListRedux />);

    // Define the dispatch as a mocked function from the jest library
    const dispatch = jest.fn();

    // Overwrite the value that will be returned by the call to the useDispatch function with the
    // function defined above
    useDispatch.mockReturnValue(dispatch);

    fireEvent.change(getByLabelText('Tech'), {
      target: { value: 'ReactNative' },
    });
    fireEvent.submit(getByTestId('tech-form'));

    // Check how many calls were done
    // console.log(dispatch.mock.calls);

    expect(dispatch).toHaveBeenCalledWith(addTech('ReactNative'));
  });
});

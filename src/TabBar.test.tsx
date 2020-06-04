import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { TabBar, Tabs } from './TabBar';

const tabs: Tabs = new Map([
  ['tab1', 'Tab 1'],
  ['tab2', 'Tab 2'],
]);

describe('TabBar', () => {
  it('should render like the snapshot', () => {
    const { container } = render(<TabBar activeId={'tab1'} switchTab={jest.fn()} tabs={tabs} />);

    expect(container).toMatchSnapshot();
  });

  it('it should call switchTab when a non-disabled button is clicked', () => {
    const switchTab = jest.fn();

    const { getAllByRole } = render(<TabBar activeId={'tab1'} switchTab={switchTab} tabs={tabs} />);
    const buttons = getAllByRole('tab');
    fireEvent.click(buttons[1]);

    expect(switchTab).toHaveBeenCalledWith('tab2');
  });

  it('it should not call switchTab when a disabled button is clicked', () => {
    const switchTab = jest.fn();

    const { getAllByRole } = render(<TabBar activeId={'tab1'} switchTab={switchTab} tabs={tabs} />);
    const buttons = getAllByRole('tab');
    fireEvent.click(buttons[0]);

    expect(switchTab).not.toHaveBeenCalled();
  });
});

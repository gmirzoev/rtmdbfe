import React from 'react';
import { shallow } from 'enzyme';
import Footer from 'components/Footer';

describe('Footer component', () => {
  it('should render correctly', () => {
    const component = shallow(<Footer />);
    expect(component).toMatchSnapshot();
  });
});

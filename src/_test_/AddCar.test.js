import React from 'react';
import AddCar from '../components/AddCar';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TextField from '@material-ui/core/TextField';



Enzyme.configure({ adapter: new Adapter() });

describe('<AddCar />', () => {
    it('renders six <TextInput /> components', () => {
      const wrapper = shallow(<AddCar />);
      expect(wrapper.find(TextField)).toHaveLength(6);
    });
});

describe('<AddCar /> onChange', () => {
    it('test onChange event', () => {
      const wrapper = shallow(<AddCar />);
      const brandInput = wrapper.find(TextField).at(0);
      brandInput.simulate('change', {target: {name: 'brand', value: 'My new value'}});
      expect(wrapper.state('brand')).toEqual('My new value');
}); });
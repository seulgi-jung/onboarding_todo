import { fn } from 'storybook/test';

import { BasicCheckbox } from '/src/components/form/basicCheckbox/BasicCheckbox';

export default {
  title: 'Component/Form/Checkbox/Basic',
  tags: ['autodocs'],
  render: (args) => BasicCheckbox(args),
  argTypes: {},
  args: { onClick: fn() },
};

export const Input = {
  args: {
    key: 'checkbox',
    label: 'checkbox',
    disabled: false,
    checked: false,
  },
};

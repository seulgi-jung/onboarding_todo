import { fn } from 'storybook/test';

import { BasicCheckbox } from '/src/components/form/basicCheckbox/BasicCheckbox';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Component/Form/Checkbox/Basic',
  tags: ['autodocs'],
  render: (args) => BasicCheckbox(args),
  argTypes: {},
  args: { onClick: fn() },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Input = {
  args: {
    key: 'checkbox',
    label: 'checkbox',
    disabled: false,
    checked: false,
  },
};

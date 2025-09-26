import './BasicCheckbox.css';

export const BasicCheckbox = ({ label, key, disabled = false, checked = false }) => {
  const isDisabled = disabled ? 'disabled' : '';
  const isChecked = checked ? 'checked' : '';

  return `
    <div class="base-checkbox"> 
      <input type="checkbox" id="${key}" ${isChecked} ${isDisabled}/>
      ${label && `<label for="${key}">${label}</label>`}
    </div>
  `;
};

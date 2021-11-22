export const showSpinner = (customName) => {
  const minus = customName ? '-' : '';
  const buttonName = customName || '';
  const spinner = document.getElementById(`${buttonName}${minus}spinner`);
  const submit = document.getElementById(`${buttonName}${minus}submit`);
  const button = document.getElementById(`${buttonName}${minus}button`);
  spinner.classList.remove('d-none');
  submit.classList.add('d-none');
  button.setAttribute('disabled', '');
};

export const hideSpinner = (customName) => {
  const minus = customName ? '-' : '';
  const buttonName = customName || '';
  const spinner = document.getElementById(`${buttonName}${minus}spinner`);
  const submit = document.getElementById(`${buttonName}${minus}submit`);
  const button = document.getElementById(`${buttonName}${minus}button`);
  spinner.classList.add('d-none');
  submit.classList.remove('d-none');
  button.removeAttribute('disabled', '');
};

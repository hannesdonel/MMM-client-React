// Checks if password repetition is correct
const handlePasswordCheck = (string, password) => {
  const alert = document.getElementById('passwordCheckHelpBlock');
  if (password === string || string === '') {
    alert.classList.add('d-none');
  } else {
    alert.classList.remove('d-none');
  }
};

export default handlePasswordCheck;

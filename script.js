const lengthSlider = document.querySelector('.pass-length input');
const spanLength = document.querySelector('.pass-length span');
const options = document.querySelectorAll('.option input');
const generateBtn = document.querySelector('.generate-btn');
const passwordInput = document.querySelector('.input-box input');
const passIndicator = document.querySelector('.pass-indicator');
const copyIcon = document.querySelector('.input-box span');

const characters = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '^!$%&|[](){}:;.,*+-#@<>~',
};

const generatePassword = () => {
  let staticPassword = '';
  let randomPassword = '';
  let excludeDuplicate = false;
  let passLength = lengthSlider.value;

  options.forEach((option) => {
    if (option.checked) {
      if (option.id !== 'exc-duplicate' && option.id !== 'spaces') {
        staticPassword += characters[option.id];
      } else if (option.id === 'spaces') {
        staticPassword += ` ${staticPassword} `;
      } else {
        excludeDuplicate = true;
      }
    }
  });

  for (let i = 0; i < passLength; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];

    if (excludeDuplicate) {
      !randomPassword.includes(randomChar) || randomChar == ' '
        ? (randomPassword += randomChar)
        : i--;
    } else {
      randomPassword += randomChar;
    }
  }

  passwordInput.value = randomPassword;
};

const updatePassIndicator = () => {
  passIndicator.id =
    lengthSlider.value <= 8
      ? 'weak'
      : lengthSlider.value <= 16
      ? 'medium'
      : 'strong';
};

const updateSlider = () => {
  spanLength.innerHTML = lengthSlider.value;
  generatePassword();
  updatePassIndicator();
};

updateSlider();

const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value);
  copyIcon.innerText = 'check';
  setTimeout(() => {
    copyIcon.innerText = 'copy_all';
  }, 1500);
};

lengthSlider.addEventListener('input', updateSlider);
generateBtn.addEventListener('click', generatePassword);
copyIcon.addEventListener('click', copyPassword);

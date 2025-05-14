const dialog = document.querySelector('.dialog');
const launchbutton = document.querySelector('#feedback-button');
const closeimage = document.querySelector('.close-button-container svg');
const closebutton = document.querySelector('.cancel-button');
const submitbutton = document.querySelector('.submit-button');
const payloadtext = document.querySelector('.feedback-text');
const button1 = document.querySelector('.button1');
const button2 = document.querySelector('.button2');
const button3 = document.querySelector('.button3');
const button4 = document.querySelector('.button4');
const button5 = document.querySelector('.button5');
const button6 = document.querySelector('.button6');
const button7 = document.querySelector('.button7');
const button8 = document.querySelector('.button8');
const button9 = document.querySelector('.button9');
const button10 = document.querySelector('.button10');
const buttons = [
  button1,
  button2,
  button3,
  button4,
  button5,
  button6,
  button7,
  button8,
  button9,
  button10,
];

launchbutton.addEventListener('click', launchDialog);
closeimage.addEventListener('click', closeDialog);
closebutton.addEventListener('click', closeDialog);
submitbutton.addEventListener('click', makeSububmit);
buttons.forEach((button) => {
  button.addEventListener('click', () => selectItem(button));
});
dialog.addEventListener('cancel', (e) => {
  e.preventDefault(); // Impide el cierre automático con Escape
  closeDialog();
});
const content = dialog.querySelector('.dialog-content');
dialog.addEventListener('mousedown', (e) => {
  if (!content.contains(e.target)) {
    dialog._shouldClose = true;
  }
});
dialog.addEventListener('mouseup', (e) => {
  if (dialog._shouldClose) {
    dialog._shouldClose = false;
    closeDialog();
  }
});

function launchDialog() {
  dialog.showModal();
  requestAnimationFrame(() => {
    dialog.classList.add('active');
  });
}

function closeDialog() {
  dialog.classList.remove('active');
  dialog.addEventListener('transitionend', handleTransitionEnd);
}

function handleTransitionEnd() {
  dialog.removeEventListener('transitionend', handleTransitionEnd);
  deselectItems();
  dialog.close();
}

function selectItem(item) {
  buttons.forEach((button) => {
    button.classList.remove('numbered');
  });
  item.classList.add('numbered');
}

function deselectItems() {
  buttons.forEach((button) => {
    button.classList.remove('numbered');
  });
}

function makeSububmit() {
  if (isAnyNumbered()) {
    makePayload();
    closeDialog();
  } else {
    alert('Please select a number.');
  }
}

function isAnyNumbered() {
  return buttons.some((button) => button.classList.contains('numbered'));
}

function makePayload() {
  payloadtext.innerHTML = 'You rated ';
  buttons.forEach((button) => {
    if (button.classList.contains('numbered')) {
      payloadtext.innerHTML += button.textContent;
    }
  });
}

const modeButtons = document.querySelectorAll('[data-mode]');
const ballButtons = document.querySelectorAll('[data-ball]');

let state = { mode: 'unlock', ball: 0 };

function render(nextState) {
  state = nextState;

  modeButtons.forEach(button => {
    button.classList.toggle('is-active', button.dataset.mode === state.mode);
    button.setAttribute('aria-pressed', String(button.dataset.mode === state.mode));
  });

  ballButtons.forEach(button => {
    button.classList.toggle('is-active', Number(button.dataset.ball) === state.ball);
    button.setAttribute('aria-pressed', String(Number(button.dataset.ball) === state.ball));
  });
}

async function save(partialState) {
  const response = await fetch('/state', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(partialState),
  });

  if (!response.ok) {
    console.error('Could not save state', await response.text());
  }
}

modeButtons.forEach(button => {
  button.addEventListener('click', () => save({ mode: button.dataset.mode }));
});

ballButtons.forEach(button => {
  button.addEventListener('click', () => save({ ball: Number(button.dataset.ball) }));
});

const events = new EventSource('/events');
events.onmessage = event => render(JSON.parse(event.data));
events.onerror = () => console.warn('Live connection interrupted; retrying automatically.');

fetch('/state')
  .then(response => response.json())
  .then(render)
  .catch(error => console.error('Could not load state', error));

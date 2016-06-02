import view from './view';
import model from './model';
import intent from './intent';
import locationEffects from './locationEffects';

export default function main({ DOM, location }) {
  const intents = intent({ DOM, location });
  return {
    DOM: view(model(intents)),
    location: locationEffects(intents),
  };
}

export default function locationEffects({ state$ }) {
  return state$.map(checked => ({ pathname: checked ? '/yes' : '/no' }));
}

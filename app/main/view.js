import { div, input, p } from '@cycle/dom';

import README from '../../README.md';
import HtmlWidget from '../widgets/HtmlWidget';

export default function view({ isChecked$ }) {
  return isChecked$.map(checked =>
    div([
      input({ type: 'checkbox', checked }),
      ' Toggle me',
      p([checked ? 'ON' : 'off']),
      div([new HtmlWidget(README)]),
    ])
  );
}

import { h } from './element';
import { cssPrefix } from '../config';

export default class SortFilter {
  constructor() {
    this.el = h('div', `${cssPrefix}-tip`).children(
      '排序',
    ).hide();
  }

  show() {
    this.el.show();
  }

  setOffset(v) {
    this.el.offset(v).show();
  }

  hide() {
    this.el.hide();
  }
}

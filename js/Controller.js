import {
  Observer,
  NUMERICKEY,
  EQUALKEY,
  OPERATIONKEY,
  INVERTKEY,
} from "./main.js";

import { CalcView } from "./CalcView.js";

export class Controller {
  model;
  view;

  constructor(model) {
    this.model = model;
    this.view = new CalcView(this);

    this.observer = new Observer(this.view);
    model.setObserver(this.observer);
  }

  // ACを押した場合の動作
  handleAllClearKey() {
    // 電卓の操作（modelに対し操作する）
    this.model.initialize();

    // 再描画（viewに対し操作する）
    this.render();

    this.view.clear();
  }

  // 数字キーを押したとき
  handleNumericKey(data) {
    // 電卓の操作（modelに対し操作する）
    this.model.stateChange(NUMERICKEY, data.toString(10));

    // 再描画（viewに対し操作する）
    this.render();
  }

  // 演算キーを押したとき
  handleCalclateKey(data) {
    // 電卓の操作（modelに対し操作する）
    if (data === "=") {
      // イコールキーを押下したとき
      this.model.stateChange(EQUALKEY, data);
    } else {
      this.model.stateChange(OPERATIONKEY, data);
    }

    // 再描画（viewに対し操作する）
    this.render();
  }

  // 「.」キーを押したとき。文字列から.を見つけ、入力を制限する
  // 「.」は数値キー扱い
  handleDotKey(data) {
    // 電卓の操作（modelに対し操作する）
    this.model.stateChange(NUMERICKEY, data);

    // 再描画（viewに対し操作する）
    this.render();
  }

  // 反転キーを押したとき。
  handleInvertKey() {
    // 電卓の操作（modelに対し操作する）
    this.model.stateChange(INVERTKEY, "");

    // 再描画（viewに対し操作する）
    this.render();
  }

  // 状態が変更されたので再描画
  render() {
    // 何もしない。
    // this.view.update(this.model.getInputBuffer());
    // observerに画面描画をゆだねている。
  }
}

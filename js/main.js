import { CalcModel } from "./CalcModel.js";
import { Controller } from "./Controller.js";

// アクション定義変数
export const NUMERICKEY = 0; // 数値キー
export const OPERATIONKEY = 1; // 演算キー
export const EQUALKEY = 2; // イコールキー
export const INVERTKEY = 3; // 反転キー

//
export class Observer {
  view;

  constructor(view) {
    this.view = view;
  }

  notify(model) {
    this.view.update(model.getInputBuffer());
  }
}

// 電卓model
const calcModel = new CalcModel();
const controller = new Controller(calcModel);

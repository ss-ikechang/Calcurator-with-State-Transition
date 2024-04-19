import { CalcModel } from "./CalcModel.js";
import { CalcView } from "./CalcView.js";

// アクション定義変数
const NUMERICKEY = 0; // 数値キー
const OPERATIONKEY = 1; // 演算キー
const EQUALKEY = 2; // イコールキー
const INVERTKEY = 3; // 反転キー

// 電卓表示部
const screen = document.getElementById("screen");

// 電卓model
const calcModel = new CalcModel(new CalcView(screen));

// ACを押した場合の動作
const allClearKey = () => {
  calcModel.initialize();
};

// 数字キーを押したとき
const numericKey = (data) => {
  calcModel.stateChange(NUMERICKEY, data.toString(10));
};

// 演算キーを押したとき
const calclateKey = (data) => {
  if (data === "=") {
    // イコールキーを押下したとき
    calcModel.stateChange(EQUALKEY, data);
  } else {
    calcModel.stateChange(OPERATIONKEY, data);
  }
};

// 「.」キーを押したとき。文字列から.を見つけ、入力を制限する
// 「.」は数値キー扱い
const dotKey = (data) => {
  calcModel.stateChange(NUMERICKEY, data);
};

// 反転キーを押したとき。
const invertKey = () => {
  calcModel.stateChange(INVERTKEY, "");
};

// イベントリスナーを登録
document.querySelector("#btn-allcrear").addEventListener("click", allClearKey);

document.querySelector("#btn-add").addEventListener("click", () => {
  calclateKey("+");
});
document.querySelector("#btn-subtract").addEventListener("click", () => {
  calclateKey("-");
});
document.querySelector("#btn-multiply").addEventListener("click", () => {
  calclateKey("*");
});
document.querySelector("#btn-divide").addEventListener("click", () => {
  calclateKey("/");
});
document.querySelector("#btn-equal").addEventListener("click", () => {
  calclateKey("=");
});
document.querySelector("#btn-percent").addEventListener("click", () => {
  calclateKey("%");
});

document.querySelector("#btn-dot").addEventListener("click", () => {
  dotKey(".");
});

document.querySelector("#btn-zero").addEventListener("click", () => {
  numericKey(0);
});
document.querySelector("#btn-one").addEventListener("click", () => {
  numericKey(1);
});
document.querySelector("#btn-two").addEventListener("click", () => {
  numericKey(2);
});
document.querySelector("#btn-three").addEventListener("click", () => {
  numericKey(3);
});
document.querySelector("#btn-four").addEventListener("click", () => {
  numericKey(4);
});
document.querySelector("#btn-five").addEventListener("click", () => {
  numericKey(5);
});
document.querySelector("#btn-six").addEventListener("click", () => {
  numericKey(6);
});
document.querySelector("#btn-seven").addEventListener("click", () => {
  numericKey(7);
});
document.querySelector("#btn-eight").addEventListener("click", () => {
  numericKey(8);
});
document.querySelector("#btn-nine").addEventListener("click", () => {
  numericKey(9);
});

document.querySelector("#btn-inverted").addEventListener("click", () => {
  invertKey();
});

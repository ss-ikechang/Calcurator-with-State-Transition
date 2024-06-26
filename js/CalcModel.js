import { CalcView } from "./CalcView.js";
console.log("CalcModel.js: loaded");

// アクション定義変数
const NUMERICKEY = 0; // 数値キー
const OPERATIONKEY = 1; // 演算キー
const EQUALKEY = 2; // イコールキー
const INVERTKEY = 3; // 反転キー

// 計算機モデル
export class CalcModel {
  // 入力バッファ文字列
  #inputBuffer;

  // 状態管理数値変数
  // 状態0 ：起動後または「C」キーでの初期化後
  // 状態1 ：第一項数値入力中
  // 状態2 ：第一項数値入力後の演算キー入力中
  // 状態3 ：第二項数値入力中
  // 状態4 ：結果表示時中
  // 状態99：計算エラー時中
  #state;
  // 演算種類記憶文字列
  #operation;
  // 計算第１項数値変数
  #data1;
  // 計算第２項数値変数
  #data2;
  // 計算機VIEW
  #calcView;

  // 状態変化観察者
  observer;

  constructor() {
    console.log("CalcModel initialized");
    this.#inputBuffer = "0";
    console.log(this.#inputBuffer);

    // 状態管理数値変数
    this.#state = 0;
    // 演算種類記憶文字列
    this.#operation = "+";
    // 計算第１項数値変数
    this.#data1 = 0;
    // 計算第２項数値変数
    this.#data2 = 0;
    // 計算機VIEW
    // this.#calcView = calcview;
  }

  // 観察者追加
  setObserver(observer) {
    this.observer = observer;
  }

  // 観察者へ通知
  notifyObserver() {
    this.observer.notify(this);
  }

  // 初期化
  initialize() {
    this.inputBufferClear();
    this.#state = 0;
    this.#operation = "+";
    this.#data1 = 0;
    this.#data2 = 0;

    // screen.textContent = "0";
    // this.#calcView.clear();
    console.log(`状態：${this.#state}：入力：initializeed`);
  }

  // 状態遷移関数
  stateChange(action = NUMERICKEY, keyinput = "") {
    console.log(`状態：${this.#state}`);
    console.log(`キー入力：${keyinput}`);

    switch (this.#state) {
      case 0: // 状態0 ：起動後または「C」キーでの初期化後
        if (action === NUMERICKEY) {
          // 数値キーを押下した場合
          // 入力バッファにキー入力追加・電卓表示部更新
          this.numberDisplay(keyinput);
          this.#state = 1; // 状態１に遷移
        } else if (action === OPERATIONKEY) {
          // 演算キーを押下した場合
          // 状態０のまま
        } else if (action === EQUALKEY) {
          // イコールキーを押下した場合
          // 状態０のまま
        } else {
          // それ以外のケース
          // それ以外のケース
        }
        break;

      case 1: // 状態1 ：第一項数値入力中
        if (action === NUMERICKEY) {
          // 数値キーを押下した場合
          // 入力バッファにキー入力追加・電卓表示部更新
          this.numberDisplay(keyinput);
          // 状態１のまま
        } else if (action === OPERATIONKEY) {
          // 演算キーを押下した場合
          // 入力バッファのデータを数値化し第１項として保存
          this.#data1 = this.inputBufferToNumber();
          this.#operation = keyinput; // 演算種類記憶
          this.inputBufferClear(); // 入力バッファを空に
          // 電卓表示部更新しない
          this.#state = 2; // 状態２に遷移
        } else if (action === EQUALKEY) {
          // イコールキーを押下した場合
          // 電卓表示部更新しない
          this.#state = 4; // 状態４に遷移
        } else if (action === INVERTKEY) {
          // 反転キーを押下した場合
          // 符号反転表示・電卓表示部更新
          this.invertDisplay();
        } else {
          // それ以外のケース
          // それ以外のケース
        }
        break;

      case 2: // 状態2 ：第一項数値入力後の演算キー入力中
        if (action === NUMERICKEY) {
          // 数値キーを押下した場合
          // 入力バッファにキー入力追加・電卓表示部更新
          this.numberDisplay(keyinput);
          this.#state = 3; // 状態３に遷移
        } else if (action === OPERATIONKEY) {
          // 演算キーを押下した場合

          this.#operation = keyinput; // 演算種類記憶
          this.inputBufferClear(); // 入力バッファを空に
          // 電卓表示部更新しない
          // 状態２のまま
        } else if (action === EQUALKEY) {
          // イコールキーを押下した場合
          // 未定：仮実装：何もしない
        } else {
          // それ以外のケース
          // それ以外のケース
        }
        break;

      case 3: // 状態3 ：第二項数値入力中
        if (action === NUMERICKEY) {
          // 数値キーを押下した場合
          // 入力バッファにキー入力追加・電卓表示部更新
          this.numberDisplay(keyinput);
          // 状態３のまま
        } else if (action === OPERATIONKEY) {
          // 演算キーを押下した場合
          // 入力バッファのデータを数値化し第２項として保存
          this.#data2 = this.inputBufferToNumber();
          // 計算：［第１項］［第２項］［記憶している演算］
          let result = this.calculateNumber(
            this.#data1,
            this.#data2,
            this.#operation
          );
          // 　　　ここで計算エラー発生なら
          // 　　　　　入力バッファを空に
          // 　　　　　電卓表示部をエラー表示に更新
          // 　　　　　状態９９に遷移

          // 入力バッファを計算結果に更新
          // 電卓表示部更新
          this.resultDisplay(result);

          // 入力バッファのデータを数値化し第１項として保存
          this.#data1 = this.inputBufferToNumber();
          this.#operation = keyinput; // 演算種類記憶
          this.inputBufferClear(); // 入力バッファを空に
          // 電卓表示部更新しない

          this.#state = 2; // 状態２に遷移
        } else if (action === EQUALKEY) {
          // イコールキーを押下した場合
          // 入力バッファのデータを数値化し第２項として保存
          this.#data2 = this.inputBufferToNumber();
          // 計算：［第１項］［第２項］［記憶している演算］
          let result = this.calculateNumber(
            this.#data1,
            this.#data2,
            this.#operation
          );
          // 　　　ここで計算エラー発生なら
          // 　　　　　入力バッファを空に
          // 　　　　　電卓表示部をエラー表示に更新
          // 　　　　　状態９９に遷移

          // 入力バッファを計算結果に更新
          // 電卓表示部更新
          this.resultDisplay(result);

          this.#state = 4; // 状態４に遷移
        } else if (action === INVERTKEY) {
          // 反転キーを押下した場合
          // 符号反転表示・電卓表示部更新
          this.invertDisplay();
        } else {
          // それ以外のケース
          // それ以外のケース
        }
        break;

      case 4: // 状態4 ：結果表示時中
        if (action === NUMERICKEY) {
          // 数値キーを押下した場合
          // 入力バッファを空に
          this.inputBufferClear();
          // 入力バッファにキー入力追加・電卓表示部更新
          this.numberDisplay(keyinput);
          this.#state = 1; // 状態１に遷移
        } else if (action === OPERATIONKEY) {
          // 演算キーを押下した場合
          // 入力バッファのデータを数値化し第１項として保存
          this.#data1 = this.inputBufferToNumber();
          this.#operation = keyinput; // 演算種類記憶
          this.inputBufferClear(); // 入力バッファを空に
          // 電卓表示部更新しない
          this.#state = 2; // 状態２に遷移
        } else if (action === EQUALKEY) {
          // イコールキーを押下した場合
          // 未定：仮実装：何もしない
        } else {
          // それ以外のケース
          // それ以外のケース
        }
        break;

      default:
        // 式がいずれの値とも一致しないときに実行する処理
        break;
    }
  }

  // 計算：［第１項］［記憶している演算］［第２項］
  calculateNumber(value1 = 0, value2 = 0, ope = "+") {
    let result = 0;

    switch (ope) {
      case "+":
        result = value1 + value2;
        break;

      case "-":
        result = value1 - value2;
        break;

      case "*":
        result = value1 * value2;
        break;

      case "/":
        result = value1 / value2;
        break;

      case "%":
        result = value1 * (value2 / 100);
        break;

      default:
      // 式がいずれの値とも一致しないときに実行する処理;
    }
    return result;
  }

  // キー入力追加、入力桁数チェック、電卓表示部更新
  numberDisplay(keyinput = "0") {
    if (this.#inputBuffer === "0") {
      // 「０」がセットされている場合
      if (keyinput === ".") {
        // 「.」が押下された
        this.#inputBuffer = "0."; // 入力バッファに「0.」設定
      } else {
        this.#inputBuffer = keyinput; // 入力バッファにキー入力設定（追加せず「０」→数値文字に置き換え）
      }
    } else {
      if (this.#inputBuffer.length <= 8) {
        // 入力できる最大文字数以下なら
        if (keyinput === ".") {
          // 「.」が押下された
          if (!this.#inputBuffer.includes(".")) {
            // 入力バッファが「.」を含んでないなら
            this.#inputBuffer = this.#inputBuffer.concat(keyinput); // 入力バッファにキー入力追加
          }
        } else {
          this.#inputBuffer = this.#inputBuffer.concat(keyinput); // 入力バッファにキー入力追加
        }
      }
    }
    // 電卓表示部更新
    // this.#calcView.update(this.#inputBuffer);
    this.notifyObserver();
    return this.#inputBuffer;
  }

  // 入力バッファを計算結果に更新、電卓表示部更新
  resultDisplay(result = 0) {
    this.#inputBuffer = result.toString(10); // 入力バッファを計算結果に更新
    // 電卓表示部更新
    // this.#calcView.update(this.#inputBuffer);
    this.notifyObserver();
    return this.#inputBuffer;
  }

  // 符号反転、電卓表示部更新
  invertDisplay() {
    if (this.#inputBuffer.charAt(0) === "-") {
      this.#inputBuffer = this.#inputBuffer.slice(1);
    } else {
      this.#inputBuffer = "-" + this.#inputBuffer;
    }
    // 電卓表示部更新
    // this.#calcView.update(this.#inputBuffer);
    this.notifyObserver();
    return this.#inputBuffer;
  }

  // 入力バッファを数値化し返却
  inputBufferToNumber() {
    let data = 0;
    data = parseFloat(this.#inputBuffer); // 入力バッファのデータを数値化し返却
    return data;
  }

  // 入力バッファを空に
  inputBufferClear() {
    this.#inputBuffer = "0"; // 入力バッファを空に
  }

  // 入力バッファを返却
  getInputBuffer() {
    return this.#inputBuffer;
  }
}

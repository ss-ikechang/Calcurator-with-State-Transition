console.log("CalcModel.js: loaded");

// 計算機モデル
export class CalcModel {
  #inputBuffer;

  constructor() {
    console.log("CalcModel initialized");
    this.#inputBuffer = "0";
    console.log(this.#inputBuffer);
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
    return this.#inputBuffer;
    // screen.textContent = inputBuffer; // 電卓表示部更新
  }

  // 入力バッファを計算結果に更新、電卓表示部更新
  resultDisplay(result = 0) {
    this.#inputBuffer = result.toString(10); // 入力バッファを計算結果に更新
    return this.#inputBuffer;
    // screen.textContent = inputBuffer; // 電卓表示部更新
  }

  // 符号反転、電卓表示部更新
  invertDisplay() {
    if (this.#inputBuffer.charAt(0) === "-") {
      this.#inputBuffer = this.#inputBuffer.slice(1);
    } else {
      this.#inputBuffer = "-" + this.#inputBuffer;
    }
    return this.#inputBuffer;
    // screen.textContent = inputBuffer; // 電卓表示部更新
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
}

export class CalcView {
  // 電卓表示部エレメント
  #displayElement;

  constructor(screenElement) {
    this.#displayElement = screenElement;
    console.log("CalcView initialized");
  }

  update(newStr) {
    // console.log(newStr); // 仮の実装。実際にはHTML要素などに表示する必要があります。
    this.#displayElement.textContent = newStr; // 電卓表示部更新
  }

  clear() {
    //     this.value = "0";
    //     console.log(this.value); // 仮の実装。実際にはHTML要素などに表示する必要があります。
    console.log("CalcView cleared");
    this.#displayElement.textContent = "0"; // 電卓表示部更新
  }
}

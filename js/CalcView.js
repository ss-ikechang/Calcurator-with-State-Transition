export class CalcView {
  // 電卓表示部エレメント
  #displayElement;

  constructor(controller) {
    this.controller = controller;
    this.#displayElement = document.getElementById("screen");
    this.addMouseEvent();

    console.log("CalcView initialized");
  }

  addMouseEvent() {
    // // クリック取得
    // イベントリスナーを登録
    document.querySelector("#btn-allcrear").addEventListener("click", () => {
      this.controller.handleAllClearKey();
    });

    document.querySelector("#btn-add").addEventListener("click", () => {
      this.controller.handleCalclateKey("+");
    });
    document.querySelector("#btn-subtract").addEventListener("click", () => {
      this.controller.handleCalclateKey("-");
    });
    document.querySelector("#btn-multiply").addEventListener("click", () => {
      this.controller.handleCalclateKey("*");
    });
    document.querySelector("#btn-divide").addEventListener("click", () => {
      this.controller.handleCalclateKey("/");
    });
    document.querySelector("#btn-equal").addEventListener("click", () => {
      this.controller.handleCalclateKey("=");
    });
    document.querySelector("#btn-percent").addEventListener("click", () => {
      this.controller.handleCalclateKey("%");
    });

    document.querySelector("#btn-dot").addEventListener("click", () => {
      this.controller.handleDotKey(".");
    });

    document.querySelector("#btn-zero").addEventListener("click", () => {
      this.controller.handleNumericKey(0);
    });
    document.querySelector("#btn-one").addEventListener("click", () => {
      this.controller.handleNumericKey(1);
    });
    document.querySelector("#btn-two").addEventListener("click", () => {
      this.controller.handleNumericKey(2);
    });
    document.querySelector("#btn-three").addEventListener("click", () => {
      this.controller.handleNumericKey(3);
    });
    document.querySelector("#btn-four").addEventListener("click", () => {
      this.controller.handleNumericKey(4);
    });
    document.querySelector("#btn-five").addEventListener("click", () => {
      this.controller.handleNumericKey(5);
    });
    document.querySelector("#btn-six").addEventListener("click", () => {
      this.controller.handleNumericKey(6);
    });
    document.querySelector("#btn-seven").addEventListener("click", () => {
      this.controller.handleNumericKey(7);
    });
    document.querySelector("#btn-eight").addEventListener("click", () => {
      this.controller.handleNumericKey(8);
    });
    document.querySelector("#btn-nine").addEventListener("click", () => {
      this.controller.handleNumericKey(9);
    });

    document.querySelector("#btn-inverted").addEventListener("click", () => {
      this.controller.handleInvertKey();
    });
  }

  // handleMouseDown(e) {
  //   // this.controller.handleInput(numberX, numberY);
  // }

  // 描写する関数
  update(newStr) {
    // console.log(newStr); // 仮の実装。実際にはHTML要素などに表示する必要があります。
    console.log("CalcView updated");
    this.#displayElement.textContent = newStr; // 電卓表示部更新
  }

  clear() {
    //     this.value = "0";
    //     console.log(this.value); // 仮の実装。実際にはHTML要素などに表示する必要があります。
    console.log("CalcView cleared");
    this.#displayElement.textContent = "0"; // 電卓表示部更新
  }
}

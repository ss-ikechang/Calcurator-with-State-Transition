// 状態管理数値変数
// 状態0 ：起動後または「C」キーでの初期化後
// 状態1 ：第一項数値入力中
// 状態2 ：第一項数値入力後の演算キー入力中
// 状態3 ：第二項数値入力中
// 状態4 ：結果表示時中
// 状態99：計算エラー時中
let state = 0;
// 演算種類記憶文字列
let operation = "+";
// 入力バッファ
let inputBuffer = "";
// 計算第１項数値変数
let data1 = 0;
// 計算第２項数値変数
let data2 = 0;

// アクション定義変数
const NUMERICKEY   = 0          // 数値キー
const OPERATIONKEY = 1          // 演算キー
const EQUALKEY     = 2          // イコールキー

// 電卓表示部
const screen = document.getElementById("screen");

// 状態遷移関数
function stateChange(action = NUMERICKEY, keyinput = "") {
  console.log(`状態：${state}`);
  console.log(`キー入力：${keyinput}`);

  switch (state) {
    case 0:                                   // 状態0 ：起動後または「C」キーでの初期化後
      if (action == NUMERICKEY) {             // 数値キーを押下した場合
        
        if (inputBuffer.length <= 8)  {       // 入力できる最大文字数まで追加
          inputBuffer += keyinput;            // 入力バッファにキー入力追加
          screen.textContent = inputBuffer;   // 電卓表示部更新
        } 
        state = 1;  // 状態１に遷移
      } else if (action == OPERATIONKEY) {    // 演算キーを押下した場合
        // 状態０のまま
      } else if (action == EQUALKEY) {        // イコールキーを押下した場合
        // 状態０のまま
      } else {                                // それ以外のケース
        // それ以外のケース
      }
      break;

    case 1:                                   // 状態1 ：第一項数値入力中
      if (action == NUMERICKEY) {             // 数値キーを押下した場合
        if (inputBuffer.length <= 8)  {       // 入力できる最大文字数追加
          inputBuffer += keyinput;            // 入力バッファにキー入力追加
          screen.textContent = inputBuffer;   // 電卓表示部更新
        } 
        // 状態１のまま
      } else if (action == OPERATIONKEY) {    // 演算キーを押下した場合
        // 仮実装
      } else if (action == EQUALKEY) {        // イコールキーを押下した場合
        // 仮実装
      } else {                                // それ以外のケース
        // それ以外のケース
      }
      break;
      
    default:
      // 式がいずれの値とも一致しないときに実行する処理;
  }  
}



// 数字キーを押したとき
const inputValue = data => {
  stateChange(NUMERICKEY, data); 
};


// イベントリスナーを登録
document.querySelector('#btn-zero').addEventListener('click',()=> {
  inputValue(0)
});
document.querySelector('#btn-one').addEventListener('click',()=> {
  inputValue(1)
});
document.querySelector('#btn-two').addEventListener('click',()=> {
  inputValue(2)
});
document.querySelector('#btn-three').addEventListener('click',()=> {
  inputValue(3)
});
document.querySelector('#btn-four').addEventListener('click',()=> {
  inputValue(4)
});
document.querySelector('#btn-five').addEventListener('click',()=> {
  inputValue(5)
});
document.querySelector('#btn-six').addEventListener('click',()=> {
  inputValue(6)
});
document.querySelector('#btn-seven').addEventListener('click',()=> {
  inputValue(7)
});
document.querySelector('#btn-eight').addEventListener('click',()=> {
  inputValue(8)
});
document.querySelector('#btn-nine').addEventListener('click',()=> {
  inputValue(9)
});



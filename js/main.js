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
      if (action === NUMERICKEY) {            // 数値キーを押下した場合
        numberDisplay(keyinput);              // 入力バッファにキー入力追加・電卓表示部更新
        state = 1;                            // 状態１に遷移

      } else if (action === OPERATIONKEY) {   // 演算キーを押下した場合
        // 状態０のまま
      } else if (action === EQUALKEY) {       // イコールキーを押下した場合
        // 状態０のまま
      } else {                                // それ以外のケース
        // それ以外のケース
      }
      break;

    case 1:                                   // 状態1 ：第一項数値入力中
      if (action === NUMERICKEY) {            // 数値キーを押下した場合
        numberDisplay(keyinput);              // 入力バッファにキー入力追加・電卓表示部更新
        screen.textContent = inputBuffer;     // 電卓表示部更新
        // 状態１のまま

      } else if (action === OPERATIONKEY) {   // 演算キーを押下した場合    
        data1 = parseInt(inputBuffer, 10);    // 入力バッファのデータを数値化し第１項として保存
        operation = keyinput;                 // 演算種類記憶
        inputBufferCrear();                   // 入力バッファを空に
        // 電卓表示部更新しない
        state = 2;                            // 状態２に遷移

      } else if (action === EQUALKEY) {       // イコールキーを押下した場合
        inputBufferCrear();                   // 入力バッファを空に
        // 電卓表示部更新しない
        state = 0;                            // 状態０に遷移

      } else {                                // それ以外のケース
        // それ以外のケース
      }
      break;

    case 2:                                   // 状態2 ：第一項数値入力後の演算キー入力中
      if (action === NUMERICKEY) {            // 数値キーを押下した場合

        numberDisplay(keyinput);              // 入力バッファにキー入力追加・電卓表示部更新
        screen.textContent = inputBuffer;     // 電卓表示部更新
        state = 3;                            // 状態３に遷移

      } else if (action === OPERATIONKEY) {   // 演算キーを押下した場合 
        
        operation = keyinput;                 // 演算種類記憶
        inputBufferCrear();                   // 入力バッファを空に
        // 電卓表示部更新しない
        // 状態２のまま        

      } else if (action === EQUALKEY) {       // イコールキーを押下した場合
        // 未定：仮実装：何もしない

      } else {                                // それ以外のケース
        // それ以外のケース
      }
      break;

    case 3:                                   // 状態3 ：第二項数値入力中
      if (action === NUMERICKEY) {            // 数値キーを押下した場合

        numberDisplay(keyinput);              // 入力バッファにキー入力追加・電卓表示部更新
        screen.textContent = inputBuffer;     // 電卓表示部更新
        // 状態３のまま

      } else if (action === OPERATIONKEY) {   // 演算キーを押下した場合 
        data2 = parseInt(inputBuffer, 10);    // 入力バッファのデータを数値化し第２項として保存     
        // 計算：［第１項］［第２項］［記憶している演算］
        let result = calculate(data1, data2, operation)
        // 　　　ここで計算エラー発生なら　
        // 　　　　　入力バッファを空に
        // 　　　　　電卓表示部をエラー表示に更新　　　　　
        // 　　　　　状態９９に遷移

        // 入力バッファを計算結果に更新
        // 電卓表示部更新
        resultDisplay(result)

        data1 = parseInt(inputBuffer, 10);    // 入力バッファのデータを数値化し第１項として保存
        operation = keyinput;                 // 演算種類記憶
        inputBufferCrear();                   // 入力バッファを空に
        // 電卓表示部更新しない
        
        state = 2;                            // 状態２に遷移

      } else if (action === EQUALKEY) {       // イコールキーを押下した場合
        data2 = parseInt(inputBuffer, 10);    // 入力バッファのデータを数値化し第２項として保存     
        // 計算：［第１項］［第２項］［記憶している演算］
        let result = calculate(data1, data2, operation)
        // 　　　ここで計算エラー発生なら　
        // 　　　　　入力バッファを空に
        // 　　　　　電卓表示部をエラー表示に更新　　　　　
        // 　　　　　状態９９に遷移

        // 入力バッファを計算結果に更新
        // 電卓表示部更新
        resultDisplay(result)

        state = 4;                            // 状態４に遷移
        
      } else {                                // それ以外のケース
        // それ以外のケース
      }
      break;

    case 4:                                   // 状態4 ：結果表示時中
      if (action === NUMERICKEY) {            // 数値キーを押下した場合
        inputBufferCrear();                   // 入力バッファを空に
        numberDisplay(keyinput);              // 入力バッファにキー入力追加・電卓表示部更新
        state = 1;                            // 状態１に遷移

      } else if (action === OPERATIONKEY) {   // 演算キーを押下した場合 
        // 未定：仮実装：何もしない

      } else if (action === EQUALKEY) {       // イコールキーを押下した場合
        // 未定：仮実装：何もしない
        
      } else {                                // それ以外のケース
        // それ以外のケース
      }
      break;
      

    default:
      // 式がいずれの値とも一致しないときに実行する処理;
  }  
}

// 計算：［第１項］［記憶している演算］［第２項］
function calculate(value1 = 0, value2 = 0, ope = "+"){
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
      
    default:
      // 式がいずれの値とも一致しないときに実行する処理;
  }  
  return result;
}

// キー入力追加、電卓表示部更新、入力桁数チェック
const numberDisplay = keyinput => {
  if (inputBuffer.length <= 8)  {       // 入力できる最大文字数追加
    inputBuffer += keyinput;            // 入力バッファにキー入力追加
    screen.textContent = inputBuffer;   // 電卓表示部更新
  } 
};

// 入力バッファを計算結果に更新、電卓表示部更新
function resultDisplay(result = 0) {
  inputBuffer = result;               // 入力バッファを計算結果に更新
  screen.textContent = inputBuffer;   // 電卓表示部更新
}


// 入力バッファを空に
const inputBufferCrear = () => {
  inputBuffer = "";                     // 入力バッファを空に
};

// ACを押した場合の動作
const allCrear = () => {
  state = 0;
  operation = "+";
  inputBuffer = "";
  data1 = 0;
  data2 = 0;

  screen.textContent = "0";
};


// 数字キーを押したとき
const numericKey = data => {
  stateChange(NUMERICKEY, data); 
};

// 演算キーを押したとき
const calclateKey = data => {
  if (data === "=") {                 // イコールキーを押下したとき
    stateChange(EQUALKEY, data); 
  } else {
    stateChange(OPERATIONKEY, data); 
  }
};


// イベントリスナーを登録
document.querySelector('#btn-allcrear').addEventListener('click',allCrear);

document.querySelector('#btn-add').addEventListener('click',()=> {
  calclateKey('+')
});
document.querySelector('#btn-subtract').addEventListener('click',()=> {
  calclateKey('-')
});
document.querySelector('#btn-multiply').addEventListener('click',()=> {
  calclateKey('*')
});
document.querySelector('#btn-divide').addEventListener('click',()=> {
  calclateKey('/')
});
document.querySelector('#btn-equal').addEventListener('click',()=> {
  calclateKey('=')
});

document.querySelector('#btn-zero').addEventListener('click',()=> {
  numericKey(0)
});
document.querySelector('#btn-one').addEventListener('click',()=> {
  numericKey(1)
});
document.querySelector('#btn-two').addEventListener('click',()=> {
  numericKey(2)
});
document.querySelector('#btn-three').addEventListener('click',()=> {
  numericKey(3)
});
document.querySelector('#btn-four').addEventListener('click',()=> {
  numericKey(4)
});
document.querySelector('#btn-five').addEventListener('click',()=> {
  numericKey(5)
});
document.querySelector('#btn-six').addEventListener('click',()=> {
  numericKey(6)
});
document.querySelector('#btn-seven').addEventListener('click',()=> {
  numericKey(7)
});
document.querySelector('#btn-eight').addEventListener('click',()=> {
  numericKey(8)
});
document.querySelector('#btn-nine').addEventListener('click',()=> {
  numericKey(9)
});



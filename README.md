# Calcurator-with-State-Transition
状態遷移を用いて実装した電卓アプリ

## フォーク元
https://github.com/atlansien/Calculator-made-with-javascript.io

## こちらで実際に動かせます
https://ss-ikechang.github.io/Calcurator-with-State-Transition/

## 状態遷移仕様

状態遷移図
![状態遷移図](https://github.com/ss-ikechang/Calcurator-with-State-Transition/blob/main/doc/diagram.png "状態遷移図")
状態遷移表
![状態遷移表](https://github.com/ss-ikechang/Calcurator-with-State-Transition/blob/main/doc/table.png "状態遷移表")

## 未だ

## 得られた知見

### イベントリスナーには、引数ありの関数設定できない
イベントリスナーの追加時、コールバック関数は引数なしの必要あり  
もし引数を渡す必要あれば、引数なしの関数でラップする。
``````
document.querySelector('#btn-add').addEventListener('click',()=> {
  calclateKey('+')
});
``````
今回の実装では、アロー関数でラップした。

参考  
[【JavaScript】addEventListenerのコールバック関数に引数を渡す](https://wild-outdoorlife.com/javascript/addeventlistener-callback/)


### 変数の型は動的に変わる
このような実装があったとき、
``````
// キー入力追加、電卓表示部更新、入力桁数チェック
function numberDisplay(keyinput = "0") {
  if (inputBuffer === "0") {            // 「０」がセットされている場合
    --- 略 ---
  } else {
    if (inputBuffer.length <= 8)  {     // 入力できる最大文字数以下なら
    --- 略 ---
};
``````
keyinputはデフォルトで"0"を与えていて、文字列変数に固定出来ていると思っていたが、
数値の代入が一か所でもあれば、数値変数になってしまい、inputBuffer.lengthが通らなくなる。
ロジックが破綻する。  
明示的に数値を文字列に変更して引数呼び出しする必要あり。
``````
// 数字キーを押したとき
const numericKey = data => {
  stateChange(NUMERICKEY, data.toString(10)); 
};
``````
### イコールは３個
「== (等価演算子)」：比較する際に「値」だけをチェックする演算子  
「=== (厳密等価演算子)」：比較する際に「値」と「型」の両方をチェックする演算子  
``````
function numberDisplay(keyinput = "0") {
  if (inputBuffer === "0") {            // 「０」がセットされている場合
    if (keyinput === ".") {             // 「.」が押下された
``````
参考  
[厳密等価 (===) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Strict_equality)

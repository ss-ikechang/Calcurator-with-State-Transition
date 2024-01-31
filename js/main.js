let symbol = "+";
let total = "";
let currentValue = "";
let flag = 0; // 数字 = 0, 演算子 = 1

const screen = document.getElementById("screen");

// 数字を入力
const inputValue = data => {
  if (currentValue.length <= 8) { // 入力できる最大文字数
    flag = 0;
    currentValue += data;
    screen.textContent = currentValue;
  }
};

// 文字列から.を見つけ、入力を制限する
const inputDot = data => {
  if (!currentValue.includes(".")) {
    currentValue += data;
    screen.textContent = currentValue;
  }
};

// プラスマイナスの反転
const inverted = () => {
  if (currentValue === "") { // 合計の数字を反転
    total = -total;
    screen.textContent = total;
  } else { // 入力した数字を反転
    currentValue = -currentValue;
    screen.textContent = currentValue;
  }
};

// 計算をする
const calclation = data => {
  if (flag === 0 && data !== "=") { // =以外の記号を押した
    flag = 1;

    let formula = total + symbol + currentValue;
    total = eval(formula);

    symbol = data;
    currentValue = "";
    screen.textContent = total;

  } else if (flag === 1 && data === "=") { // =を２回以上連打した
    let formula = total + symbol + total;
    total = eval(formula);

    currentValue = "";
    screen.textContent = total;

  } else if (data === "=") { // =を一回押した
    flag = 1;

    let formula = total + symbol + currentValue;
    total = eval(formula);

    currentValue = "";
    screen.textContent = total;

  } else { // =を押した後数字を入力せず記号を押した
    symbol = data;
  }
};

const percent = () => {
  if(symbol === "+" || symbol === "-") { // 足し算、引き算の場合の動作
   let formula = currentValue / 100;
   formula = total * formula;
   currentValue = eval(formula);
   
   screen.textContent = currentValue;
 }else { // それ以外(数字のみ、掛け算、割り算の動作)
   let formula = currentValue / 100;
   currentValue = eval(formula);

   screen.textContent = currentValue;
 }
};


// ACを押した場合の動作
const allCrear = () => {
  symbol = "+";
  total = "";
  currentValue = "";
  flag = 0;
  screen.textContent = "0";
};

// イベントリスナーを登録
document.querySelector('#btn-allcrear').addEventListener('click',allCrear);
document.querySelector('#btn-inverted').addEventListener('click',inverted);
document.querySelector('#btn-percent').addEventListener('click',percent);

// 【JavaScript】addEventListenerのコールバック関数に引数を渡す -
// https://wild-outdoorlife.com/javascript/addeventlistener-callback/
document.querySelector('#btn-add').addEventListener('click',()=> {
  calclation('+')
});
document.querySelector('#btn-subtract').addEventListener('click',()=> {
  calclation('-')
});
document.querySelector('#btn-multiply').addEventListener('click',()=> {
  calclation('*')
});
document.querySelector('#btn-divide').addEventListener('click',()=> {
  calclation('/')
});
document.querySelector('#btn-equal').addEventListener('click',()=> {
  calclation('=')
});
document.querySelector('#btn-dot').addEventListener('click',()=> {
  inputDot('.')
});

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



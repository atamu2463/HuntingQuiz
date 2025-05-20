// ===== グローバル変数・定数 =====
let currentQuizIndex = 0;                        // 現在のクイズ番号
const totalQuizCount = quiz.length;               // クイズの総数
let correctAnswerCount = 0;                       // 正解数

const kyonMessage = document.getElementById('kyon-word'); // セリフ表示用
const answerButtons = document.querySelectorAll('.answer'); // 選択肢ボタン
const answerButtonCount = answerButtons.length;             // ボタン数
// ==============================

// 問題の出力
const renderQuiz = () => {
    document.getElementById('js-question').innerHTML= quiz[currentQuizIndex].question.replace(/\n/g, '<br>');
    document.getElementById('js-number').textContent = quiz[currentQuizIndex].questionNumber;
    for (let i = 0; i < answerButtonCount; i++) {
        answerButtons[i].textContent = quiz[currentQuizIndex].answers[i];
    }
    kyonMessage.innerHTML = "がんばって！";

    // 選択肢ボタンのイベントリスナー登録
    answerButtons.forEach(btn => {
        btn.onclick = (event) => {
            judgeAnswer(event.currentTarget);
        };
    });
};

// 正解・不正解判定
const judgeAnswer = (selectedButton) => {
    const correctEffect = document.querySelector('.answer_correct');
    const incorrectEffect = document.querySelector('.answer_incorrect');
    if (quiz[currentQuizIndex].correct === selectedButton.textContent) {
        correctEffect.classList.add("active_answer");
        setTimeout(() => {
            correctEffect.classList.remove("active_answer");
        }, 1000);
        kyonMessage.innerHTML = "すごい！正解！";
        correctAnswerCount++;
    } else {
        incorrectEffect.classList.add("active_answer");
        setTimeout(() => {
            incorrectEffect.classList.remove("active_answer");
        }, 1000);
        kyonMessage.innerHTML = "残念...！不正解！";
    }
    currentQuizIndex++;
    if (currentQuizIndex < totalQuizCount) {
        setTimeout(renderQuiz, 1000);
    } else {
        setTimeout(showResult, 1000);
    }
};

// 結果発表
const showResult = () => {
    const resultBox = document.querySelector('.answer_result');
    const resultText = document.querySelector('.answer_result_text');
    resultBox.classList.add("active_result");
    resultText.innerHTML = `終了！<br>あなたの正解数は${correctAnswerCount}問/${totalQuizCount}問です！<br>
        <div class="reset_box"><button class="reset_txt" id="reset_btn">最初からやり直す</button></div>`;
    kyonMessage.innerHTML = "おつかれさま！<br>またきてね！";
    // リセットボタンのイベントリスナー登録
    const resetBtn = document.getElementById('reset_btn');
    if (resetBtn) {
        resetBtn.onclick = resetQuiz;
        resetBtn.style.display = "block";
    }
};

// 初期画面に戻る
const resetQuiz = () => {
    currentQuizIndex = 0;
    correctAnswerCount = 0;
    document.querySelector('.answer_result').classList.remove("active_result");
    document.querySelector('.answer_result_text').textContent = '';
    kyonMessage.innerHTML = "がんばって！";
    renderQuiz();
};

// 初期表示
renderQuiz();
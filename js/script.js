let quizCount = 0;
        //クイズの数
        const quizLength = quiz.length;
        let score = 0;

        //キョンのセリフの読み取り
        let kyonWord = document.getElementById('kyon-word');

        //選択肢
        const $button = document.querySelectorAll('.answer');
        const buttonLength = $button.length

        //問題の出力
        const setupQuiz = () => {
            document.getElementById('js-question').textContent = quiz[quizCount].question
            document.getElementById('js-number').textContent = quiz[quizCount].questionNumber
            let buttonCount = 0;
             while (buttonCount < buttonLength) {
                $button[buttonCount].textContent = quiz[quizCount].answers[buttonCount]
                buttonCount++;
            kyonWord.innerHTML = "がんばって！";
            }
        }
        setupQuiz();
 
 
        let clickedCount = 0;
        while (clickedCount < buttonLength) {
            $button[clickedCount].addEventListener("click", function () {
                const clickedAnswer = event.currentTarget
                const answerCorrect = document.querySelector('.answer_correct');
                const answerIncorrect = document.querySelector('.answer_incorrect');
                const answerResult = document.querySelector('.answer_result');
                const answerResultText = document.querySelector('.answer_result_text')
 
                if (quiz[quizCount].correct === clickedAnswer.textContent) {
                    answerCorrect.classList.add("active_answer")
                    setTimeout (function(){
                        answerCorrect.classList.remove("active_answer")
                    }, 1000);
                    kyonWord.innerHTML = "すごい！正解！"
                    score++;
                }else {
                    answerIncorrect.classList.add("active_answer")
                    setTimeout (function(){
                        answerIncorrect.classList.remove("active_answer")
                    }, 1000);
                    kyonWord.innerHTML = "残念...！不正解！"
                };
 
                quizCount++;

        
                if (quizCount < quizLength) {
                    setTimeout (function(){
                    setupQuiz();
                }, 1000);
                }else {
                    answerResult.classList.add("active_result")
                    answerResultText.textContent = '終了！あなたの正解数は' + score + '問/' + quizLength + '問です！'

                    kyonWord.innerHTML = "おつかれさま！<br>またきてね！"
                    
                
            }});            
            clickedCount++;
        }

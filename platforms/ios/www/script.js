
document.addEventListener('deviceready', function(){
  const searchForm = document.querySelector('#searchForm');
  const mainWrapper = document.getElementById('mainWrapper');
  const titleText = document.getElementById('titleText');
  const termWrapper = document.getElementById('termsWrapper');
  const errorText = document.getElementById('errorText');
  const backButton = document.querySelector('#back');
  const studyWrapper = document.querySelector('#studyWrapper');
  const studyButton = document.querySelector('#study');
  const studyBack = document.querySelector('#studyBack');
  const startButton = document.querySelector('#startButton');
  const gameWrapper = document.querySelector('#gameWrapper');
  const answerIn = document.querySelector('#answerIn');
  const gameForm = document.querySelector('#gameForm');
  const randomizeCheck = document.querySelector('#randomizeCheck');
  const answerFirstCheck = document.querySelector('#answerFirstCheck');
  const termText = document.querySelector('#termText');
  const nextButton = document.querySelector('#nextButton');
  const resultText = document.querySelector('#resultText');
  const resultsWrapper = document.querySelector('#resultsWrapper');
  const finishText = document.querySelector('#finishText');
  const okButton = document.querySelector('#okButton');

  let currentSet;
  let instanceKeys;
  let num = 0;
  let correct = 0;
  let reverse = false;


  studyButton.addEventListener('click', e => {startStudy();});

  backButton.addEventListener('click', e => {backToSearch();});

  studyBack.addEventListener('click', e => {backToSet();});

  startButton.addEventListener('click', e=> {studySet(currentSet);});

  nextButton.addEventListener('click', e => {continueGame();});

  okButton.addEventListener('click', e => {backToSet();});

  searchForm.addEventListener("submit", e => {
    e.preventDefault();
    search();
  });

  gameForm.addEventListener("submit", e => {
    e.preventDefault();
    checkAnswer();
  });

  function search(){
    let code = document.querySelector('#searchIn').value;
    $.ajax('https://studyappserver.herokuapp.com/get', {
      data: {code: code},
      success: function(data){
        if(data.status){
          loadSet(data.set);
        }
        else searchError('Invalid Code');
      }
    });
  }

  function loadSet(set){
    // window.Keyboard.hide();
    currentSet = set.terms;
    mainWrapper.classList.add('show');
    titleText.innerText = set.title;
    Object.keys(set.terms).forEach(term => {
      termWrapper.innerHTML += `<h1 class="term">${term}: ${set.terms[term]}</h1>`;
    });
  }

  function resetSet(){
    const termWrapper = document.getElementById('termsWrapper');
    termWrapper.innerHTML = '';
  }

  function searchError(text){
    errorText.innerText = text;
    errorText.classList.add('flashError');
    setTimeout(function(){
      errorText.classList.remove('flashError');
    }, 5000);
  }

  function backToSearch(){
    mainWrapper.classList.add('slideRight');
    setTimeout(function(){
      mainWrapper.classList.remove('slideRight');
      mainWrapper.classList.remove('show');
    }, 500);
    resetSet();
  }

  function backToSet(){
    studyWrapper.classList.add('slideRight');
    gameWrapper.classList.add('slideRight');
    resultsWrapper.classList.add('slideRight');
    setTimeout(function(){
      studyWrapper.classList.remove('slideRight');
      studyWrapper.classList.remove('show');
      gameWrapper.classList.remove('slideRight');
      gameWrapper.classList.remove('show');
      resultsWrapper.classList.remove('slideRight');
      resultsWrapper.classList.remove('show');
    }, 500);
  }

  function startStudy(){
    studyWrapper.classList.add('show');
  }

  function studySet(set){
    num = -1;
    correct = 0;
    if(randomizeCheck.checked) instanceKeys = shuffle(Object.keys(set));
    else instanceKeys = Object.keys(set);
    reverse = answerFirstCheck.checked;
    gameWrapper.classList.add('show');
    continueGame();
  }

  function continueGame(){
    num++;
    if(num == instanceKeys.length) showResults();
    else{
      answerIn.value = '';
      if(reverse) termText.innerText = currentSet[instanceKeys[num]];
      else termText.innerText = instanceKeys[num];
    }
    nextButton.classList.remove('nextShow');
    resultText.classList.remove('resultBad');
    resultText.classList.remove('resultGood');
  }

  function checkAnswer(){
    if((reverse && answerIn.value == instanceKeys[num]) ||
    answerIn.value == currentSet[instanceKeys[num]]){
      answerResult('Correct', true);
      correct++;
    }
    else{
      if(reverse) answerResult('The correct answer is ' + instanceKeys[num], false);
      else answerResult('The correct answer is ' + currentSet[instanceKeys[num]], false)
    }
    nextButton.classList.add('nextShow');
  }

  function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  function answerResult(message, good){
    resultText.innerText = message;
    if(good) resultText.classList.add('resultGood');
    else resultText.classList.add('resultBad');
  }

  function showResults(){
    resultsWrapper.classList.add('show');
    finishText.innerText = 'you got ' + correct  + ' out of ' + instanceKeys.length.toString() + ' correct';
  }
}, false);

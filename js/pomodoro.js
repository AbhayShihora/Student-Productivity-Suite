var display = document.getElementById('timerDisplay');
var minutesInput = document.getElementById('pomodoroInput');
var applyBtn = document.getElementById('applyTime');

var startBtn = document.getElementById('start');
var pauseBtn = document.getElementById('pause');
var resetBtn = document.getElementById('reset');

var totalSeconds = 0;
var remain = 0;
var timerId = null;
var isRunning = false;

function format(secs){
  var m = Math.floor(secs / 60);
  var s = secs % 60;
  return String(m).padStart(2,'0') + ":" + String(s).padStart(2,'0');
}

function updateDisplay(){
  display.textContent = format(remain);
}

applyBtn.addEventListener("click", function(){
  var mins = parseInt(minutesInput.value);

  if(isNaN(mins) || mins <= 0){
    alert("Please enter a valid minute value.");
    return;
  }

  totalSeconds = mins * 60;
  remain = totalSeconds;
  updateDisplay();

});

startBtn.addEventListener("click", function(){
  if(isRunning || remain <= 0) return;

  isRunning = true;
  pauseBtn.disabled = false;
  startBtn.disabled = true;

  timerId = setInterval(function(){
    if(remain <= 0){
      clearInterval(timerId);
      isRunning = false;
      alert("Time's up!");
      startBtn.disabled = false;
      pauseBtn.disabled = true;
    } else {
      remain--;
      updateDisplay();
    }
  }, 1000);
});

pauseBtn.addEventListener("click", function(){
  if(timerId){
    clearInterval(timerId);
    timerId = null;
    isRunning = false;

    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }
});

resetBtn.addEventListener("click", function(){
  if(timerId) clearInterval(timerId);
  timerId = null;

  remain = totalSeconds;
  updateDisplay();
  isRunning = false;

  startBtn.disabled = false;
  pauseBtn.disabled = true;
});

pauseBtn.disabled = true;
updateDisplay();

// plain view
document.querySelector("#hours").innerHTML = "00";
document.querySelector("#minutes").innerHTML = "00";
document.querySelector("#seconds").innerHTML = "00";

// operate buttons
document.querySelector(".start-btn").addEventListener("click", start);
document.querySelector(".stop-btn").addEventListener("click", stop);
document.querySelector(".reset-btn").addEventListener("click", reset);
document.querySelector(".log-btn").addEventListener("click", logLoop);
document
  .querySelector(".delete-local-storage-btn")
  .addEventListener("click", deleteLocalStorage);

//var
let secondsInterval;
let minutesInterval;
let hoursInterval;
let arrayLogs = [];

// functions
function getSeconds() {
  let showSeconds = document.querySelector("#seconds").innerHTML;
  secondsInterval = setInterval(function () {
    showSeconds++;
    document.querySelector("#seconds").innerHTML = showSeconds;
    if (showSeconds >= 59) {
      showSeconds = 0;
    }
  }, 1000);
}

function getMinutes() {
  let showMinutes = document.querySelector("#minutes").innerHTML;
  minutesInterval = setInterval(function () {
    showMinutes++;
    document.querySelector("#minutes").innerHTML = showMinutes;
    if (showMinutes >= 59) {
      showMinutes = 0;
    }
  }, 60000);
}

function getHours() {
  let showHours = document.querySelector("#hours").innerHTML;
  hoursInterval = setInterval(function () {
    showHours++;
    document.querySelector("#hours").innerHTML = showHours;
  }, 3600000);
}

function start() {
  getSeconds();
  getMinutes();
  getHours();
}

function stop() {
  clearInterval(secondsInterval);
  clearInterval(minutesInterval);
  clearInterval(hoursInterval);
}

function reset() {
  stop();
  document.querySelector("#hours").innerHTML = "00";
  document.querySelector("#minutes").innerHTML = "00";
  document.querySelector("#seconds").innerHTML = "00";
}

function logLoop() {
  document.querySelector(
    ".show-log"
  ).innerHTML = `<div class= mt-4 text-center mx-auto> 
  <textarea name="textarea" class=textarea  id="textarea" cols="120" rows="30" placeholder="don't forget to save..."></textarea></div>
  <button class="save-log-btn btn btn-dark mx-auto">save log</button>
  <button class="download-log-btn btn btn-dark mx-auto">download</button>
`;
  document.querySelector(".save-log-btn").addEventListener("click", saveLog);
  document
    .querySelector(".download-log-btn")
    .addEventListener("click", download);
}

function saveLog() {
  newLog = {
    date: Date(),
    time: `${document.querySelector("#hours").innerHTML}:${
      document.querySelector("#minutes").innerHTML
    } :${document.querySelector("#seconds").innerHTML}`,
    value: `${document.querySelector("#textarea").value}`,
  };
  arrayLogs.push(newLog);
  // chatgpt
  const logKey = `log${arrayLogs.length}`;
  localStorage.setItem(logKey, JSON.stringify(newLog));
}
//end

function download() {
  let textareaValue = document.querySelector("#textarea").value;
  //chatgpt
  const blob = new Blob([textareaValue], {
    type: "text/plain",
  });
  const blobUrl = URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");
  downloadLink.href = blobUrl;
  downloadLink.download = "myNotebook.doc";
  downloadLink.click();
}
//end

function deleteLocalStorage() {
  localStorage.clear();
}

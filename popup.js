document.getElementById('start').addEventListener('click', () => {
    let waitTime = parseInt(document.getElementById('wait-time').value) || 3;
    let startButton = document.getElementById('start');
    let stopButton = document.getElementById('stop');
    let loadingIcon = document.getElementById('loading');

    startButton.disabled = true;
    loadingIcon.style.display = "inline-block";
    stopButton.innerText = "Stop"; // تغییر متن دکمه Stop به "Stop"

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "start", waitTime: waitTime });
    });
});

document.getElementById('stop').addEventListener('click', () => {
    let stopButton = document.getElementById('stop');
    let startButton = document.getElementById('start');
    let loadingIcon = document.getElementById('loading');

    stopButton.innerText = "Stopped"; // تغییر متن دکمه Stop به "Stopped"
    startButton.disabled = false;
    loadingIcon.style.display = "none";

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "stop" });
    });
});

// مدیریت افزایش و کاهش مقدار زمان
document.getElementById('increase').addEventListener('click', () => {
    let input = document.getElementById('wait-time');
    input.value = Math.max(1, parseInt(input.value) + 1);
});

document.getElementById('decrease').addEventListener('click', () => {
    let input = document.getElementById('wait-time');
    input.value = Math.max(1, parseInt(input.value) - 1);
});

// لینک دکمه "Following Page"
document.getElementById('following-page').addEventListener('click', () => {
    chrome.tabs.create({ url: "https://www.linkedin.com/mynetwork/network-manager/people-follow/followers/" });
});

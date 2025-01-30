let running = false;
let intervalId = null;
let waitTime = 3000; // مقدار پیش‌فرض

function clickFollowingButton() {
    if (!running) return;

    console.log("🔍 Searching for 'Following' buttons...");

    let followButtons = Array.from(document.querySelectorAll('button'))
        .filter(btn => btn.innerText.trim() === "Following" && btn.classList.contains("artdeco-button--muted"));

    if (followButtons.length === 0) {
        console.log("✅ No 'Following' button found.");
        return;
    }

    let button = followButtons[0];
    console.log("👉 Clicking on 'Following' button...");

    setTimeout(() => {
        button.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    }, 500);
}

// شروع عملیات
function startUnfollowing(newWaitTime) {
    if (!running) {
        running = true;
        waitTime = newWaitTime * 1000; // تبدیل به میلی‌ثانیه
        intervalId = setInterval(clickFollowingButton, waitTime);
        console.log(`✅ Started unfollowing every ${newWaitTime} seconds...`);
    }
}

// توقف عملیات
function stopUnfollowing() {
    running = false;
    clearInterval(intervalId);
    console.log("⛔ Stopped unfollowing process.");
}

// دریافت پیام از popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "start") startUnfollowing(message.waitTime);
    if (message.action === "stop") stopUnfollowing();
});

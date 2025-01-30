chrome.runtime.onInstalled.addListener(() => {
    console.log("LinkedIn Auto Unfollower Installed.");
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url.includes("linkedin.com/mynetwork/network-manager/people-follow/followers")) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["content.js"]
        });
    }
});

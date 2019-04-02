const PewDiePieURL = "https://bastet.socialblade.com/youtube/lookup?query=UC-lHJZR3Gqxm24_Vd_AJ5Yw";
const TSeriesURL = "https://bastet.socialblade.com/youtube/lookup?query=UCq-Fj5jknLsUf-MWSy4_brA";

async function refreshState() {
    try {
        var PewDiePieSubscribers = await fetchAsync(PewDiePieURL);
        var TSeriesSubscribers = await fetchAsync(TSeriesURL);
        var difference = PewDiePieSubscribers - TSeriesSubscribers;

        chrome.browserAction.setTitle({ title: `SubGap: ${numFormatter(difference, 1)}` });

        if (difference >= 0) {
            chrome.browserAction.setBadgeBackgroundColor({ color: "#000030" });
        } else {
            chrome.browserAction.setBadgeBackgroundColor({ color: "#470000" });
        }

        chrome.browserAction.setBadgeText({ text: numFormatter(difference, 0) });

    } catch (err) {
        console.log(err);
    };
};

function numFormatter(num, places) {
    var result = "";
    if (Math.abs(num) > 999999) {
        result = (num / 1000000).toFixed(places) + "M";
    } else if (Math.abs(num) > 999) {
        result = (num / 1000).toFixed(places) + "k";
    } else {
        result = num;
    }
    return result;
}

async function fetchAsync(url) {
    let response = await fetch(url);
    let data = await response.text();
    return data;
};

function trigger() {
    setInterval(refreshState, 10000);
};

refreshState();
trigger();
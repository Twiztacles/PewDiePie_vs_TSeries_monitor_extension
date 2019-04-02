const PewDiePieURL = "https://bastet.socialblade.com/youtube/lookup?query=UC-lHJZR3Gqxm24_Vd_AJ5Yw";
const TSeriesURL = "https://bastet.socialblade.com/youtube/lookup?query=UCq-Fj5jknLsUf-MWSy4_brA";

async function refreshState() {
    try {
        var PewDiePieSubscribers = await fetchAsync(PewDiePieURL);
        var TSeriesSubscribers = await fetchAsync(TSeriesURL);
        var difference = PewDiePieSubscribers - TSeriesSubscribers;

        updateText("pewdiepie_subs", numFormatter(PewDiePieSubscribers));
        updateText("tseries_subs", numFormatter(TSeriesSubscribers));
        updateText("difference", numFormatter(difference));

    } catch (err) {
        console.log(err);
    };
};

function updateText(element_id, text) {
    var text_node = document.createTextNode(text);
    var elem = document.getElementById(element_id);
    elem.innerHTML = "";
    elem.appendChild(text_node);
}

function numFormatter(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

async function fetchAsync(url) {
    let response = await fetch(url);
    let data = await response.text();
    return data;
};

function trigger() {
    setInterval(refreshState, 3000);
};

refreshState();
trigger();
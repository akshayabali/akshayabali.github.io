//JS to load all the scripts

var scripts = ["./tree.js", "./graph.js", "./venn.js", "spider.js", "./table.js"];

// Check if the query parameter "check" equals "programmingbiologypleaseloadmypage" to load the scripts

function loadScript(i) {
    if (i < scripts.length) {
        var script = document.createElement("script");
        script.src = scripts[i];
        script.onload = function () {
            console.log("Script loaded: " + scripts[i]);
            loadScript(i + 1);
        };
        document.body.appendChild(script);
    }
}

var urlParams = new URLSearchParams(window.location.search);
if (
    urlParams.has("check") &&
    urlParams.get("check") === "programmingbiologypleaseloadmypage"
) {
    loadScript(0);
} else {
    var button = document.getElementById("download");
    // Hide the download button
    button.style.display = "none";
}

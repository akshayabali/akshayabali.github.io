//JS to load all the scripts

var scripts = ["./tree.js", "./graph.js", "./venn.js", "spider.js", "./table.js"];


// var script_url = {
//     "table" : "https://raw.githubusercontent.com/akshayabali/akshayabali.github.io/pages/table.js",
//     "tree" : "https://raw.githubusercontent.com/akshayabali/akshayabali.github.io/pages/tree.js",
//     "spider" : "https://raw.githubusercontent.com/akshayabali/akshayabali.github.io/pages/spider.js",
//     "table" : "https://raw.githubusercontent.com/akshayabali/akshayabali.github.io/pages/table.js",
//     "graph" : "https://raw.githubusercontent.com/akshayabali/akshayabali.github.io/pages/graph.js",
//     "venn" : "https://raw.githubusercontent.com/akshayabali/akshayabali.github.io/pages/venn.js"
// }

// var scripts = [script_url["table"], script_url["tree"], script_url["spider"], script_url["table"], script_url["graph"], script_url["venn"]];
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

var new_url = "https://www.programmingbiology.org/csbs?siteRevision=361"

var urlParams = new URLSearchParams(window.location.search);
if (
    urlParams.has("check") &&
    urlParams.get("check") === "programmingbiologypleaseloadmypage"
) {
    if (window.location.hostname.includes("127.0.0.1")) {
        document.getElementsByTagName("BODY")[0].style.display = "block";
        loadScript(0);
    } else {
        // goto new url
        window.location.href = new_url;
    }
} else {
    var button = document.getElementById("download");
    // Hide the download button
    button.style.display = "none";
}

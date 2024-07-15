//JS to load all the scripts

var scripts = ["./tree.js", "./graph.js", "./venn.js", "./table.js"];

// Check if the query parameter "check" equals "programmingbiologypleaseloadmypage" to load the scripts

var urlParams = new URLSearchParams(window.location.search);
if (
    urlParams.has("check") &&
    urlParams.get("check") === "programmingbiologypleaseloadmypage"
) {
    scripts.forEach(
        function (script) {
            var script = document.createElement("script");
            script.src = script;

            document.head.appendChild(script);
        },
        function () {
            console.log("All scripts loaded");
        }
    );
}

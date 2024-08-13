mapping = {
    "A" : 1,
    "B" : 2,
    "C" : 3,
    "D" : 4,
    "E" : 5,
    "F" : 6,
    "C+D" : 7,
    "C+B" : 8,
}


function updateTable(rows) {

    // Filter rows to remove null values
    rows = rows.filter(function (d) {
        return d[0] != "";
    });


    table_height = window.innerHeight - 25;
    table_width = window.screen.width;

    // Remove the existing table
    d3.select("#table").selectAll("*").remove();

    table = d3
        .select("#table")
        // .attr("overflow", "auto")
        .style("overflow", "auto")
        .attr("display", "block")
        .style("width", "99vw")
        .style("height", table_height + "px")
        .append("table")
        .style("border-collapse", "collapse")
        .style("border", "2px black solid");

    // headers
    table
        .append("thead")
        .append("tr")
        .selectAll("th")
        .data(rows[0])
        .enter()
        .append("th")
        .text(function (d) {
            return d;
        })
        .style("border", "1px black solid")
        .style("padding", "5px")
        .style("background-color", "black")
        // .style("font-weight", "bold")
        .style("color", "white")
        // .style("text-transform", "uppercase")
        //   font: 'Helvetica Light', 'Helvetica', Arial, sans-serif
        .style("font-family", "Helvetica Light")
        .style("font-weight", "100")
        
        

    // data
    table
        .append("tbody")
        .style("max-height", table_height - 100 + "px")
        .attr("overflow", "auto")
        .selectAll("tr")
        .data(rows.slice(1))
        .enter()
        .append("tr")
        .attr("id", function (d, i) {
            var doi = rows[i+1][2];
            // replace "/"" and "."" with - to avoid selecting by DOI
            doi = doi.replaceAll("/", "-");
            doi = doi.replaceAll(".", "-");
            doi = doi.toLowerCase();
            return "td-" + doi;
        })
        .on("mouseover", function () {
            d3.select(this).style("background-color", "powderblue");
        })
        .on("mouseout", function (event, d) {
            current_id = d[2].replaceAll("/", "-");
            current_id = current_id.replaceAll(".", "-");
            current_id = current_id.toLowerCase();
            if (current_id != selected_doi) {
                d3.select(this).style("background-color", function (d, i) {
                    if (d[17]){
                        return d3.color(colorscale(mapping[d[17]])).copy({opacity: 0.4});
                    } else {
                        return "white";
                    }               
                });
            }
        })
        // Add color to the row
        .style("background-color", function (d, i) {
            if (d[17]){
                // return colorscale(mapping[d[17]]);
                // Reduce opacity for the color
                return d3.color(colorscale(mapping[d[17]])).copy({opacity: 0.2});
                
            } else {
                return "white";
            }               
        })
        .selectAll("td")
        .data(function (d) {
            return d;
        })
        .enter()
        .append("td")
        .style("border", "1px black solid")
        .style("padding", "5px")
        .html(function (d, i) {
            if (i != 2) {
                return d;
            } else {
                return (
                    "<a href='http://www.doi.org/" + d + "' target='_blank'>" + d + "</a>"
                );
            }
        })

        
        .style("font-family", "Helvetica Light")
        .style("font-size", "large") 
        // .style("font-size", "large") 
        // .style("font-family", "Helvetica")
        // Increase font weight more but less than bold
        // .style("font-weight", "lighter")
}


var saveBlob = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (blob, fileName) {
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        // Remove the object from the DOM
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };
}())

// Add event listener to the download button
d3.select("#download").on("click", function () {
    // Filter rows to remove null values
    var rows = window.dataset;
    rows = rows.filter(function (d) {
        return d[0] != "";
    });
    console.log(rows)
    var csv = d3.csvFormat(rows);
    // Remove first line from the csv
    csv = csv.split("\n").slice(1).join("\n");
    var blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    file = new File([blob], "data.csv", { type: "text/csv;charset=utf-8" });
    // window.open(URL.createObjectURL(file));
    saveBlob(blob, "data.csv");
});


d3.select('fieldset').on('change', function () {
    var selectedValue = d3.select('fieldset input:checked');
    console.log(selectedValue);
});


// Fetch as text
new_data = d3.text("https://docs.google.com/spreadsheets/d/1OwYMYMnDuAxyrzR2CO1wwBVxKdZP5co6IanebfYfit0/export?format=csv").then(function (data) {
    window.dataset = d3.csvParseRows(data);
    // console.log(window.dataset); 
    updateTable(dataset);
});
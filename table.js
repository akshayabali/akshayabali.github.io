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

window.field_map = {
    "topic": [0],
    "title": [1],
    "doi": [2],
    "institution": [3],
    "location": [4],
    "last_author": [5],
    "venue": [6],
    "year": [7],
    "citations" : [8],
    "bio" : [9, 10, 11, 12, 13, 14, 15],
    "constraints" : [16],
    "group" : [17]
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
            current_id = d[field_map["doi"][0]].replaceAll("/", "-");
            current_id = current_id.replaceAll(".", "-");
            current_id = current_id.toLowerCase();
            if (current_id != selected_doi) {
                d3.select(this).style("background-color", function (d, i) {
                    if (d[field_map["group"][0]]){
                        return d3.color(colorscale(mapping[d[field_map["group"][0]]])).copy({opacity: 0.2});
                    } else {
                        return "white";
                    }               
                });
            }
        })
        // Add color to the row
        .style("background-color", function (d, i) {
            if (d[field_map["group"][0]]) {
                // Reduce opacity for the color
                return d3.color(colorscale(mapping[d[field_map["group"][0]]])).copy({opacity: 0.2});
                
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
        .style("font-size", "medium") 
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

// 0: "Topic"
// 1: "Title"
// 2: "DOI"
// 3: "Institution"
// 4: "Location"
// 5: "Last Author"
// 6: "Publication Venue"
// 7: "Year"
// 8: "Citations"
// 9: "Type / Chassis (Bio)"
// 10: "Functions"
// 11: "Materials"
// 12: "Process"
// 13: "Modalities "
// 14: "Scale"
// 15: "Mechanism"
// 16: "Application-Driven Constraints"
// 17: "Group"



d3.select('fieldset').on('change', function () {
    // Get all checked checkboxes in the fieldset
    var checked = d3.selectAll('fieldset input:checked');
    // Get the values of the checked checkboxes
    var values = checked.nodes().map(function (d) {
        return d.value;
    });

    // Get the field_map of all the checked values
    var field_map_values = values.map(function (d) {
        return field_map[d];
    });

    // Flatten the array
    field_map_values = field_map_values.flat();

    // Hide columns that are in the field_map_values
    var new_data_set = window.dataset.map(function (d) {
        return d.filter(function (d, i) {
            return !field_map_values.includes(i);
        });
    });

    // Update the table with the new data
    updateTable(new_data_set);
    console.log(new_data_set);

});


// Fetch as text
new_data = d3.text("https://docs.google.com/spreadsheets/d/1OwYMYMnDuAxyrzR2CO1wwBVxKdZP5co6IanebfYfit0/export?format=csv").then(function (data) {
    window.dataset = d3.csvParseRows(data);
    // console.log(window.dataset); 
    updateTable(dataset);
});
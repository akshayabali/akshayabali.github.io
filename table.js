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

window.field_value_map = {
    "Topic" : "topic",
    "Title" : "title",
    "DOI" : "doi",
    "Institution" : "institution",
    "Location" : "location",
    "Last Author" : "last_author",
    "Publication Venue" : "venue",
    "Year" : "year",
    "Citations" : "citations",
    "Type / Chassis (Bio)" : "bio",
    "Functions" : "bio",
    "Materials" : "bio",
    "Process" : "bio",
    "Modalities" : "bio",
    "Scale" : "bio",
    "Mechanism" : "bio",
    "Application-Driven Constraints" : "constraints",
    "Group" : "group"
}

window.current_field_map = field_value_map;

window.default_hidden_columns = ["Institution", "Location", "Publication Venue", "Year", "Citations", "Type / Chassis (Bio)", "Functions", "Materials", "Process", "Modalities", "Scale", "Mechanism", "Application-Driven Constraints"];

window.current_hidden_columns = default_hidden_columns;


function updateTable(rows) {

    // Filter rows to remove null values
    rows = rows.filter(function (d) {
        return d[0] != "";
    });

    var hidden_columns = [];
    // Create array of indices to hide
    for (var col in current_hidden_columns) {
        var value = field_map[field_value_map[current_hidden_columns[col]]];
        if (!hidden_columns.includes(value)) {
            hidden_columns.push(value);
        }
    }

    // Flatten the array
    hidden_columns = hidden_columns.flat();


    // Hide columns that are in the hidden_columns
    var rows = rows.map(function (d) {
        return d.filter(function (d, i) {
            return !hidden_columns.includes(i);
        });
    });

    // Create current_field_map from rows[0] and field_map
    window.current_field_map = {};
    rows[0].forEach(function (d, i) {
        var value = field_value_map[d];
        if (value in current_field_map) {
            current_field_map[value].push(i);
        } else {
            current_field_map[value] = [i];
        }
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
            current_id = d[current_field_map["doi"][0]].replaceAll("/", "-");
            current_id = current_id.replaceAll(".", "-");
            current_id = current_id.toLowerCase();
            if (current_id != selected_doi) {
                d3.select(this).style("background-color", function (d, i) {
                    if (d[current_field_map["group"][0]]){
                        return d3.color(colorscale(mapping[d[current_field_map["group"][0]]])).copy({opacity: 0.2});
                    } else {
                        return "white";
                    }               
                });
            }
        })
        // Add color to the row
        .style("background-color", function (d, i) {
            if (d[current_field_map["group"][0]]) {
                // Reduce opacity for the color
                return d3.color(colorscale(mapping[d[current_field_map["group"][0]]])).copy({opacity: 0.2});
                
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


d3.select('fieldset').on('change', function () {
    // Get all checked checkboxes in the fieldset
    var checked = d3.selectAll('fieldset input:checked');
    // Get the values of the checked checkboxes
    var values = checked.nodes().map(function (d) {
        return d.value;
    });

    // using field_value_map and values to get the actual keys for columns to hide
    var hidden_columns = [];
    values.forEach(function (d) {
        var value = field_map[d];
        if (!hidden_columns.includes(value)) {
            hidden_columns.push(value);
        }
    });

    // Flatten the array
    hidden_columns = hidden_columns.flat();

    var hidden_column_names = [];

    for (var name in window.dataset[0]) {
        if (!hidden_columns.includes(parseInt(name))) {
            hidden_column_names.push(window.dataset[0][name]);
        }
    }

    console.log("Names: ", hidden_column_names);

    window.current_hidden_columns = default_hidden_columns.filter(function (d) {
        return !hidden_column_names.includes(d);
    });

    console.log("Hidden Columns: ", current_hidden_columns);

    // Update the table with the new data
    updateTable(window.dataset);

});


// Fetch as text
new_data = d3.text("https://docs.google.com/spreadsheets/d/1OwYMYMnDuAxyrzR2CO1wwBVxKdZP5co6IanebfYfit0/export?format=csv").then(function (data) {
    window.dataset = d3.csvParseRows(data);
    // console.log(window.dataset); 
    updateTable(window.dataset);
});
canWidth  = window.screen.width  * 0.9;
// canHeight = 650 + 110;
canHeight = window.screen.height * 0.7;

var tree_nodes = [
    {
        "name": "Type B",
        "image": "type_b.png",
        "id_name": "Type B"
    },
    {
        "name": "Type D",
        "image": "type_d.png",
        "id_name": "Type D"
    },
    {
        "name": "Type C",
        "image": "type_c.png",
        "id_name": "Type C"
    },
    {
        "name": "Type A",
        "image": "type_a.png",
        "id_name": "Type A"
    },
    {
        "name": "Type F",
        "image": "type_f.png",
        "id_name": "Type F"
    },
    {
        "name": "Type E",
        "image": "type_e.png",
        "id_name": "Type E"
    },
    {
        "name": "Type D",
        "image": "type_d.png",
        "id_name": "Type D_2"
    }
];

decisions = [
    {
        "name": "Portable",
        "one": "Type D",
        "two": "Type C",
        "level": 1,
        "left_text": "Yes",
        "right_text": "No"
    },
    {
        "name": "Customized",
        "one": "Type D_2",
        "two": "Type E",
        "level": 1,
        "left_text": "Yes",
        "right_text": "No"
    },
    {
        "name": "Deployable",
        "one": "Customized",
        "two": "Type F",
        "level": 2,
        "left_text": "Yes",
        "right_text": "No"
    },
    {
        "name": "Measurement",
        "one": "Portable",
        "two": "Type B",
        "level": 2,
        "left_text": "Optical",
        "right_text": "Electrical"
    },
    {
        "name": "Microfluidic",
        "one": "Measurement",
        "two": "Type A",
        "level": 3,
        "left_text": "Yes",
        "right_text": "No"
    },
    {
        "name": "Lab",
        "one": "Microfluidic",
        "two": "Deployable",
        "level": 4,
        "left_text": "Yes",
        "right_text": "No"
    }
]


var tree_nodes_length = tree_nodes.length;

rectWidth = canWidth / (tree_nodes_length + 3) < 170 ? 170 : canWidth / (tree_nodes_length + 3);
rectHeight = canHeight / 11;
rectRadius = 10;

diamondWidth  = canHeight / 11;
diamondHeight = canHeight / 11;  

application_width = canHeight / 7;  
application_height = canHeight / 16;  
application_radius = 30;

window.font_size = application_height / 3.3;


for (let i = 0; i < decisions.length; i++) {
    // Get one_id and two_id
    one_text = decisions[i].one;
    two_text = decisions[i].two;

    one_id = -1;
    two_id = -1;

    for (let j = 0; j < tree_nodes.length; j++) {
        if (tree_nodes[j].id_name == one_text) {
            one_id = "node-" + j;
        }
        if (tree_nodes[j].id_name == two_text) {
            two_id = "node-" + j;
        }
    }

    if (one_id == -1) {
        one_id = "d-" + one_text.toLowerCase();
    }
    if (two_id == -1) {
        two_id = "d-" + two_text.toLowerCase();
    }

    decisions[i]["one_id"] = one_id;
    decisions[i]["two_id"] = two_id;
}

window.selected_tree = null;

var canvas = d3
    .select("#tree")
    .append("svg")
    .attr("width", canWidth)
    .attr("height", canHeight)
    .append("g")
    

var tree_node = canvas
    .selectAll(".node")
    .data(tree_nodes)
    .enter()
    .append("g")
    .attr("id", function (d, i) {
        return "node-" + i;
    })
    .attr("class", "node")
    .attr("transform", function (d, i) {
        per_rect_padding = (canWidth - (rectWidth * tree_nodes.length)) / ( tree_nodes.length - 1);
        return "translate(" + (i * (rectWidth + per_rect_padding)) + ", " + (canHeight - 2 * rectHeight) + ")";
    })
    .on("mouseover", function (event, d) {
        var id = d.name.split(" ")[1];
        for (let i = 0; i < graph_labels.length; i++) {
            if (graph_labels[i].group == id) {
                d3.select(this).select("rect").attr("fill", colorscale(graph_labels[i].id));
            }
        }
    })
    .on("mouseout", function (event, d) {
        var id = d.name.split(" ")[1];
        for (let i = 0; i < graph_labels.length; i++) {
            if (graph_labels[i].group == id) {
                d3.select(this).select("rect").attr("fill", colorscale(graph_labels[i].id) + "b9");
            }
        }
    })
    .on("click", function (event, d) {
        var id = d.name.split(" ")[1];
        if (selected_tree != null) {
            d3.select(selected_tree).select("rect").attr("stroke-width", 1.5);
            if (selected_tree == this) {
                selected_tree = null;
                console.log("Unselected");
                my_dataset = dataset;
                updateTable(my_dataset);    
                return;
            }
        }
        selected_tree = this;
        if (selectedVenn != null) {
            var selection = d3.select(window.selectedVenn.element).transition("tooltip").duration(400);
            selection.select("path")
                .style("fill-opacity", selectedVenn.data.sets.length == 1 ? .25 : .0)
                .style("stroke-opacity", 0);
            window.selectedVenn = null;
        }
        d3.select(this).select("rect").attr("stroke-width", 4);
        // console.log(dataset);
        headers = dataset[0];
        my_dataset = dataset.filter(function (d) {
            // console.log(d[24]);
            if (d[17].includes(id)) {
                return true;
            }
            return false;
        });
        my_dataset.unshift(headers);
        updateTable(my_dataset);
    });



    tree_node
    .append("rect")
    .attr("width", rectWidth)
    .attr("height", rectHeight)
    .attr("fill", "rgba(255, 255, 255, 0)")
    .attr("stroke", "black")
    .attr("rx", rectRadius)
    .attr("stroke-width", 1.5);

    tree_node
    .append("text")
    .attr("x", rectWidth / 2)
    .attr("y", rectHeight / 2)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("x", 4 * rectWidth / 5)
    .attr("font-size", font_size)
    .text(function (d) {
        return d.name;
    });

    tree_node
    .append("image")
    .attr("xlink:href", function (d) {
        return "images/"+d.image;
    })
    .attr("width", rectWidth/2)
    .attr("height", rectHeight-10)
    .attr("x", 10)
    .attr("y", 5);

decision_diamond = canvas
    .selectAll(".decision")
    .data(decisions)
    .enter()
    .append("g")
    .attr("id", function (d) {
        return "d-" + d.name.toLowerCase();
    })
    .attr("transform", function (d) {
        // Get location of node type D and type C
        type_one = d3.select("#" + d.one_id).attr("transform");
        type_two = d3.select("#" + d.two_id).attr("transform");
        type_one_x = parseInt(type_one.split(",")[0].split("(")[1]);
        type_two_x = parseInt(type_two.split(",")[0].split("(")[1]);
        center_x = (parseInt(type_one_x) + parseInt(type_two_x)) / 2 ;
        if (d.one_id.includes("node")) {
            center_x += rectWidth / 2;
        }
        var y = canHeight - ((d.level + 1 ) * (diamondHeight * 2) ) ;
        return "translate(" + (center_x) + ", " + (y) + ")";
    });

decision_diamond
    .append("rect")
    .attr("width", diamondWidth)
    .attr("height", diamondHeight)
    .attr("fill", "white")
    .attr("rx", 8)
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    .attr("transform", "rotate(45)");

decision_diamond
    .append("text")
    .attr("y", diamondHeight / 1.4 + 3)
    .attr("text-anchor", "middle")
    .attr("font-size", font_size)
    .text(function (d) {
        return d.name;
    });

var application = canvas.append("g")
    .attr("transform", function (d) {   
        type_only = d3.select("#d-lab").attr("transform");
        type_only_x = parseInt(type_only.split(",")[0].split("(")[1]);
        return "translate(" + (type_only_x - application_width/2) + ", " + 10 + ")";
    }
);

application
    .append("rect")
    .attr("width", application_width)
    .attr("height", application_height)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    // rounded corners
    .attr("rx", application_radius)

// add text to the application
application
    .append("text")
    .attr("x", application_width / 2)
    .attr("y", application_height / 2)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("font-size", font_size)
    .text("Application");

for (let i = 0; i < decisions.length; i++) {
    one_id = decisions[i].one_id;
    two_id = decisions[i].two_id;
    my_id = "d-"+ decisions[i].name.toLowerCase();
    one = d3.select("#" + one_id).attr("transform");
    two = d3.select("#" + two_id).attr("transform");
    me = d3.select("#" + my_id).attr("transform");
    one_x = parseInt(one.split(",")[0].split("(")[1]);
    one_y = parseInt(one.split(",")[1].split(")")[0]);
    two_x = parseInt(two.split(",")[0].split("(")[1]);
    two_y = parseInt(two.split(",")[1].split(")")[0]);
    me_x = parseInt(me.split(",")[0].split("(")[1]);
    me_y = parseInt(me.split(",")[1].split(")")[0]);
    if (one_id.includes("node")) {
        one_x += rectWidth / 2;
    }
    if (two_id.includes("node")) {
        two_x += rectWidth / 2;
    }

    canvas.append("path")
        .attr("d", "M" + (me_x < one_x ? me_x + diamondWidth / 1.44 : me_x - diamondWidth / 1.44) + "," + (me_y + diamondHeight / 1.44) + "L" + one_x + "," + (me_y + diamondHeight / 1.44) + "L" + one_x + "," + one_y)
        .attr("stroke", "black")
        .attr("stroke-width", 1.5)
        .attr("fill", "none");

    canvas.append("path")
        .attr("d", "M" + (me_x < two_x ? me_x + diamondWidth / 1.44 : me_x - diamondWidth / 1.44) + "," + (me_y + diamondHeight / 1.44) + "L" + two_x + "," + (me_y + diamondHeight / 1.44) + "L" + two_x + "," + two_y)
        .attr("stroke", "black")
        .attr("stroke-width", 1.5)
        .attr("fill", "none");

    // Arrow heads pointing down
    canvas.append("path")
        .attr("d", "M" + (one_x - 5) + "," + (one_y - 10) + "L" + one_x + "," + one_y + "L" + (one_x + 5) + "," + (one_y - 10) + "Z")
        .attr("stroke", "black")
        .attr("stroke-width", 1.5)
        .attr("fill", "black");

    canvas.append("path")
        .attr("d", "M" + (two_x - 5) + "," + (two_y - 10) + "L" + two_x + "," + two_y + "L" + (two_x + 5) + "," + (two_y - 10) + "Z")
        .attr("stroke", "black")
        .attr("stroke-width", 1.5)
        .attr("fill", "black");

    // Add Left and Right text

    canvas
        .append("g")
        .append("text")
        .attr("x", (me_x < one_x ? me_x + diamondWidth / 1.44 + (font_size * 2) : me_x - diamondWidth / 1.44 - (font_size * 2)))
        .attr("y", (me_y + diamondHeight / 1.44) - font_size)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("font-size", font_size)
        .text(decisions[i].left_text);

    canvas
        .append("g")
        .append("text")
        .attr("x", (me_x < two_x ? me_x + diamondWidth / 1.44 + (font_size * 2) : me_x - diamondWidth / 1.44 - (font_size * 2)))
        .attr("y", (me_y + diamondHeight / 1.44) - font_size)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("font-size", font_size)
        .text(decisions[i].right_text);
}

// Add line between application and Lab
lab = d3.select("#d-lab").attr("transform");
lab_x = parseInt(lab.split(",")[0].split("(")[1]);
lab_y = parseInt(lab.split(",")[1].split(")")[0]);
application_x = lab_x;
application_y = 10 + application_height;

canvas.append("path")
    .attr("d", "M" + application_x + "," + application_y + "L" + lab_x + "," + lab_y)
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    .attr("fill", "none");

// Arrow head pointing down
canvas.append("path")
    .attr("d", "M" + (application_x - 5) + "," + (lab_y - 10) + "L" + application_x + "," + lab_y + "L" + (application_x + 5) + "," + (lab_y - 10) + "Z")
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    .attr("fill", "black");
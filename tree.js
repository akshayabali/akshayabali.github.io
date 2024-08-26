
var canWidth  = 2800;
var canHeight = 1050;

var my_color_scale = [
    "#1f78b4", // dark blue      // Type F
    "#a6cee3", // light blue     // Type E
    // "#b2df8a", // light green    // Type D
    "#b15928", // brown          // Type
    "#e31a1c", // red            // Type A
    "#fb9a99", // pink           // Type B
    "#6a3d9a", // purple         // Type C
    "#ff7f00", // orange         // Type C+D
    "#fdbf6f", // mustard        // Type C+B
    "#cab2d6", // brown          // Type 
    "#ffffff", // yellow         // Type
    "#33a02c", // green          // Type 
    "#b15928", // brown          // Type
    "#f781bf", // pink           // Type
    "#B3B3B3", // grey           // Type 
];



window.colorscale = d3.scaleOrdinal(my_color_scale);

window.citation_count = 0;
window.citation_object = {};

window.create_citation = function (url) {
    citation_count += 1;
    return "[" + citation_count + "]";
}

// A	BioPOLOS
// B	BioHELOS
// C	BioHOLOS
// D	BioHEMOS
// E	BioMICS
// F	(Sec)BioFICS
// C+B	BioHOLOS+BioHELOS
// C+D	BioHOLOS+BioHEMOS

var tree_nodes = [
    {
        // "name": "Type A",
        "name": "BioPOLOS",
        "image": "https://static.wixstatic.com/media/474df2_0a164f5b88424d198e0426bfaee903fb~mv2.png",
        // "id_name": "Type A",
        "id_name": "BioPOLOS",
        "description": "BioPOLOS  are pure-engineered  biological systems designed for laboratory use and evaluated with precise benchtop instruments, such as plate readers for analyzing optical properties, without the need for microfluidics or electronic components. [37] discusses tools for constructing genetic circuits, assembly failure modes, and mitigation techniques, showcasing examples of pure-engineered biological systems.",
        "group": 1,
        "position": 0,
    },
    {
        // "name": "Type B",
        "name": "BioHELOS",
        "image": "https://static.wixstatic.com/media/474df2_cda4128518af4ce0932ff563212e38b4~mv2.png",
        // "id_name": "Type B",
        "id_name": "BioHELOS",
        "description": "BioHELOS are hybrid-engineered biological systems that utilize microfluidics and are evaluated with precise electrical benchtop instruments, such as potentiostats and LCR meters, to analyze cellular properties and electrochemical reactions. An example is a microfluidic device featuring integrated metal electrodes for the electrical interrogation and impedance spectroscopy of individual bacterial cells [25]. This system utilizes an LCR meter to perform impedance measurements and detect cell viability.",
        "group": 2,
        "position": 1,
    },
    {
        // "name": "Type C",
        "name": "BioHOLOS",
        "image": "https://static.wixstatic.com/media/474df2_efbfe6af874f4fb98e1a3bcbb69dd317~mv2.png",
        // "id_name": "Type C",
        "id_name": "BioHOLOS",
        "description": "BioHOLOS are hybrid-engineered biological systems analyzed using optical techniques within microfluidic setups and evaluated with benchtop instruments, such as flow cytometers, fluorescence detectors, and photon counters. An example is a microfabricated fluorescence-activated cell sorter using a benchtop experimental setup, which includes an inverted optical microscope and a photomultiplier tube [1].",
        "group": 3,
        "position": 2,
    },
    {
        // "name": "Type E",
        "name": "BioMICS",
        "image": "https://static.wixstatic.com/media/474df2_1eff044c43fd4533aa4e098121019397~mv2.png",
        // "id_name": "Type E",
        "id_name": "BioMICS",
        "description": "BioMICS are hybrid-engineered biological systems with independently designed custom CMOS electronics and microfluidics, which are portable but not yet ready for stand-alone field deployment. An example is a modular droplet microfluidic device embedded with custom CMOS electronic sensors for rapid screening of engineered biological systems under deployment conditions, although it requires syringe pumps and is not sufficiently miniaturized for field deployment [150].",
        "group": 5,
        "position": 3,
    },
    {
        // "name": "Type F",
        "name": "(Sec)BioFICS",
        "image": "https://static.wixstatic.com/media/474df2_1f1407025af44a77a86d47252a4b4b89~mv2.png",
        // "id_name": "Type F",
        "id_name": "(Sec)BioFICS",
        "description": "(Sec)BioFICS are stand-alone, fully integrated field-deployable systems that use custom-designed CMOS electronics embedded within microfluidic housings, integrating all necessary components to ensure reliable data generation, wireless communication, and optimal integration between electronic and biological elements without needing any external components. One example is a miniaturized ingestible capsule combining luminescent engineered bacterial sensors with ultra-low-power custom CMOS electronics for detecting gastrointestinal inflammation [89].  Another example is a low-cost point-of-care (POC) biomolecular diagnostics system that fully integrates cell manipulation, cytometry, separation, and pneumatic-free bulk fluid flow control within a microfluidic channel using custom CMOS electronics [115].",
        "group": 6,
        "position": 4,
    },
    {
        // "name": "Type D",
        "name": "BioHEMOS",
        "image": "https://static.wixstatic.com/media/474df2_bd1db39b17fd46ad8b31b4b78c1530ee~mv2.png",
        // "id_name": "Type D",
        "id_name": "BioHEMOS",
        "description": "BioHEMOS are hybrid-engineered biological systems equipped with portable commercial electronics for data generation, processing, and wireless communication, eliminating the need for highly precise benchtop equipment and thus facilitating deployment. An example is a low-cost electronic optical reader, using LED light sources and commercial electronic sensors connected to an Arduino, for quantifying the colorimetric response from freeze-dried, paper-based reactions of synthetic gene networks [72].",
        "group": 4,
        "position": 5,
    },
];

decisions = [
    {
        "name": "Integration",
        "id": "Customized",
        // "one": "Type F",
        // "two": "Type E",
        "one": "(Sec)BioFICS",
        "two": "BioMICS",
        "level": 1,
        "left_text": "Fully integrated",
        "right_text": "Multicomponent",
        "description": "Stand-alone systems are classified as such when they fully integrate custom-designed wireless electronics within miniaturized microfluidic enclosures, thus eliminating the need for external wiring during field deployment. Stand-alone systems require minimal physical interaction, may be single-use, and are likely deployed in remote, inaccessible areas",
    },
    {
        "name": "Process",
        "id": "Deployable",
        "one": "Customized",
        // "two": "Type D",
        "two": "BioHEMOS",
        "level": 2,
        "left_text": "Custom IC",
        "right_text": "Commercial Electronics",
        "description": "Portable systems use either off-the-shelf commercial electronics or custom-designed integrated circuits (ICs) tailored to specific application needs. The selection of these options depends on the availability of components, packaging needs, cost, and the expertise of the development group related to custom electronics design, development, fabrication, and test. ",
    },
    {
        "name": "Measurement",
        "id": "Measurement",
        // "one": "Type C",
        // "two": "Type B",
        "one": "BioHOLOS",
        "two": "BioHELOS",
        "level": 1,
        "left_text": "Optical",
        "right_text": "Electrical",
        "description": "Engineered biological systems use electrical or optical readout mechanisms for laboratory performance characterization. The selection of these options will depend on the biological mechanism that is available and the user’s need for its precision, accuracy, and speed.",
    },
    {
        "name": "Fluid Control",
        "id": "Microfluidic",
        "one": "Measurement",
        // "two": "Type A",
        "two": "BioPOLOS",
        "level": 2,
        "left_text": "Small volume of controlled fluids",
        "right_text": "No controlled fluids",
        "description": "Engineered biological systems can operate in static, single sampled labware or specialized micro-environments controlling small liquid volumes via microfluidics. The application needs, budget, and system constraints will determine which path will be chosen.",
    },
    {
        "name": "Motivation",
        "id": "Motivation",
        "one": "Microfluidic",
        "two": "Deployable",
        "level": 3,
        "left_text": "Development",
        "right_text": "Deployment",
        "description": "Engineered biological systems  follow two pathways: controlled laboratory development with benchtop equipment or cost-effective, miniaturized deployment with wireless electronics and microfluidics. The former path is selected for exploratory research where elements of the system (electronic, biological, or microfluidic) must be developed, refined, and tested. The latter path is for more mature platforms where early-stage prototyping processes have been completed.",
    }
]

window.clear_selected = function () {
    if (selected_tree != null) {
        d3.select(selected_tree).select("rect").attr("stroke-width", 1.5);
        selected_tree = null;
    }
    if (selected_venn != null) {
        var selection = d3.select(window.selected_venn.element).transition("tooltip").duration(400);
        selection.select("path")
            .style("fill-opacity", selected_venn.data.sets.length == 1 ? .25 : .0)
            .style("stroke-opacity", 0);
        window.selected_venn = null;
    }
    if (selected_spider != null) {
        d3.select(selected_spider).attr("stroke", d3.select(selected_spider).attr("my-stroke"));
    }
    my_dataset = dataset;
    updateTable(my_dataset);
    return;
}

window.select_dataset = function (id) {
    headers = dataset[0];
    id = id.split(",");
    console.log(id);
    my_dataset = dataset.filter(function (d) {
        for (let i = 0; i < id.length; i++) {
            var check_id = id[i].replace(" ", "");
            if (d[field_map["class"][0]].includes(check_id)) {
                return true;
            }
        }
        return false;
    });
    my_dataset.unshift(headers);
    updateTable(my_dataset);
}


var tree_nodes_length = tree_nodes.length;

rectWidth = 420;
rectHeight = 170;
rectRadius = 10;

diamondWidth  = 150;
diamondHeight = diamondWidth; 

application_width = 200;  
application_height = 70;  
application_radius = 30;

window.font_size = 18;
window.tree_font_size = font_size * 1.5;

window.tooltip = d3.select("body").append("div")
    .attr("class", "venntooltip")
    .attr("height", tree_font_size)
    .style("font-size", "small") 
    // .attr("width", application_width)
    .on("mousemove", function(event, d) {

        var tooltip_x = event.pageX + 500 > window.screen.width ? event.pageX - 510 : event.pageX + 10;

        tooltip.style("left", tooltip_x + "px")
               .style("top",  (event.pageY - 28) + "px");
    })


for (let i = 0; i < decisions.length; i++) {
    // Get one_id and two_id
    one_text = decisions[i].one;
    two_text = decisions[i].two;

    one_id = -1;
    two_id = -1;

    for (let j = 0; j < tree_nodes.length; j++) {
        if (tree_nodes[j].id_name == one_text) {
            one_id = "node-" + tree_nodes[j].group;
        }
        if (tree_nodes[j].id_name == two_text) {
            two_id = "node-" + tree_nodes[j].group;
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

var viewBox_width = canWidth;
var viewBox_height = canHeight;
// var viewBox_width = canWidth > window.innerWidth  * 0.92 ? canWidth : window.innerWidth  * 0.92;
// var viewBox_height = canHeight > window.innerHeight * 0.7 ? canHeight : window.innerHeight * 0.7;

var canvas = d3
    .select("#tree")
    .append("svg")
    .attr("width", window.innerWidth * 0.98)
    .attr("height", window.innerHeight * 0.65)
    // .attr("viewBox", "0 0 " + window.innerWidth * 0.92 + " " + window.innerHeight * 0.7)
    .attr("viewBox", "0 0 " + viewBox_width + " " + viewBox_height)
    .append("g")
    

var tree_nodes_sorted = tree_nodes.sort(function (a, b) {
    return a.group - b.group;
});

var tree_node = canvas
    .selectAll(".node")
    .data(tree_nodes_sorted)
    .enter()
    .append("g")
    .attr("id", function (d, i) {
        // console.log(d, i)
        return "node-" + (d.group);
    })
    .attr("class", "node")
    .attr("transform", function (d, i) {
        per_rect_padding = (canWidth - (rectWidth * tree_nodes.length)) / ( tree_nodes.length - 1);
        return "translate(" + (d.position * (rectWidth + per_rect_padding)) + ", " + (canHeight - 1.2 * rectHeight) + ")";
    })
    .on("mouseover ", function (event, d) {

        var id = d.name.split(" ")[0];
        for (let i = 0; i < graph_labels.length; i++) {
            if (graph_labels[i].group == id) {
                d3.select(this).select("rect").attr("fill", colorscale(graph_labels[i].id));
            }
        }
        var description = d.description;
        tooltip.style("opacity", .9);
        tooltip.text(description);
        tooltip.style("width", 500 + "px")
    })
    .on("mousemove", function(event, d) {

        var tooltip_x = event.pageX;

        tooltip_x = event.pageX + 500 > window.screen.width ? event.pageX - 600 : event.pageX + 10;

        tooltip.style("left", tooltip_x + "px")
               .style("top",  (event.pageY - 28) + "px");
    })
    .on("mouseout", function (event, d) {
        tooltip.style("opacity", 0);
        tooltip.style("width", 128 + "px")
        // tooltip.transition().duration(400).style("opacity", 0);
        var id = d.name.split(" ")[0];
        for (let i = 0; i < graph_labels.length; i++) {
            if (graph_labels[i].group == id) {
                d3.select(this).select("rect").attr("fill", colorscale(graph_labels[i].id) + "b9");
            }
        }

    })
    .on("click", function (event, d) {
        var id = d.name.split(" ")[0];
        if (selected_tree == this) {
            clear_selected();
            return;
        }
        clear_selected();
        selected_tree = this;
        d3.select(this).select("rect").attr("stroke-width", 4);
        select_dataset(id);
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
    .attr("x", 4 * rectWidth / 5.5)
    .attr("font-size", tree_font_size)
    .text(function (d) {
        return d.name;
    });

tree_node
    .append("image")
    .attr("xlink:href", function (d) {
        return d.image;
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
        return "d-" + d.id.toLowerCase();
    })
    .attr("transform", function (d) {
        // Get location of node type D and type C
        var type_one = d3.select("#" + d.one_id).attr("transform");
        var type_one_width = d.one_id.includes("node") ? rectWidth : 0;
        var type_two = d3.select("#" + d.two_id).attr("transform");
        var type_two_width = d.two_id.includes("node") ? rectWidth : 0;
        var type_one_x = parseInt(type_one.split(",")[0].split("(")[1]) + (parseInt(type_one_width) / 2);
        var type_two_x = parseInt(type_two.split(",")[0].split("(")[1]) + (parseInt(type_two_width) / 2);
        var center_x = ((parseInt(type_one_x) + parseInt(type_two_x)) / 2);
        var y = canHeight - ((d.level+1) * (diamondHeight*1.5) ) ;
        return "translate(" + (center_x) + ", " + (y) + ")";
    })
    .on("mouseover ", function (event, d) {
        var description = d.description;
        tooltip.style("opacity", .9);
        tooltip.text(description);
        tooltip.style("width", 500 + "px")

        d3.select(this).select("rect").attr("fill", "rgba(200, 200, 200, 0.5)");
    })
    .on("mousemove", function(event, d) {
        var tooltip_x = event.pageX;
        tooltip_x = event.pageX + 500 > window.screen.width ? event.pageX - 510 : event.pageX + 10;
        tooltip.style("left", tooltip_x + "px")
               .style("top",  (event.pageY - 28) + "px");
    })
    .on("mouseout", function (event, d) {
        tooltip.style("opacity", 0);
        tooltip.style("width", 128 + "px")
        d3.select(this).select("rect").attr("fill", "white");
    })

decision_diamond
    .append("rect")
    .attr("width", diamondWidth)
    .attr("height", diamondHeight)
    .attr("fill", "white")
    .attr("rx", 8)
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    .attr("transform", "rotate(45)")

decision_diamond
    .append("g")
    .attr("width", diamondWidth / 1.44)
    .style("max-width", diamondWidth / 1.44)
    .style("display", "block")
    // .attr("overflow", "hidden")
    .style("overflow", "hidden")
    .append("text")
    .style("display", "block")
    .style("max-width", diamondWidth / 1.44)
    .attr("y", diamondHeight / 1.4 + 3)
    .attr("text-anchor", "middle")
    .attr("font-size", tree_font_size)
    // .attr("overflow", "hidden")
    .style("overflow", "hidden")
    .text(function (d) {
        return d.name;
    });

var application = canvas.append("g")
    .attr("transform", function (d) {   
        type_only = d3.select("#d-motivation").attr("transform");
        type_only_x = parseInt(type_only.split(",")[0].split("(")[1]);
        // type_only_x = canWidth / 2;
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
    .attr("font-size", tree_font_size)
    .text("Application");

for (let i = 0; i < decisions.length; i++) {
    one_id = decisions[i].one_id;
    two_id = decisions[i].two_id;
    my_id = "d-"+ decisions[i].id.toLowerCase();
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
        // .attr("x", (me_x < one_x ? me_x + diamondWidth / 1.44 + (tree_font_size * 7) : me_x - diamondWidth / 1.44 - (tree_font_size * 7)))
        .attr("x", one_x)
        .attr("y", (me_y + diamondHeight / 1.44) - tree_font_size)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("font-size", tree_font_size)
        .text(decisions[i].left_text);

    canvas
        .append("g")
        .append("text")
        // .attr("x", (me_x < two_x ? me_x + diamondWidth / 1.44 + (tree_font_size * 7) : me_x - diamondWidth / 1.44 - (tree_font_size * 7)))
        .attr("x", two_x)
        .attr("y", (me_y + diamondHeight / 1.44) - tree_font_size)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("font-size", tree_font_size)
        .text(decisions[i].right_text);
}

// Add line between application and Lab
lab = d3.select("#d-motivation").attr("transform");
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
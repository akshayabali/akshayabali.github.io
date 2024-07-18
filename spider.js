let data = [];
let features = ["Integration Level", "Precision", "Cost Effectiveness", "Deployability", "Disposability"];

// 1.	Integration Level: The level of integration improves as more functions are combined into a single device.
// 2.	Deployability: Field deployability improves when systems are self-contained and use wireless communications.
// 3.	Disposability (Reuse): Reuse improves for in-lab systems used for development, whereas hybrid systems designed for deployment are disposable.
// 4.	Cost Effectiveness: Costs increase for systems in the development stage requiring precise benchtop equipment in a laboratory environment, whereas fully integrated hybrid systems using CMOS electronics are designed to be cost-effective for field deployment.
// 5.	Precision: Measurements using expensive benchtop equipment are more precise than those conducted with cost-effective portable CMOS electronics.


var feature_description = {
    "Integration Level": "The level of integration improves as more functions are combined into a single device.",
    "Deployability": "Field deployability improves when systems are self-contained and use wireless communications.",
    "Disposability": "Reuse improves for in-lab systems used for development, whereas hybrid systems designed for deployment are disposable.",
    "Cost Effectiveness": "Costs increase for systems in the development stage requiring precise benchtop equipment in a laboratory environment, whereas fully integrated hybrid systems using CMOS electronics are designed to be cost-effective for field deployment.",
    "Precision": "Measurements using expensive benchtop equipment are more precise than those conducted with cost-effective portable CMOS electronics."
}

// A to F 
// Integration Level 1, 1, 1, 2, 3, 5
// Precision 5, 4, 4, 3, 3, 3
// Cost Effectiveness 1, 2, 2, 3, 4, 5
// Deployability 1, 1, 1, 3, 4, 5
// Disposability 1, 1, 1, 3, 4, 5


var spider_data = [
    {
        "name" : "Type F",
        "group" : 6,
        "data" : {
            "Integration Level": 5,
            "Precision": 3,
            "Cost Effectiveness": 5,
            "Deployability": 5,
            "Disposability": 5
        }
    },
    {
        "name" : "Type E",
        "group" : 5,
        "data" : {
            "Integration Level": 3,
            "Precision": 3,
            "Cost Effectiveness": 4,
            "Deployability": 4,
            "Disposability": 4
        }
    },
    {
        "name" : "Type D",
        "group" : 4,
        "data" : {
            "Integration Level": 3,
            "Precision": 3,
            "Cost Effectiveness": 3,
            "Deployability": 3,
            "Disposability": 3
        }
    },
    {
        "name" : "Type C",
        "group" : 3,
        "data" : {
            "Integration Level": 2,
            "Precision": 3,
            "Cost Effectiveness": 2,
            "Deployability": 1,
            "Disposability": 1
        }
    },
    {
        "name" : "Type B",
        "group" : 2,
        "data" : {
            "Integration Level": 1,
            "Precision": 4,
            "Cost Effectiveness": 2,
            "Deployability": 1,
            "Disposability": 1
        }
    },
    {
        "name" : "Type A",
        "group" : 1,
        "data" : {
            "Integration Level": 1,
            "Precision": 5,
            "Cost Effectiveness": 1,
            "Deployability": 1,
            "Disposability": 1
        }
    }
];

var canWidth = 500;
var canHeight = 700;

window.spider_font_scaling = 1.5;

var spiderSVG = d3.select("#spider").append("svg")
    .attr("width", window.innerWidth / 3)
    .attr("height", window.innerHeight * 0.4)
    .attr("viewBox", [0, 0, canWidth, canHeight])


let radialScale = d3.scaleLinear()
    .domain([0, 5])
    .range([0, 250]);

let ticks = [1,2,3,4,5];

spiderSVG
    .append("g")
    .attr("class", "radial-ticks")
    .selectAll("circle")
    .data(ticks)
    .join(
        enter => enter.append("circle")
            .attr("cx", canWidth / 2)
            .attr("cy", canHeight / 2)
            .attr("fill", "none")
            .attr("stroke", "gray")
            .attr("r", d => radialScale(d))
    );

spiderSVG
    .append("g")
    .attr("class", "radial-tick-labels")
    .selectAll(".ticklabel")
    .data(ticks)
    .join(
        enter => enter.append("text")
            .attr("class", "ticklabel")
            .attr("x", canWidth / 2 + 5)
            .attr("y", d => canHeight / 2 - radialScale(d))
            .text(d => d.toString())
    );

function angleToCoordinate(angle, value){
    let x = Math.cos(angle) * radialScale(value);
    let y = Math.sin(angle) * radialScale(value);
    return {"x": canWidth / 2 + x, "y": canHeight / 2 - y};
}

function getCenterCoordinates(){
    return {"x": canWidth / 2, "y": canHeight / 2};
}

function distance(point1, point2){
    return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
}

// Function to find the closest distance to the center coordinates
function closestPointToCenter(x1, x2, y1, y2){
    let coordinates = [{"x": x1, "y": y1}, {"x": x1, "y": y2}, {"x": x2, "y": y2}, {"x": x2, "y": y1}];
    var point = getCenterCoordinates();
    let minDistance = Number.MAX_VALUE;
    var index = -1;
    for (var i = 0; i < coordinates.length; i++){
        let currentDistance = distance(point, coordinates[i]);
        if (currentDistance < minDistance){
            minDistance = currentDistance;
            index = i;
        }
    }
    return index;
}

function adjustCoordinates(x1, y1, font_size, text_length, index){
    switch(index){
        case 0:
            return {"x": x1, "y": y1};
        case 1:
            return {"x": x1, "y": y1 + (font_size * spider_font_scaling)};
        case 2:
            return {"x": x1 - text_length, "y": y1 + (font_size * spider_font_scaling)};
        case 3:
            return {"x": x1 - text_length, "y": y1};
    }
}

function addDotToCoordinates(x, y){
    spiderSVG.append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 3)
        .attr("fill", "black");
}

var label_rects = spiderSVG
                    .append("g")
                    .attr("class", "label-rectangles")

let featureData = features.map((f, i) => {
    let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
    var label_coords = angleToCoordinate(angle, 5.6);
    var label_x1 = label_coords.x;
    var label_y1 = label_coords.y;
    var text_length = f.length * (font_size / spider_font_scaling);
    var label_x2 = label_x1 + text_length;
    var label_y2 = label_y1 - (font_size * spider_font_scaling);
    var label_index = closestPointToCenter(label_x1, label_x2, label_y1, label_y2);
    var new_coords = adjustCoordinates(label_x1, label_y1, font_size, text_length, label_index);
    return {
        "name": f,
        "angle": angle,
        "line_coord": angleToCoordinate(angle, 5),
        "label_coord": new_coords,
    };
});


// draw axis labels
spiderSVG
    .append("g")
    .attr("class", "axislabels")
    .selectAll(".axislabel")
    .data(featureData)
    .join(
        enter => {
                
            enter.append("line")
                .attr("x1", canWidth / 2)
                .attr("y1", canHeight / 2)
                .attr("x2", d => d.line_coord.x)
                .attr("y2", d => d.line_coord.y)
                .attr("stroke","black");

            var padding = 10;

            var label = enter.append("g")
                .attr("class", "axislabel")
                .on("mouseover", function(event, d){
                    tooltip.style("opacity", .9);
                    tooltip.text(feature_description[d.name]);
                    tooltip.style("width", "300px");
                })
                .on("mousemove", function(event, d) {

                    var tooltip_width = tooltip.node().getBoundingClientRect().width;

                    var tooltip_x = event.pageX + 310 > window.innerWidth ? event.pageX - tooltip_width - 10 : event.pageX + 10;

                    tooltip.style("left", (tooltip_x) + "px")
                           .style("top",  (event.pageY) + "px");
                })
                .on("mouseout", function(event, d){
                    tooltip.style("opacity", 0);
                });

            label.append("rect")
                .attr("x", d => d.label_coord.x - (padding * 2))
                .attr("y", d => d.label_coord.y - (font_size * spider_font_scaling) - (padding))
                .attr("width", d => (d.name.length * (font_size / spider_font_scaling)) + (padding * 5))
                .attr("height", font_size * spider_font_scaling + (padding * 2.5))
                .attr("fill", "#E7E7E3")
                .attr("rx", 30)
                .on("mouseover", function(event, d){
                    d3.select(this).attr("opacity", 1);
                })

            label.append("text")
                .attr("x", d => d.label_coord.x)
                .attr("y", d => d.label_coord.y)
                .text(d => d.name)
                .attr("font-size", font_size * spider_font_scaling)
                .attr("fill", "#58595B")
                .attr("font-weight", "bold");

            }

    );


// draw axis label
// spiderSVG
//     .append("g")
//     .attr("class", "axisreacts")
//     .selectAll(".axislabel")
//     .data(featureData)
//     .join(
//         enter => {
//             return enter.append("text")
//                 .attr("x", d => d.label_coord.x)
//                 .attr("y", d => d.label_coord.y)
//                 .text(d => d.name)
//                 .attr("font-size", font_size * spider_font_scaling)
//                 .attr("fill", "#58595B")
//                 .attr("font-weight", "bold") 
//             }
//     );

let line = d3.line()
    .x(d => d.x)
    .y(d => d.y);


function getPathCoordinates(d){
    data_point = d.data;
    let coordinates = [];
    for (var i = 0; i < features.length; i++){
        let ft_name = features[i];
        let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
        coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
    }
    coordinates.push(coordinates[0]);
    return coordinates;
}

// draw a circle for each data point
spiderSVG
    .append("g")
    .attr("class", "spider-points")
    .selectAll("circle")
    .data(spider_data)
    .join(
        enter => enter.append("g")
            .attr("class", "spider-point")
            .selectAll("circle")
            .data(d => {
                var coordinates = getPathCoordinates(d);
                var out_array = [];
                for (var i = 0; i < coordinates.length; i++){
                    out_array.push({
                        "data" : d,
                        "coordinates" : coordinates[i]
                    });
                }
                return out_array;
            })
            .join(
                enter => enter.append("circle")
                    .attr("cx", d => d.coordinates.x)
                    .attr("cy", d => d.coordinates.y)
                    .attr("r", 7)
                    .attr("fill", (d, i) => {
                        return window.colorscale(d.data.group);
                    })
                    .attr("opacity", 0.5)
            )
    );

// draw the path element
spiderSVG
    .append("g")
    .attr("class", "spider-path")
    .selectAll("path")
    .data(spider_data)
    .join(
        enter => enter.append("path")
            .datum(d => getPathCoordinates(d))
            .attr("d", line)
            .attr("stroke-width", 7)
            .attr("my-stroke", (_, i) => {
                var stroke_color = window.colorscale(spider_data[i].group);
                return d3.color(stroke_color).darker(0.9);
            })
            .attr("stroke", (d, i) => {
                var stroke_color = window.colorscale(spider_data[i].group);
                return d3.color(stroke_color).darker(0.9);
            })
            .attr("fill", (d, i) => {
                return window.colorscale(spider_data[i].group);
            })
            .attr("stroke-opacity", 1)
            .attr("opacity", 0.4)
            .attr("group", (d, i) => {
                return spider_data[i].group;
            })
            .attr("cur_name", (d, i) => {
                return spider_data[i].name;
            })
            .on("mouseover", function(event, d){
                // Black
                d3.select(this).attr("stroke", "black");
                // d3.select(this).attr("stroke-opacity", 1);

                var element = d3.select(this).attr("cur_name");


                // Display a tooltip with the current size
                tooltip.style("opacity", .9);
                tooltip.text(element)
                tooltip.style("width", "100px");
            })
            .on("mousemove", function(event, d) {
                tooltip.style("left", (event.pageX) + "px")
                       .style("top",  (event.pageY - 28) + "px");
            })
            .on("mouseout", function(event, d){
                tooltip.style("opacity", 0);
                
                
                var this_color = d3.select(this).attr("my-stroke");
                d3.select(this).attr("stroke", this_color);
            })
    );
let data = [];
let features = ["Integration Level", "Precision", "Cost Effectiveness", "Deployability", "Disposability"];

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

let canWidth = window.screen.width;
let canHeight = window.screen.height * 0.6;

var spiderSVG = d3.select("#spider").append("svg")
    .attr("width", canWidth)
    .attr("height", canHeight);

let radialScale = d3.scaleLinear()
    .domain([0, 5])
    .range([0, 250]);

let ticks = [1,2,3,4,5];

spiderSVG.selectAll("circle")
    .data(ticks)
    .join(
        enter => enter.append("circle")
            .attr("cx", canWidth / 2)
            .attr("cy", canHeight / 2)
            .attr("fill", "none")
            .attr("stroke", "gray")
            .attr("r", d => radialScale(d))
    );

spiderSVG.selectAll(".ticklabel")
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

let featureData = features.map((f, i) => {
    let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
    return {
        "name": f,
        "angle": angle,
        "line_coord": angleToCoordinate(angle, 5),
        "label_coord": angleToCoordinate(angle, 5.5)
    };
});

// draw axis line
spiderSVG.selectAll("line")
    .data(featureData)
    .join(
        enter => enter.append("line")
            .attr("x1", canWidth / 2)
            .attr("y1", canHeight / 2)
            .attr("x2", d => d.line_coord.x)
            .attr("y2", d => d.line_coord.y)
            .attr("stroke","black")
    );

// draw axis label
spiderSVG.selectAll(".axislabel")
    .data(featureData)
    .join(
        enter => enter.append("text")
            .attr("x", d => d.label_coord.x)
            .attr("y", d => d.label_coord.y)
            .text(d => d.name)
    );

let line = d3.line()
    .x(d => d.x)
    .y(d => d.y);


function getPathCoordinates(d){
    data_point = d.data;
    console.log("data_point", data_point);
    let coordinates = [];
    for (var i = 0; i < features.length; i++){
        let ft_name = features[i];
        let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
        coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
    }
    coordinates.push(coordinates[0]);
    return coordinates;
}

// draw the path element
spiderSVG.selectAll("path")
    .data(spider_data)
    .join(
        enter => enter.append("path")
            .datum(d => getPathCoordinates(d))
            .attr("d", line)
            .attr("stroke-width", 3)
            .attr("stroke", (_, i) => {
                return null;
            })
            .attr("my-stroke", (_, i) => {
                var this_color = window.colorscale(i);
                this_color = d3.color(this_color).darker(0.5);
                return this_color;
            })
            .attr("fill", (d, i) => {
                console.log("fill", i, d, spider_data[i].group);
                return window.colorscale(spider_data[i].group - 1);
            })
            .attr("stroke-opacity", 0.5)
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
                d3.select(this).attr("stroke-opacity", 1);

                var element = d3.select(this).attr("cur_name");


                // Display a tooltip with the current size
                tooltip.transition().duration(400).style("opacity", .9);
                tooltip.text(element)
            })
            .on("mousemove", function(event, d) {
                tooltip.style("left", (event.pageX) + "px")
                       .style("top",  (event.pageY - 28) + "px");
            })
            .on("mouseout", function(event, d){
                tooltip.transition().duration(400).style("opacity", 0);
                var this_color = d3.select(this).attr("my-stroke");
                d3.select(this).attr("stroke", null);
                d3.select(this).attr("stroke-opacity", 0.5);
            })
    );
let data = [];
let features = ["Cost Efficiency", "Integration Level", "Field Deployability", "Complexity", "Disposability"]

// Name	Integration Level	Field Deployability	Cost	Disposability	Complexity
// Type F	10	10	9	9	9
// Type E	6	8	7	5	7
// Type D	4	7	5	3	5
// Type C	2	1	2	1	3
// Type B	2	1	2	1	3
// Type A	1	1	1	1	2

var spider_data = [
    {
        "name" : "Type F",
        "group" : 6,
        "data" : {
            "Cost Efficiency": 9,
            "Integration Level": 10,
            "Field Deployability": 10,
            "Complexity": 9,
            "Disposability": 9
        }

    },
    {
        "name" : "Type E",
        "group" : 5,
        "data" : {
            "Cost Efficiency": 7,
            "Integration Level": 8,
            "Field Deployability": 8,
            "Complexity": 7,
            "Disposability": 6
        }

    },
    {
        "name" : "Type D",
        "group" : 4,
        "data" : {
            "Cost Efficiency": 5,
            "Integration Level": 7,
            "Field Deployability": 7,
            "Complexity": 5,
            "Disposability": 4
        }

    },
    {
        "name" : "Type C",
        "group" : 3,
        "data" : {
            "Cost Efficiency": 2,
            "Integration Level": 1,
            "Field Deployability": 1,
            "Complexity": 3,
            "Disposability": 2
        }

    },
    {
        "name" : "Type B",
        "group" : 2,
        "data" : {
            "Cost Efficiency": 2,
            "Integration Level": 1,
            "Field Deployability": 1,
            "Complexity": 3,
            "Disposability": 2
        }

    },
    {
        "name" : "Type A",
        "group" : 1,
        "data" : {
            "Cost Efficiency": 1,
            "Integration Level": 1,
            "Field Deployability": 1,
            "Complexity": 2,
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
    .domain([0, 10])
    .range([0, 250]);

let ticks = [2, 4, 6, 8, 10];

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
        "line_coord": angleToCoordinate(angle, 10),
        "label_coord": angleToCoordinate(angle, 10.5)
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
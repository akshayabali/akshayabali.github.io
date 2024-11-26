var totals = [
    {
        title: "BioPOLOS",
        value: 11,
    },
    {
        title: "BioHELOS",
        value: 9,
    },
    {
        title: "BioHOLOS",
        value: 29,
    },
    {
        title: "BioHEMOS",
        value: 11,
    },
    {
        title: "BioMICS",
        value: 16,
    },
    {
        title: "(Sec)BioFICS",
        value: 45,
    }
]

var total_sum = 0;

var total_title = [];

for (var i = 0; i < totals.length; i++) {
    total_title.push(totals[i].title);
    total_sum += totals[i].value;
}


var width = 360;
var height = 360;
var radius = Math.min(width, height) / 2;
var donutWidth = 75; //This is the size of the hole in the middle


var svg = d3.select('#pie-bucket')
     .append('svg')
     .attr('width', width)
     .attr('height', height)
     .append('g')
     .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');
var arc = d3.arc()
     .innerRadius(radius - donutWidth)
     .outerRadius(radius);
var pie = d3.pie()
     .value(function (d) {
          return d.value;
     })
     .sort(null);
var path = svg.selectAll('path')
     .data(pie(totals))
     .enter()
     .append('path')
     .attr('d', arc)
     .attr('fill', function (d, i) {
        //   return colorscale(mapping[d.data.title]);
        // Return color with less opacity
        var r_color = colorscale(mapping[d.data.title]);
        var r_color_rgb = d3.rgb(r_color);
        r_color_rgb.opacity = 0.75;
        return r_color_rgb;
     })
     .attr('transform', 'translate(0, 0)')

svg.append("g")
    // .attr("font-family", "sans-serif")
    // .attr("font-size", 12)
    .attr("text-anchor", "middle")
    .selectAll()
    .data(pie(totals).map(d => {
        var new_d = Object.assign({}, d);
        new_d.data.value = (d.data.value / total_sum * 100).toFixed(2) + "%";
        return new_d;
    }))
    .join("text")
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .call(text => text.append("tspan")
        .attr("y", "-0.4em")
        .attr("font-weight", "bold")
        .text(d => d.data.name))
    .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
        .attr("x", 0)
        .attr("y", "0.7em")
        .attr("fill-opacity", 0.7)
        .text(d => d.data.value.toLocaleString("en-US")));


var legendRectSize = 13;
var legendSpacing = 7;

var legend = svg.selectAll('.legend') //the legend and placement
.data(total_title)
.enter()
.append('g')
.attr('class', 'circle-legend')
.attr('transform', function (d, i) {
    var height = legendRectSize + legendSpacing;
    var offset = height * total_title.length / 2;
    var horz = -2 * legendRectSize - 16;
    var vert = i * height - offset;
    return 'translate(' + horz + ',' + vert + ')';
});

legend.append('circle') //keys
.style('fill', function (d) {
    return colorscale(mapping[d]);
})
.style('stroke', function (d) {
    return colorscale(mapping[d]);
})
.attr('cx', 0)
.attr('cy', 0)
.attr('r', '.5rem');
legend.append('text') //labels
.attr('x', legendRectSize + legendSpacing)
.attr('y', legendRectSize - legendSpacing)
.text(function (d) {
    return d;
});

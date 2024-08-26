// Specify the color scale.


window.selected_doi = ""
window.selected_node = null

graph_data = {
    "nodes": [
        {
            "id": "10.1038/s41586-022-05356-y",
            "group": 0
        },
        {
            "id": "10.1038/nmeth.2926",
            "group": 1
        },
        {
            "id": "10.1126/science.aac7341",
            "group": 1
        },
        {
            "id": "10.1038/s41564-020-0757-2",
            "group": 1
        },
        {
            "id": "10.1038/s41467-020-20284-z",
            "group": 2
        },
        {
            "id": "10.1016/j.cell.2014.10.004",
            "group": 3
        },
        {
            "id": "10.1038/s41587-020-0571-7",
            "group": 0
        },
        {
            "id": "10.1186/s13036-016-0024-5",
            "group": 2
        },
        {
            "id": "10.1038/s41467-018-05864-4",
            "group": 1
        },
        {
            "id": "10.1021/acssynbio.5b00141",
            "group": 2
        },
        {
            "id": "10.1021/acsomega.0c03906",
            "group": 2
        },
        {
            "id": "10.1038/s41467-022-31306-3",
            "group": 2
        },
        {
            "id": "10.1126/science.aas9315",
            "group": 0
        },
        {
            "id": "10.1021/acssynbio.2c00307",
            "group": 1
        },
        {
            "id": "10.1109/jssc.2023.3308853",
            "group": 1
        },
        {
            "id": "10.1109/tbcas.2023.3244570",
            "group": 0
        },
        {
            "id": "10.1109/tbcas.2022.3211420",
            "group": 4
        },
        {
            "id": "10.1038/s41551-016-0022",
            "group": 0
        },
        {
            "id": "10.1126/sciadv.1603221",
            "group": 0
        },
        {
            "id": "10.1109/cicc.2019.8780363",
            "group": 4
        },
        {
            "id": "10.1038/s41586-020-2666-1",
            "group": 0
        },
        {
            "id": "10.1016/j.sna.2006.05.022",
            "group": 3
        },
        {
            "id": "10.1109/memsys.2003.1189752",
            "group": 2
        },
        {
            "id": "10.1016/j.bios.2018.10.014",
            "group": 5
        },
        {
            "id": "10.1109/tbcas.2021.3068710",
            "group": 1
        },
        {
            "id": "10.1038/s41467-019-13093-6",
            "group": 1
        },
        {
            "id": "10.1038/s42003-020-01489-w",
            "group": 2
        },
        {
            "id": "10.1038/ncomms14030",
            "group": 1
        },
        {
            "id": "10.1021/acssynbio.8b00025",
            "group": 2
        },
        {
            "id": "10.1109/tbcas.2010.2081669",
            "group": 1
        },
        {
            "id": "10.1109/jssc.2017.2686580",
            "group": 1
        },
        {
            "id": "10.1039/c2lc40392g",
            "group": 1
        },
        {
            "id": "10.1109/jssc.2009.2035196",
            "group": 1
        },
        {
            "id": "10.1109/isscc.2014.6757497",
            "group": 0
        },
        {
            "id": "10.1109/transducers.2015.7181302",
            "group": 0
        },
        {
            "id": "10.1109/transducers.2015.7181302",
            "group": 0
        },
        {
            "id": "10.1109/jssc.2012.2214182",
            "group": 6
        },
        {
            "id": "10.1109/tbcas.2011.2114660",
            "group": 0
        },
        {
            "id": "10.1039/b700373k",
            "group": 3
        },
        {
            "id": "10.1038/s41378-022-00357-3",
            "group": 7
        },
        {
            "id": "10.1039/c3lc50437a",
            "group": 3
        },
        {
            "id": "10.1021/acssynbio.6b00011",
            "group": 7
        },
        {
            "id": "10.1039/c4lc00869c",
            "group": 3
        },
        {
            "id": "10.1109/tbcas.2016.2522402",
            "group": 6
        },
        {
            "id": "10.1021/ac5021694",
            "group": 2
        },
        {
            "id": "10.1016/j.microc.2023.109476",
            "group": 2
        },
        {
            "id": "10.1039/d3lc00107e",
            "group": 2
        },
        {
            "id": "10.1039/c8lc00299a",
            "group": 4
        },
        {
            "id": "10.3390/mi8030087",
            "group": 4
        },
        {
            "id": "10.1039/c3lc40961a",
            "group": 2
        },
        {
            "id": "10.1021/ac902683t",
            "group": 2
        },
        {
            "id": "10.1039/c1lc20561g",
            "group": 2
        },
        {
            "id": "10.1073/pnas.1106752109",
            "group": 2
        },
        {
            "id": "10.1021/ac500862v",
            "group": 1
        },
        {
            "id": "10.1109/ojnano.2020.3035349",
            "group": 1
        },
        {
            "id": "10.1109/sopo.2010.5504420",
            "group": 2
        },
        {
            "id": "10.1109/jssc.2006.874331",
            "group": 4
        },
        {
            "id": "10.1109/tbcas.2021.3136165",
            "group": 4
        },
        {
            "id": "10.1038/s41598-020-75489-5",
            "group": 3
        },
        {
            "id": "10.1109/jproc.2010.2066532",
            "group": 1
        },
        {
            "id": "10.1109/jssc.2008.925407",
            "group": 1
        },
        {
            "id": "10.1038/nm.1711",
            "group": 3
        },
        {
            "id": "10.1371/journal.pone.0184994",
            "group": 1
        },
        {
            "id": "10.1109/jssc.2017.2754363",
            "group": 1
        },
        {
            "id": "10.1039/c8lc00299a",
            "group": 7
        },
        {
            "id": "10.1038/s41467-024-45789-9",
            "group": 0
        },
        {
            "id": "10.1038/s41598-023-37506-1",
            "group": 3
        },
        {
            "id": "10.1109/asap.2007.4429957",
            "group": 4
        },
        {
            "id": "10.1109/isscc49657.2024.10454430",
            "group": 4
        },
        {
            "id": "10.1007/s11265-014-0939-3",
            "group": 4
        },
        {
            "id": "10.1109/mm.2020.3005615",
            "group": 4
        },
        {
            "id": "10.1109/jssc.2003.819171",
            "group": 7
        },
        {
            "id": "10.1109/5.993402",
            "group": 1
        },
        {
            "id": "10.1039/d0lc00556h",
            "group": 2
        },
        {
            "id": "10.1039/c2lc21284f",
            "group": 2
        },
        {
            "id": "10.1038/s41467-020-17008-8",
            "group": 0
        },
        {
            "id": "10.1016/j.snb.2021.129648",
            "group": 2
        },
        {
            "id": "10.1126/sciadv.aau7378",
            "group": 5
        },
        {
            "id": "10.1038/s41598-023-51014-2",
            "group": 2
        }
    ],
    "links": [
        {
            "source": "10.1038/s41586-022-05356-y",
            "target": "10.1038/s41587-020-0571-7",
            "value": 1
        },
        {
            "source": "10.1038/s41586-022-05356-y",
            "target": "10.1371/journal.pone.0184994",
            "value": 1
        },
        {
            "source": "10.1038/s41586-022-05356-y",
            "target": "10.1016/j.snb.2021.129648",
            "value": 1
        },
        {
            "source": "10.1038/s41564-020-0757-2",
            "target": "10.1126/science.aac7341",
            "value": 1
        },
        {
            "source": "10.1038/s41564-020-0757-2",
            "target": "10.1038/nmeth.2926",
            "value": 1
        },
        {
            "source": "10.1038/s41467-020-20284-z",
            "target": "10.1021/acssynbio.8b00025",
            "value": 1
        },
        {
            "source": "10.1038/s41587-020-0571-7",
            "target": "10.1016/j.cell.2014.10.004",
            "value": 1
        },
        {
            "source": "10.1038/s41467-018-05864-4",
            "target": "10.1016/j.cell.2014.10.004",
            "value": 1
        },
        {
            "source": "10.1021/acsomega.0c03906",
            "target": "10.1021/acssynbio.5b00141",
            "value": 1
        },
        {
            "source": "10.1126/science.aas9315",
            "target": "10.1038/nmeth.2926",
            "value": 1
        },
        {
            "source": "10.1126/science.aas9315",
            "target": "10.1109/jssc.2012.2214182",
            "value": 1
        },
        {
            "source": "10.1109/jssc.2023.3308853",
            "target": "10.1109/tbcas.2010.2081669",
            "value": 1
        },
        {
            "source": "10.1109/jssc.2023.3308853",
            "target": "10.1109/jssc.2008.925407",
            "value": 1
        },
        {
            "source": "10.1109/jssc.2023.3308853",
            "target": "10.1109/jssc.2017.2754363",
            "value": 1
        },
        {
            "source": "10.1109/tbcas.2023.3244570",
            "target": "10.1038/s41551-016-0022",
            "value": 1
        },
        {
            "source": "10.1021/acssynbio.8b00025",
            "target": "10.1186/s13036-016-0024-5",
            "value": 1
        },
        {
            "source": "10.1021/acssynbio.8b00025",
            "target": "10.1021/acssynbio.6b00011",
            "value": 1
        },
        {
            "source": "10.1109/tbcas.2010.2081669",
            "target": "10.1109/jssc.2008.925407",
            "value": 1
        },
        {
            "source": "10.1109/jssc.2017.2686580",
            "target": "10.1109/tbcas.2010.2081669",
            "value": 1
        },
        {
            "source": "10.1109/jssc.2017.2686580",
            "target": "10.1109/jssc.2009.2035196",
            "value": 1
        },
        {
            "source": "10.1039/c2lc40392g",
            "target": "10.1109/jssc.2008.925407",
            "value": 1
        },
        {
            "source": "10.1039/c2lc40392g",
            "target": "10.1038/nm.1711",
            "value": 1
        },
        {
            "source": "10.1109/transducers.2015.7181302",
            "target": "10.1109/isscc.2014.6757497",
            "value": 1
        },
        {
            "source": "10.1109/transducers.2015.7181302",
            "target": "10.1039/b700373k",
            "value": 1
        },
        {
            "source": "10.1109/transducers.2015.7181302",
            "target": "10.1109/isscc.2014.6757497",
            "value": 1
        },
        {
            "source": "10.1109/transducers.2015.7181302",
            "target": "10.1039/b700373k",
            "value": 1
        },
        {
            "source": "10.1109/jssc.2012.2214182",
            "target": "10.1109/jssc.2003.819171",
            "value": 1
        },
        {
            "source": "10.1039/b700373k",
            "target": "10.1109/jssc.2006.874331",
            "value": 1
        },
        {
            "source": "10.1039/b700373k",
            "target": "10.1109/jssc.2003.819171",
            "value": 1
        },
        {
            "source": "10.1038/s41378-022-00357-3",
            "target": "10.1021/acssynbio.6b00011",
            "value": 1
        },
        {
            "source": "10.1039/c3lc50437a",
            "target": "10.1109/tbcas.2010.2081669",
            "value": 1
        },
        {
            "source": "10.1039/c3lc50437a",
            "target": "10.1109/jssc.2003.819171",
            "value": 1
        },
        {
            "source": "10.1039/c3lc50437a",
            "target": "10.1109/jssc.2006.874331",
            "value": 1
        },
        {
            "source": "10.1039/c4lc00869c",
            "target": "10.1109/jssc.2003.819171",
            "value": 1
        },
        {
            "source": "10.1039/c4lc00869c",
            "target": "10.1109/jssc.2008.925407",
            "value": 1
        },
        {
            "source": "10.1039/c4lc00869c",
            "target": "10.1039/c3lc50437a",
            "value": 1
        },
        {
            "source": "10.1109/tbcas.2016.2522402",
            "target": "10.1016/j.sna.2006.05.022",
            "value": 1
        },
        {
            "source": "10.1109/tbcas.2016.2522402",
            "target": "10.1039/b700373k",
            "value": 1
        },
        {
            "source": "10.1109/tbcas.2016.2522402",
            "target": "10.1039/c3lc50437a",
            "value": 1
        },
        {
            "source": "10.1016/j.microc.2023.109476",
            "target": "10.1021/ac5021694",
            "value": 1
        },
        {
            "source": "10.1039/d3lc00107e",
            "target": "10.1021/ac5021694",
            "value": 1
        },
        {
            "source": "10.1039/c8lc00299a",
            "target": "10.1109/jssc.2006.874331",
            "value": 1
        },
        {
            "source": "10.1039/c8lc00299a",
            "target": "10.1039/c3lc50437a",
            "value": 1
        },
        {
            "source": "10.1039/c8lc00299a",
            "target": "10.1109/tbcas.2016.2522402",
            "value": 1
        },
        {
            "source": "10.1039/c8lc00299a",
            "target": "10.1039/c4lc00869c",
            "value": 1
        },
        {
            "source": "10.1039/c1lc20561g",
            "target": "10.1021/ac902683t",
            "value": 1
        },
        {
            "source": "10.1073/pnas.1106752109",
            "target": "10.1021/ac902683t",
            "value": 1
        },
        {
            "source": "10.1021/ac500862v",
            "target": "10.1109/jssc.2008.925407",
            "value": 1
        },
        {
            "source": "10.1109/jssc.2006.874331",
            "target": "10.1109/jssc.2003.819171",
            "value": 1
        },
        {
            "source": "10.1109/tbcas.2021.3136165",
            "target": "10.1039/c8lc00299a",
            "value": 1
        },
        {
            "source": "10.1109/tbcas.2021.3136165",
            "target": "10.1109/tbcas.2010.2081669",
            "value": 1
        },
        {
            "source": "10.1109/tbcas.2021.3136165",
            "target": "10.1039/c8lc00299a",
            "value": 1
        },
        {
            "source": "10.1109/tbcas.2021.3136165",
            "target": "10.1109/cicc.2019.8780363",
            "value": 1
        },
        {
            "source": "10.1109/tbcas.2021.3136165",
            "target": "10.1109/jssc.2017.2754363",
            "value": 1
        },
        {
            "source": "10.1109/tbcas.2021.3136165",
            "target": "10.1109/jssc.2003.819171",
            "value": 1
        },
        {
            "source": "10.1109/jproc.2010.2066532",
            "target": "10.1109/jssc.2009.2035196",
            "value": 1
        },
        {
            "source": "10.1038/nm.1711",
            "target": "10.1109/jssc.2006.874331",
            "value": 1
        },
        {
            "source": "10.1109/jssc.2017.2754363",
            "target": "10.1109/tbcas.2010.2081669",
            "value": 1
        },
        {
            "source": "10.1109/jssc.2017.2754363",
            "target": "10.1109/jssc.2008.925407",
            "value": 1
        },
        {
            "source": "10.1039/c8lc00299a",
            "target": "10.1109/jssc.2006.874331",
            "value": 1
        },
        {
            "source": "10.1039/c8lc00299a",
            "target": "10.1039/c3lc50437a",
            "value": 1
        },
        {
            "source": "10.1039/c8lc00299a",
            "target": "10.1109/tbcas.2016.2522402",
            "value": 1
        },
        {
            "source": "10.1039/c8lc00299a",
            "target": "10.1039/c4lc00869c",
            "value": 1
        },
        {
            "source": "10.1038/s41598-023-51014-2",
            "target": "10.1038/s41467-020-20284-z",
            "value": 1
        }
    ],
    "labels": [
        {
            "A": 1,
            "group": "BioPOLOS",
            "id": 1
        },
        {
            "B": 2,
            "group": "BioHELOS",
            "id": 2
        },
        {
            "C": 3,
            "group": "BioHOLOS",
            "id": 3
        },
        {
            "D": 4,
            "group": "BioMICS",
            "id": 4
        },
        {
            "E": 5,
            "group": "BioHEMOS",
            "id": 5
        },
        {
            "F": 6,
            "group": "(Sec)BioFICS",
            "id": 6
        },
        {
            "C+D": 7,
            // "group": "C+D",
            "group": "BioHOLOS + BioMICS",
            "id": 7,
        },
        {
            "C+B": 8,
            // "group": "C+B",
            "group": "BioHOLOS + BioHELOS",
            "id": 8
        }
    ]
}

    // Specify the dimensions of the chart.

    window.graphWidth = 750;
    var graphHeight = 600;
    // var width = window.screen.width;
    // var height = window.screen.height * 0.5;

    // The force simulation mutates links and nodes, so create a copy
    // so that re-evaluating this cell produces the same result.
    var links = graph_data.links.map(d => ({...d}));
    var graph_nodes = graph_data.nodes.map(d => ({...d}));
    window.graph_labels = graph_data.labels.map(d => ({...d}));

    var label_height = font_size * 2;
    var circle_radius = font_size / 2;

    var node_list = d3.selectAll(".node rect");

    // console.log("data", d3.selectAll(".node rect"))
    // console.log("Node list", node_list)

    // d3.selectAll(".node rect")
    // .attr("fill", function (d) {
    //     return colorscale(d.group) + "b9";
    // })

    var label_distance = circle_radius * 25;
    var left_padding = 0    ;

    var label_box = d3.select("#graph_labels")
        .append("svg")
        .attr("width", window.innerWidth * 0.9)
        .attr("height", window.innerHeight / 20)
        .attr("viewBox", [0, 0, 1300, 65])
        .attr("style", "max-width: 100%; height: auto; display:block; margin:auto;");
    
    var label = label_box.append("g")
        .selectAll()
        .data(graph_labels)
        .join("g")

    label.append("circle")
        .attr("r", circle_radius)
        .attr("cx", d => left_padding + (d.id - 2) * label_distance)
        .attr("cy", d => circle_radius)
        .attr("fill", d => colorscale(d.id))
        .text(d => d.group);


    window.label_max = 0;
    label.append("text")
        .attr("x", d => {
            var x = left_padding + (d.id - 2) * label_distance;
            if (x > label_max) {
                label_max = x;
            }
            // label_box.attr("width", label_max);
            return left_padding + 10 + (d.id - 2) * label_distance
        })
        .attr("y", d => circle_radius)
        .attr("dy", ".35em")
        .attr("text-anchor", "left")
        .attr("font-size", font_size)
        .text(d => ": " + d.group);

    var link_distance = font_size * 2;
    var link_strength = 1;
    var charge_strength = -font_size;
    var charge_distance = font_size * 15;

    // Create a simulation with several forces.
    var simulation = d3.forceSimulation(graph_nodes)
        .alphaTarget(0.3) // stay hot
        .velocityDecay(0.1) // low friction
        .force("x", d3.forceX().strength(0.01))
        .force("y", d3.forceY().strength(0.01))
        .force("link", d3.forceLink(links).id(d => d.id).distance(link_distance).strength(link_strength))
        .force("charge", d3.forceManyBody().strength(charge_strength).distanceMax(charge_distance))
        .force("collide", d3.forceCollide().radius(d => d.r + 1).iterations(3))
        .force("center", d3.forceCenter(graphWidth / 2, graphHeight / 2).strength(1))
        .on("tick", ticked);

    // Create the SVG container.
    var svg = 
        d3.select("#graph").append("svg")
        .attr("width", window.innerWidth/3  )
        .attr("height", window.innerHeight * 0.4)
        .attr("viewBox", [0, 0, graphWidth, graphHeight])
        .attr("style", "max-width: 100%;");

    // Add a line for each link, and a circle for each node.
    var link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll()
        .data(links)
        .join("line")
        .attr("stroke-width", d => Math.sqrt(d.value));

    var node = svg.append("g")
        .selectAll()
        .data(graph_nodes)
        .join("circle")
        .attr("r", circle_radius)
        .attr("stroke-width", 2)
        .attr("stroke", function(d) {
            var ret = "#fff";
            if (d.id == selected_doi) {
                ret = "red";
            }
            return ret;
        })
        // Set if of the node as the node-DOI
        .attr("id", d => "node-" + d.id)
        .attr("fill", d => {
            return colorscale(d.group);
        });

    // Add onclick event for each node
    node.on("click", function(event, d) {
        console.log(d.id);
        var doi = d.id.replaceAll("/", "-")
        doi = doi.replaceAll(".", "-")
        window.selected_doi = doi;
        // d3.select("#selected_doi").text(selected_doi);
        d3.select("#graph").selectAll("circle").attr("fill", d => colorscale(d.group));
        // d3.select(this).attr("fill", "red");
    });

    node.append("title")
        .text(d => d.id);

    // Add a drag behavior.
    node.call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    // Set the position attributes of links and nodes each time the simulation ticks.
    function ticked() {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
    }

    // Reheat the simulation when drag starts, and fix the subject position.
    function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
        if (selected_node != null) {
            d3.select(selected_node).attr("fill", d => colorscale(d.group));
            d3.select(selected_node).attr("stroke", "#fff");   
        }
        if (selected_doi != null) {
            console.log("printing selected_doi", selected_doi);
            var doi = selected_doi.replaceAll("/", "-")
            doi = doi.replaceAll(".", "-")
            var tr_id = "#td-" + doi;
            d3.select(tr_id).attr("style", "background-color: white");
            //TODO:Fix this
        }

        selected_doi = event.subject.id;
        console.log("printing selected_doi_2", selected_doi);
        // change the color of only the selected node
        d3.select(this).attr("fill", "red");
        d3.select(this).attr("stroke", "red");
        selected_node = this;
        var doi = selected_doi.replaceAll("/", "-")
        var doi2 = doi.replaceAll(".", "-")
        selected_doi = doi2; 
        var tr_id = "td-" + doi2;
        d3.select(tr_id).attr("style", "background-color: powderblue");
        var table = document.getElementById("table");
        var row = document.getElementById(tr_id);
        d3.select(row).attr("style", "background-color: powderblue");
        table.scrollTop = 0;
        table.scrollTop = row.offsetTop - 100;
    }

    // Update the subject (dragged node) position during drag.
    function dragged(event) {
        // Check if the dragged is in bounds of the graph
        set_x = event.x;
        set_y = event.y;
        if (set_x < 0) {
            set_x = 0;
        } else if (set_x > graphWidth) {
            set_x = graphWidth;
        }
        if (set_y < 0) {
            set_y = 0;
        } else if (set_y > graphHeight) {
            set_y = graphHeight;
        }
        event.subject.fx = set_x;
        event.subject.fy = set_y;
    }

    // Restore the target alpha so the simulation cools after dragging ends.
    // Unfix the subject position now that it’s no longer being dragged.
    function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
        d3.select(this).attr("fill", d => colorscale(d.group));
    }


const data = {
    name: "Computer and Architecture",
    children: [
      {
        name: "Computer Science",
        children: [
          { name: "Algorithms" },
          { name: "Artificial Intelligence" },
          { name: "Data Structures" },
        ],
      },
      {
        name: "Architecture",
        children: [
          { name: "Building Design" },
          { name: "Structural Engineering" },
          { name: "Sustainable Architecture" },
        ],
      },
    ],
  };
  
  // Set up the chart dimensions
  const width = 800;
  const height = 800;
  
  // Create an SVG element
  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  
  // Create a group for the main content
  const g = svg.append("g");
  
  // Create a hierarchical layout
  const hierarchy = d3.hierarchy(data);
  
  // Create a cluster layout
  const cluster = d3.cluster().size([2 * Math.PI, (height - 100) / 2]);
  
  // Compute the node positions
  cluster(hierarchy);
  
  // Create the links
  const links = cluster.links();
  
  // Create the hierarchical edge bundling layout
  const bundle = d3.bundle();
  
  // Compute the bundled links
  const bundledLinks = bundle(links);
  
  // Draw the links
  g.selectAll(".link")
    .data(bundledLinks)
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("d", d3.line().curve(d3.curveBundle.beta(0.85)));
  
  // Draw the nodes
  g.selectAll(".node")
    .data(hierarchy.descendants())
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("transform", (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`)
    .attr("r", 4);
  
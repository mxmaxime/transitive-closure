console.log('script')
console.log({graph})

const cy = cytoscape({
  container: document.querySelector('#cy'),
  elements: graph.original_lib,
  style: [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        'background-color': '#666',
        'label': 'data(id)'
      }
    },

    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        // https://stackoverflow.com/a/37843786
        // to be able to 
        'curve-style': 'bezier',
        'target-arrow-shape': 'chevron'
      }
    }
  ],

  layout: {
    // https://js.cytoscape.org/#layouts/circle
    name: 'circle',
    avoidOverlap: true,
    avoidOverlapPadding: 10,
    animate: true,
    animationDuration: 500
  }
});

window.setTimeout(() => {
  cy.add({
    edges: [
      {
        data: { id: 'CD', source: 'C', target: 'D' }
      }
    ]
  })
}, 1000)


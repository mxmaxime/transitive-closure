console.log('script')
console.log({graph})

const generalConfig = {
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
    },

    {
      selector : '.highlighted',
      style : {
        'background-color': '#61bffc',
        'line-color': '#61bffc',
        'target-arrow-color': '#61bffc',
        'transition-property': 'background-color, line-color, target-arrow-color',
        'transition-duration': '0.5s'
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
}

const cy = cytoscape({
  container: document.querySelector('#cy'),
  ...generalConfig
});

window.setTimeout(() => {
  setStep(JSON.parse(graph.steps_matrix), 3, cy)
//   cy.add({
//     edges: [
//       {
//         data: { id: '3-2', source: '3', target: '4' }
//       }
//     ]
//   })
}, 1000)


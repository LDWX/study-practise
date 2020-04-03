const tree = {
  value: "A",
  children: [
    {
      value: "B",
      children: [
        {
          value: "C"
        }
      ]
    },
    {
      value: "D",
      children: []
    }
  ]
}

let depth = 0
function findDepth(tree) {
  let cur = ''
  let stack = []
  let depth = 0
  if (!tree.value) return  0
  depth++;
  while(tree.children.length > 0) {
    
  }




  if (!tree.children.length) return 1

  for (let i = 0; i < tree.length; i++) {
    
  }

}


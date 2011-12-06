function getValidNeighbors(x, y) {
  var neighbors = new Array();
  if(game.viewport.getTile(x,y-1).clip[0]) {
    neighbors.push({x: x, y: y-1, direction: 'north'});
  }
  if(game.viewport.getTile(x,y+1).clip[1]) {
    neighbors.push({x: x, y: y+1, direction: 'south'});
  }
  if(game.viewport.getTile(x+1,y).clip[2]) {
    neighbors.push({x: x+1, y: y, direction: 'east'});
  }
  if(game.viewport.getTile(x-1,y).clip[3]) {
    neighbors.push({x: x-1, y: y, direction: 'west'});
  }
  return neighbors;
}

function findPath(x, y, x2, y2) {
  var openList = new Array();
  var closedList = new Array();
  openList[x+','+y] = { x: x, y: y, h: 0, g: 0, f: 0, parent: undefined };
  openListSize = 1;

  while(openListSize > 0) {
    // Find the node with the lowest F score
    for (lowestF in openList) { break; } // A hack to start with the "first" entry
    for(i in openList) {
      if(openList[i].f < openList[lowestF].f) {
	lowestF = i;
      }
    }
    var currentNode = openList[lowestF];

    // Have we made it?!
    if(currentNode.x == x2 && currentNode.y == y2) {
      var path = new Array();
      while(currentNode.parent) {
	path.push(currentNode);
	currentNode = currentNode.parent;
      }
      return path;
    }

    // Nope. Keep going.
    delete openList[lowestF];
    openListSize--;
    closedList[lowestF] = currentNode;

    var neighbors = getValidNeighbors(currentNode.x, currentNode.y);
    for(i in neighbors) {
      var neighbor = neighbors[i];
      var neighborString = neighbor.x+','+neighbor.y;
      // Is this node in the ignore list?
      if(closedList[neighborString]) { continue; }

      neighbor.g = currentNode.g+1;
      // Is this the first time we've been here or did we get a lower g than last time?
      if(!openList[neighborString] || neighbor.g < openList[neighborString].g) {
	neighbor.parent = currentNode;
	neighbor.h = (Math.abs(x2 - neighbor.x) + Math.abs(y2 - neighbor.y));
	neighbor.f = neighbor.g + neighbor.h;
	openList[neighborString] = neighbor;
	openListSize++;
      }
    }
  }
  return [];
}
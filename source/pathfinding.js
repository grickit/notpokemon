Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function getFirst(array) {
  for (var key in array) return key;
}

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

function heuristicDistance(x, y, x2, y2) {
  var distancex = Math.abs(x2 - x);
  var distancey = Math.abs(y2 - y);
  return (distancex + distancey);
}

function findPath(x, y, x2, y2) {
  //console.log('Finding path from '+x+','+y+' to '+x2+','+y2);
  var openList = new Array();
  var closedList = new Array();
  openList[x+','+y] = { x: x, y: y, h: 0, g: 0, f: 0, parent: undefined };

  while(Object.size(openList) > 0) {

    // Find the node with the lowest F score
    var lowestF = getFirst(openList);
    for(i in openList) {
      //console.log('Currently checking fScore of '+i);
      if(openList[i].f < openList[lowestF].f) {
	lowestF = i;
      }
    }
    var currentNode = openList[lowestF];
    //console.log('Current node is at '+x+','+y);

    // Have we made it?!
    if(currentNode.x == x2 && currentNode.y == y2) {
      var current = currentNode;
      var path = new Array();
      while(current.parent) {
	path.push(current);
	current = current.parent;
      }
      return path.reverse();
    }

    // Nope. Keep going.
    delete openList[lowestF];
    closedList[lowestF] = currentNode;
    var neighbors = getValidNeighbors(currentNode.x, currentNode.y);

    for(i in neighbors) {
      var neighbor = neighbors[i];
      //console.log('Found neighbor '+neighbor.x+','+neighbor.y);
      // Is this node in the ignore list?
      if(closedList[neighbor.x+','+neighbor.y]) {
	//console.log('This neighbor is on our ignore list.');
	continue;
      }

      var gScore = currentNode.g + 1;
      var gScoreIsBest = false;

      // Is this the first time we've been here?
      if(!openList[neighbor.x+','+neighbor.y]) {
	//console.log('Whoa. Never been here before.');
	gScoreIsBest = true;
      }
      else if ( gScore < openList[neighbor.x+','+neighbor.y]) {
	//console.log('Found a better path than last time.');
	gScoreIsBest = true;
      }

      if(gScoreIsBest) {
	//console.log('This is the best path to '+neighbor.x+','+neighbor.y+' so far. Saving.');
	neighbor.parent = currentNode;
	neighbor.h = heuristicDistance(neighbor.x, neighbor.y, x2, y2);
	neighbor.g = gScore;
	neighbor.f = neighbor.g + neighbor.h;
	openList[neighbor.x+','+neighbor.y] = {x: neighbor.x, y: neighbor.y, h: neighbor.h, g: neighbor.g, f: neighbor.f, direction: neighbor.direction, parent: currentNode};
      }
    }
  }
  return [];
}
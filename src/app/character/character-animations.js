window.characterAnimations = (() => {
  const size = [36, 59];
  const gList = {
    stay: [
      [[[0,9,36,0,21,26],"#000000","black",1],[[21,27,34,39,34,59],"#000000","black",1],[[21,27,21,45,8,58],"#000000","black",1],[[22,7,29,6,26,11],"#000000","red",1]],
      [[[1,12,37,3,22,29],[22,29,35,41,34,59],[22,29,21,47,8,58],[23,10,30,9,27,14]]],
      400
    ],
    walk: [
      [[[0,9,36,0,21,26],"#000000","black",1],[[21,27,34,39,34,59],"#000000","black",1],[[21,27,21,45,8,58],"#000000","black",1],[[22,7,29,6,26,11],"#000000","red",1]],
      [[[3,8,41,5,21,28],[21,27,24,44,13,60],[22,26,28,44,21,58],[24,9,31,10,27,14]],[[0,9,36,0,21,26],[21,27,17,44,1,55],[22,26,34,40,32,58],[22,7,29,6,26,11]],[[2,8,39,3,21,28],[21,26,30,41,25,60],[21,27,25,45,14,60],[23,8,31,9,26,13]]],
      120
    ],
    jump: [
      [[[0,9,36,0,21,26],"#000000","black",1],[[21,27,34,39,34,59],"#000000","black",1],[[21,27,21,45,8,58],"#000000","black",1],[[22,7,29,6,26,11],"#000000","red",1]],
      [[[1,5,36,-7,24,20],[24,20,26,39,17,59],[24,21,20,41,8,58],[24,1,30,-2,28,4]],[[2,4,39,-5,23,21],[23,21,27,36,17,52],[23,21,23,40,11,53],[25,2,32,0,29,6]]],
      150,
      true
    ],
    sit: [
      [[[0,9,36,0,21,26],"#000000","black",1],[[21,27,34,39,34,59],"#000000","black",1],[[21,27,21,45,8,58],"#000000","black",1],[[22,7,29,6,26,11],"#000000","red",1]],
      [[[1,21,38,22,17,44],[17,43,38,46,26,58],[16,42,22,56,8,58],[21,25,28,26,24,30]],[0,0,0,0]],
      120,
      true
    ],
    wall: [
      [[[0,2,34,0,20,21],"#000000","black",1],[[20,20,40,30,34,14],"#000000","black",1],[[19,20,32,33,38,53],"#000000","black",1],[[12,9,7,4,14,4],"#000000","red",1]],
      []
    ],
    fall: [
      [[[3,0,39,10,13,26],"#000000","black",1],[[13,25,26,38,26,57],"#000000","black",1],[[13,25,13,44,0,57],"#000000","black",1],[[23,8,30,10,25,13],"#000000","red",1]],
      [[0,[13,25,29,33,28,52],[13,25,8,43,-7,51],0]],
      200
    ],
    die: [
      [[[0,9,36,0,21,26],"#000000","black",1],[[21,27,34,39,34,59],"#000000","black",1],[[21,27,21,45,8,58],"#000000","black",1],[[22,7,29,6,26,11],"#000000","red",1]],
      [[[3,56,27,27,31,58],[66,46,57,60,34,59],[-29,57,-8,49,7,59],[21,40,25,34,26,41]]],
      500,
      true
    ]
  };

  let current = new Anim(...gList.stay, 300);
  let currentName = 'stay';
  let mirrored = false;
  let nextAnim;
  let isBlocked = false;

  function next() {
    if (!nextAnim) return;
    current = new Anim(...gList[nextAnim]);
    currentName = nextAnim;
    nextAnim = null;
    isBlocked = false;
  }

  return {
    mirror: (value) => {
      mirrored = value;
    },
    to: (name, blocked, force) => {
      if (currentName === name) return;
      if (isBlocked && !force) {
        nextAnim = name;
      } else {
        current = new Anim(...gList[name]);
        currentName = name;
        isBlocked = blocked;
      }
    },
    r: (position) => {
      c.translate(position.x + (size[0] / 2), position.y + (size[1] / 2));
      c.scale( mirrored ? -1 : 1, -1);
      draw.r(current.n(), size);
      if (isBlocked && current.isFinished()) {
        next();
      }
    }
  };
})();

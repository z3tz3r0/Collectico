import Background from "./Background";

const dimensionSpec =
[[{ top: 0, left: 0, width: 2, height: 768, background:'red', trigger:"changeRoomLeft" },
  { top: 0, left: 1015, width: 2, height: 768 , background:'red', trigger:"changeRoomRight"},
  { top: 770, left: 25, width: 974, height: 2 },
  { top: 380, left: 25, width: 300, height: 2 },
  { top: 380, left: 340, width: 350, height: 2,trigger: "openPic"},
  { top: 380, left: 700, width: 320, height: 2},
  { top: 400, left: 700, width: 100, height: 2, trigger:"cat"}],
[{ top: 0, left: 0, width: 2, height: 768, background:'red', trigger:"changeRoomLeft" },
  { top: 0, left: 1015, width: 2, height: 768 , background:'red', trigger:"changeRoomRight"},
  { top: 770, left: 25, width: 974, height: 2 ,background:'green'},
  { top: 380, left: 360, width: 305, height: 2,trigger: "openPic",background:'red', whichPic:1},
  { top: 380, left: 30, width: 305, height: 2,trigger: "openPic",background:'black', whichPic:0},
  { top: 380, left: 690, width: 305, height: 2,trigger: "openPic",background:'yellow', whichPic:2}
  ],
  [{ top: 0, left: 0, width: 2, height: 768, background:'red', trigger:"changeRoomLeft" },
  { top: 0, left: 1015, width: 2, height: 768 , background:'red', trigger:"changeRoomRight"},
  { top: 770, left: 25, width: 974, height: 2 ,background:'green'},
  { top: 380, left: 360, width: 305, height: 2,trigger: "openPic",background:'red', whichPic:1},
  { top: 380, left: 30, width: 305, height: 2,trigger: "openPic",background:'black', whichPic:0},
  { top: 380, left: 690, width: 305, height: 2,trigger: "openPic",background:'yellow', whichPic:2}
  ]
];

  export default dimensionSpec;
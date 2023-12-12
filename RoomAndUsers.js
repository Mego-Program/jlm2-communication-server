let userList = [
    {nameID:'0000', userName:'Admin', team:'A', role:'Team leader', status:"connect", socket:""},
    {nameID:'1111', userName:'nissim1', team:'A', role:'front', status:"connect", socket:""},
    {nameID:'2222', userName:'reuven', team:'A', role:'front', status:"connect", socket:""},
    {nameID:'3333', userName:'refael', team:'B', role:'Team leader', status:"connect", socket:""},
    {nameID:'4444', userName:'moshe', team:'B', role:'beack', status:"connect", socket:""},
    {nameID:'5555', userName:'Erik', team:'B', role:'beack', status:"disconncet", socket:""},
    {nameID:'6666', userName:'dan', team:'C', role:'Team leader', status:"disconncet", socket:""},
    {nameID:'7777', userName:'noam', team:'C', role:'developer', status:"disconncet", socket:""},
    {nameID:'8888', userName:'segiv', team:'C', role:'developer', status:"disconncet", socket:""},
    {nameID:'9999', userName:'israel', team:'C', role:'developer', status:"disconncet", socket:""}
]

let roomList = [
    {status:"open", roomID:'01233', team:'A', role:'front', roomName:"main", owner:"Server", members:['0000','1111','2222','3333','4444','5555','6666','7777','8888','9999']},
    {status:"open", roomID:'01234', team:'A', role:'front',roomName:"room-10", owner:"Server", members:['0000','1111','2222','3333','4444','5555']},
    {status:"open", roomID:'01235', team:'A', role:'front',roomName:"room-20", owner:"Admin", members:['0000','1111','2222','4444','5555','9999']},
    {status:"open", roomID:'01236', team:'A', role:'front',roomName:"room-30", owner:"other", members:['0000','1111','3333','4444','5555','8888']},
    {status:"open", roomID:'01237', team:'A', role:'front',roomName:"room-40", owner:"User", members:['0000','2222','3333','4444','5555','7777']},
    {status:"open", roomID:'01238', team:'A', role:'front',roomName:"room-50", owner:"User", members:['0000','1111','2222','3333','4444','6666']},
]

export {roomList,userList};



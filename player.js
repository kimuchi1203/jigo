// TODO: player の名前, 色
var Player = function(id) {
  this.id = id;
  this.name = Defaults[id-1].name;
}

Player.prototype = {
  prison: [],
  last_board: [],

  // control calls, (board, x, y) --> (success)
  play: function(board, x, y) {
    var ret = board.play(x, y, this.id, this.last_board);
    if (ret.success == true) {
      this.prison = this.prison.concat(ret.prisoner);
      this.last_board = ret.board;
    }
    return ret.success;
  }
};

Defaults = [
  {
    name: 'black'
  },
  {
    name: 'white'
  },
  {
    name: 'red'
  },
  {
    name: 'blue'
  },
  {
    name: 'green'
  }
]

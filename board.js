var board = {
  board: [],
  xsize: 9,
  ysize: 9,

  init: function(size) {
    this.xsize = size;
    this.ysize = size;
    this.board = [];
    for (var y=0;y<this.ysize;++y) {
      this.board[y] = [];
      for (var x=0;x<this.xsize;++x) {
        this.board[y][x] = 0;
      }
    }
  },

  // (x, y, player_id, last_board) --> (success, prisoner)
  play: function(x, y, player_id, last_board) {
    var ret = { success: false, prisoner: [], board: this._board_copy() };
    if (this.board[y][x]!=0) return ret;
    var tmp_last_board = this._board_copy();
    this.board[y][x] = player_id;
    var tmp_prisoner = this._take_dead(x, y, player_id);
    if (this._is_dead(x, y) ||
      (last_board != undefined && this._cmp_board(last_board))) {
      this.board  = tmp_last_board;
      return ret;
    }
    ret.board = this._board_copy();
    ret.prisoner = tmp_prisoner;
    ret.success = true;
    return ret;
  },

  _board_copy: function() {
    ret = [];
    for (var y=0;y<this.board.length;++y) {
      ret[y] = [];
      for (var x=0;x<this.board[y].length;++x) {
        ret[y][x] = this.board[y][x];
      }
    }
    return ret;
  },

  _cmp_board: function(last) {
    if (this.board.length != last.length) {
      return false;
    }
    for (var y=0;y<this.board.length;++y) {
      if (this.board[y].length != last[y].length) {
        return false;
      }
      for (var x=0;x<this.board[y].length;++x) {
        if (last[y][x] != this.board[y][x]) {
          return false;
        }
      }
    }
    return true;
  },

  _take_dead: function(x, y, player) {
    var ret = [];
    if (y>0) {
      ret = ret.concat(this.__take_dead(x, y-1, player));
    }
    if (x>0) {
      ret = ret.concat(this.__take_dead(x-1, y, player));
    }
    if (y<this.ysize-1) {
      ret = ret.concat(this.__take_dead(x, y+1, player));
    }
    if (x<this.xsize-1) {
      ret = ret.concat(this.__take_dead(x+1, y, player));
    }
    return ret;
  },

  __take_dead: function(x, y, player) {
    var ret = [];
    var tmp = [];
    if (this._is_dead(x, y, tmp)) {
      for (var i=0;i<tmp.length;++i) {
        if (tmp[i].player != player) {
          ret.push(tmp[i].player);
          this.board[tmp[i].y][tmp[i].x] = 0;
        }
      }
    }
    return ret;
  },

  _is_dead: function(x, y, checked) {
    function is_checked(x, y, checked) {
      for (var i=0;i<checked.length;++i) {
        var p = checked[i];
        if (p.x == x && p.y == y) {
          return true;
        }
      }
      return false;
    }
    if (checked == undefined) {
      checked = [];
    } else if (is_checked(x, y, checked)) {
      return true;
    }
    var p = this.board[y][x];
    if (p == 0) {
      return false;
    }
    checked.push({x: x, y: y, player: p});
    var ret = true;
    if (y>0) {
      if (this.board[y-1][x] == 0) {
        return false;
      } else if (this.board[y-1][x] == p) {
        var up = this._is_dead(x, y-1, checked);
        ret &= up;
      }
    }
    if (y<this.ysize-1) {
      if (this.board[y+1][x] == 0) {
        return false;
      } else if (this.board[y+1][x] == p) {
        var down = this._is_dead(x, y+1, checked);
        ret &= down;
      }
    }
    if (x>0) {
      if (this.board[y][x-1] == 0) {
        return false;
      } else if (this.board[y][x-1] == p) {
        var left = this._is_dead(x-1, y, checked);
        ret &= left;
      }
    }
    if (x<this.xsize-1) {
      if (this.board[y][x+1] == 0) {
        return false;
      } else if (this.board[y][x+1] == p) {
        var right = this._is_dead(x+1, y, checked);
        ret &= right;
      }
    }
    return ret;
  }
};

function board_test() {
  board_init_test();
  board_play_test();
  board_take_dead_test();
  board_board_copy_test();
}

function board_init_test() {
  var size = 3;
  board.init(size);
  if (board.xsize!=size) {
    console.error("error");
  }
  if (board.ysize!=size) {
    console.error("error");
  }
  if (board.board.length!=size) {
    console.error("error");
  }
  if (board.board[0].length!=size) {
    console.error("error");
  }
}

function board_play_test() {
  var x = 0;
  var y = 0;
  var player_id = 1;
  var ret = board.play(x,y,player_id);
  if (ret != true) {
    console.error("error");
  }
  if (board.board[y][x]!=player_id) {
    console.error("error");
  }
  ret = board.play(x,y,player_id+1);
  if (ret != false) {
    console.error("error");
  }
  if (board.board[y][x]!=player_id) {
    console.error("error");
  }
}

function board_take_dead_test() {
  board.board[0][0]=1;
  board.board[1][0]=2;
  var ret = board._take_dead(0, 1);
  if (ret.toString() !== '') {
    console.error("error");
  }
  if (board.board[0][0]!=1) {
    console.error("error");
  }

  board.board[0][0]=1;
  board.board[1][0]=2;
  board.board[0][1]=2;
  var ret = board._take_dead(0,1);
  if (ret.toString()!=='1') {
    console.error("error");
  }
  if (board.board[0][0]!=0) {
    console.error("error");
  }
  board.board[0][1]=1;
  board.board[1][0]=1;
  board.board[2][1]=1;
  board.board[1][2]=1;
  board.board[1][1]=2;
  var ret = board._take_dead(0,1);
  if (ret.toString()!=='2') {
    console.error("error");
  }
  if (model.board[1][1]!=0) {
    console.error("error");
  }

}

function board_board_copy_test() {
  var ysize = 3;
  var xsize = 3;
  var table = [];
  for (var y=0;y<ysize;++y) {
    table[y] = [];
    for (var x=0;x<xsize;++x) {
      table[y][x] = y*xsize+x;
    }
  }
  var new_table = board._board_copy(table);
  for (var y=0;y<ysize;++y) {
    for (var x=0;x<xsize;++x) {
      if (table[y][x] != y*xsize+x) {
        console.error("error");
      }
      if (table[y][x] != new_table[y][x]) {
        console.error("error");
      }
    }
  }
}

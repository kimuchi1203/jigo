var control = {
  players: [],
  current_player: 0,

  init: function(board, view) {
    this.board = board;
    this.view = view;

    function board_onclickhandler(self, x, y) {
      return function() {
        self.play(x, y);
      }
    }

    var table = document.getElementById('table');
    var rows = table.children;
    for (var y=0;y<board.ysize;++y) {
      var cells = rows[y].children;
      for (var x=0;x<board.xsize;++x) {
        var cell = cells[x];
        cell.onclick = board_onclickhandler(this, x, y);
      } // x
    } // y

    function pass_button_handler(self) {
      return function() {
        self.next_player();
      }
    }

    var pass_button = document.getElementById('pass_button');
    pass_button.onclick = pass_button_handler(this);

    function add_player_button_handler(self) {
      return function() {
        self.add_player();
      }
    }

    var add_player_button = document.getElementById('add_player_button');
    add_player_button.onclick = add_player_button_handler(this);
  },

  play: function(x, y) {
    var player = this.players[this.current_player];
    ret = player.play(this.board, x, y);
    if (ret) {
      console.log(x, y, this.current_player);
      this.next_player();
    } else {
      console.log("着手禁止点")
    }
  },

  next_player: function() {
    this.current_player = (this.current_player+1) % this.players.length;
    this.view.render(this.board, this.players, this.current_player);
  },

  add_player: function() {
    this.players.push(new Player(this.players.length+1));
    this.view.render(this.board, this.players, this.current_player);
  }
};

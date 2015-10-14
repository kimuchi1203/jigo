var view = {
  init: function(board) {
    this.setup(board);
    this.render(board, [], 0);
  },

  setup: function(board) {
    var parent = document.getElementById('board');
    parent.innerHTML='';
    var table = document.createElement('table');
    table.id = 'table';
    for (var y=0;y<board.ysize;++y) {
      var row = document.createElement('tr');
      for (var x=0;x<board.xsize;++x) {
        var cell = document.createElement('td');
        row.appendChild(cell);
      } // x
      table.appendChild(row);
    } // y
    parent.appendChild(table);

    var display = document.getElementById('display');
    display.innerHTML = '';
    var current_display = document.createElement('p');
    current_display.id = 'current_display';
    display.appendChild(current_display);
    var players_display = document.createElement('div');
    players_display.id = 'players_display';
    display.appendChild(players_display);
  },

  render: function(board, players, current_player) {
    if (players.length > 0) {
      var current_display = document.getElementById('current_display');
      current_display.innerHTML = 'next '+players[current_player].name;
    }
    var players_display = document.getElementById('players_display');
    players_display.innerHTML = '';
    for (var i=0;i<players.length;++i) {
      var player = players[i];
      var player_display = document.createElement('p');
      player_display.innerHTML = player.name+':'+player.prison.length;
      players_display.appendChild(player_display);
    }
    var table = document.getElementById('table');
    var rows = table.children;
    for (var y=0;y<board.ysize;++y) {
      var cells = rows[y].children;
      for (var x=0;x<board.xsize;++x) {
        var cell = cells[x];
        var state = board.board[y][x];
        if (state == 0) {
          cell.setAttribute('class', 'empty');
        } else if (state > 0 && state-1 < players.length) {
          cell.setAttribute('class', players[state-1].name);
        } else {
          console.error('unknown state', state, 'at ', x, y);
        }
      } // x
    } // y
  },

  _render: function(env, players, current_player) {
    var turn_display = document.getElementById('display');
    if (current_player == 1) {
      turn_display.innerHTML = "next black";
    } else if (current_player == 2) {
      turn_display.innerHTML = "next white";
    } else if (current_player == 3) {
      turn_display.innerHTML = "next red";
    }
    var prisoners = document.getElementById('prisoners');
    prisoners.innerHTML = "";
    for (var i=0;i<players.length;++i) {
      var player = players[i];
      var prison = document.createElement('span');
      if (player.id == 1) {
        prison.innerHTML = "black: " + player.prison.length;
      } else if (player.id == 2) {
        prison.innerHTML = " white: " + player.prison.length;
      } else if (player.id == 3) {
        prison.innerHTML = " red: " + player.prison.length;
      }
      prisoners.appendChild(prison);
    }
    var table = document.getElementById('table');
    var rows = table.children;
    for (var y=0;y<env.ysize;++y) {
      var cells = rows[y].children;
      for (var x=0;x<env.xsize;++x) {
        var cell = cells[x];
        var state = env.board[y][x];
        if (state==0) {
          cell.setAttribute('class', 'empty');
        } else if (state==1) {
          cell.setAttribute('class', 'black');
        } else if (state==2) {
          cell.setAttribute('class', 'white');
        } else if (state==3) {
          cell.setAttribute('class', 'red');
        } else {
          console.error('unknown state', state, 'at ', x, y);
        }
      } // x
    } // y
  }
};

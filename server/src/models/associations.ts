import { User } from './user.js';
import { Board } from './board.js';
import { Column } from './column.js';
import { Ticket } from './ticket.js';

// User associations
User.hasMany(Board, {
  foreignKey: 'userId',
  as: 'boards',
});

User.hasMany(Ticket, {
  foreignKey: 'userId',
  as: 'tickets',
});

// Board associations
Board.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

Board.hasMany(Column, {
  foreignKey: 'boardId',
  as: 'columns',
});

// Column associations
Column.belongsTo(Board, {
  foreignKey: 'boardId',
  as: 'board',
});

Column.hasMany(Ticket, {
  foreignKey: 'columnId',
  as: 'tickets',
});

// Ticket associations
Ticket.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

Ticket.belongsTo(Column, {
  foreignKey: 'columnId',
  as: 'column',
}); 
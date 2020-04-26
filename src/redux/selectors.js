import { createSelector } from 'reselect';
import {fieldSize} from '../gameConstants';

// Base selectors
const selectBallState = state => state.ballState;

// Converts ball state to cell state.
// Format of ball state: see reducer.js
// Format of cell state: array of numbers, one item for each cell, meaning:
// 0 = empty, 1, 2, 3 = occupied by a ball with color 1, 2, 3... respectively
export const convertToCellState = createSelector(
  selectBallState,
  (ballState) => {
    let cellState = (new Array(fieldSize)).fill(0);

    ballState.forEach((ballEntry) => {
      const {color, cell} = ballEntry;
      cellState[cell] = color;
    });

    return cellState;
  }
);

// Returns array of free cell indices
export const getFreeCellIndices = createSelector(
  convertToCellState,
  (cellState) => {
    let freeCellIndices = [];

    for (let i=0; i<cellState.length; i++) {
      if (cellState[i] === 0) {
        freeCellIndices.push(i);
      }
    }

    return freeCellIndices;
  }
);

// Returns largest ball id
export const getLargestBallId = createSelector(
  selectBallState,
  (ballState) => {
    if (ballState.length === 0) return 0;

    return ballState.reduce((largest, ball) => {
      if (ball.id > largest) {
        return ball.id;
      } else {
        return largest;
      }
    }, ballState[0].id);
  }
);

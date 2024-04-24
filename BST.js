/* eslint-disable max-classes-per-file */
import mergeSort from './merge.js';

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    const sortedArray = mergeSort(arr);
    const uniqueArray = new Set(sortedArray);
    return uniqueArray;
  }
}

const art = new Tree();
console.log(art.buildTree([1, 2, 2, 3, 3, 4, 5, 5, 5]));

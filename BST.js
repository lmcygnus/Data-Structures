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
    let sortedArray = [...new Set(arr)];
    sortedArray = mergeSort([...sortedArray]);
    console.log(sortedArray);
    this.root = this.buildTree(sortedArray, 0, sortedArray.length - 1);
  }

  buildTree(arr, start, end) {
    if (start > end) {
      return null;
    }
    const middle = Math.floor((start + end) / 2);
    const root = new Node(arr[middle]);
    root.left = this.buildTree(arr, start, middle - 1);
    root.right = this.buildTree(arr, middle + 1, end);
    return root;
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

const art = new Tree([1, 2, 2, 3, 3, 4, 5, 5]);
console.log(prettyPrint(art.root));

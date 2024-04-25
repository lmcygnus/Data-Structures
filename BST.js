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

  insert(value) {
    const insertRec = (root, val) => {
      let currentNode = root;
      if (currentNode == null) {
        currentNode = new Node(val);
        return currentNode;
      }
      if (value < currentNode.data) currentNode.left = insertRec(currentNode.left, val);
      else if (value > currentNode.data) currentNode.right = insertRec(currentNode.right, val);
      return currentNode;
    };
    this.root = insertRec(this.root, value);
  }

  minValue(node) {
    let currentNode = node;
    let minv = currentNode.data;
    while (currentNode.left !== null) {
      minv = currentNode.left.data;
      currentNode = currentNode.left;
    }
    return minv;
  }

  delete(value) {
    const deleteRec = (root, val) => {
      let currentNode = root;
      if (currentNode == null) {
        return currentNode;
      }
      if (val < currentNode.data) {
        currentNode.left = deleteRec(currentNode.left, val);
      } else if (val > currentNode.data) {
        currentNode.right = deleteRec(currentNode.right, val);
      } else {
        if (currentNode.left === null) {
          return currentNode.right;
        }
        if (currentNode.right === null) {
          return currentNode.left;
        }
        currentNode.data = this.minValue(currentNode.right);
        currentNode.right = deleteRec(currentNode.right, currentNode.data);
      }
      return currentNode;
    };
    this.root = deleteRec(this.root, value);
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
art.insert(7);
art.delete(5);
console.log(prettyPrint(art.root));

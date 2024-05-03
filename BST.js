/* eslint-disable no-console */
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
      const currentNode = root;
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

  find(value) {
    let currentNode = this.root;
    while (currentNode) {
      if (value === currentNode.data) {
        return currentNode;
      }
      if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else if (value > currentNode.data) {
        currentNode = currentNode.right;
      }
    }
    return currentNode;
  }

  levelOrder(callback) {
    const queue = [];
    const array = [];
    let currentNode = this.root;
    if (currentNode) {
      queue.push(currentNode);
      while (queue.length > 0) {
        currentNode = queue.shift();
        array.push(currentNode);
        if (currentNode.left) {
          queue.push(currentNode.left);
        }
        if (currentNode.right) {
          queue.push(currentNode.right);
        }
      }
    }
    if (callback) {
      array.forEach((node) => {
        callback(node);
      });
    }
    return array;
  }

  preorder(callback) {
    const array = [];
    const recursionPreorder = (node) => {
      if (node == null) return;
      array.push(node.data);
      recursionPreorder(node.left);
      recursionPreorder(node.right);
    };
    recursionPreorder(this.root);
    if (callback) {
      array.forEach((node) => {
        callback(node);
      });
    }
    return array;
  }

  inorder(callback) {
    const array = [];
    const recursionPreorder = (node) => {
      if (node == null) return;
      recursionPreorder(node.left);
      array.push(node.data);
      recursionPreorder(node.right);
    };
    recursionPreorder(this.root);
    if (callback) {
      array.forEach((node) => {
        callback(node);
      });
    }
    return array;
  }

  postorder(callback) {
    const array = [];
    const recursionPreorder = (node) => {
      if (node == null) return;
      recursionPreorder(node.left);
      recursionPreorder(node.right);
      array.push(node.data);
    };
    recursionPreorder(this.root);
    if (callback) {
      array.forEach((node) => {
        callback(node);
      });
    }
    return array;
  }

  heigth(node) {
    let heigth = 0;
    const queue = [node];
    while (queue.length > 0) {
      for (let i = 0; i < queue.length; i += 1) {
        const currentNode = queue.shift();
        if (currentNode.left) queue.push(currentNode.left);
        if (currentNode.right) queue.push(currentNode.right);
      }
      heigth += 1;
    }
    return heigth;
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

const art = new Tree([1, 2, 2, 23, 65, 9, 31, 3, 3, 4, 5, 5]);
art.insert(7);
art.delete(5);
art.preorder();
art.heigth(art.root);
console.log(prettyPrint(art.root));

/* eslint-disable max-classes-per-file */
import { LinkedList } from './linkedList';

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}
class HashMap {
  constructor() {
    this.buckets = [];
    this.capacity = 16;
    this.size = 0;
    this.loadFactor = 0.75;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i += 1) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bound');
    } else {
      if (!this.buckets[index]) {
        this.buckets[index] = new Node(key, value);
      } else {
        let currentNode = this.buckets[index];
        while (currentNode.next) {
          if (currentNode.key === key) {
            currentNode.value = value;
            return;
          }
          currentNode = currentNode.next;
        }
        currentNode.next = new Node(key, value);
      }
      this.size += 1;
      if (this.size >= this.capacity * this.loadFactor) {
        this.resize();
      }
    }
  }

  get(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bound');
    } else {
      let currentNode = this.buckets[index];
      while (currentNode) {
        if (currentNode.key === key) {
          return currentNode.value;
        }
        currentNode = currentNode.next;
      }
      return null;
    }
  }

  has(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bound');
    } else {
      let currentNode = this.buckets[index];
      while (currentNode) {
        if (currentNode.key === key) {
          return true;
        }
        currentNode = currentNode.next;
      }
      return true;
    }
  }

  remove(key) {
    const index = this.hash(key);
    let currentNode = this.buckets[index];
    while (currentNode) {
      if (currentNode.key === key) {
        currentNode = null;
        return true;
      }
      currentNode = currentNode.next;
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets.forEach()
  }

  keys() {

  }

  entries() {

  }

  resize() {
    this.capacity *= 2;
    const oldBuckets = this.buckets;
    this.buckets = new Array(this.capacity);
    this.size = 0;
    oldBuckets.forEach((bucket) => {
      let currentNode = bucket;
      while (currentNode) {
        this.set(currentNode.key, currentNode.value);
        currentNode = currentNode.next;
      }
    });
  }
}

const hashmp = new HashMap()

console.log(hashmp.set('yo', 'loida'));
console.log(hashmp.get('yo'));

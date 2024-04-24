/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
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

  checkIndex(index) {
    if (index < 0 || index >= this.capacity) {
      throw new Error('Trying to access index out of bound');
    }
  }

  set(key, value) {
    const index = this.hash(key);
    this.checkIndex(index);
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
    }
    this.size += 1;
    if (this.size >= this.capacity * this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    const index = this.hash(key);
    this.checkIndex(index);
    let currentNode = this.buckets[index];
    while (currentNode) {
      if (currentNode.key === key) {
        return currentNode.value;
      }
      currentNode = currentNode.next;
    }
    return null;
  }

  has(key) {
    const index = this.hash(key);
    this.checkIndex(index);
    let currentNode = this.buckets[index];
    while (currentNode) {
      if (currentNode.key === key) {
        return true;
      }
      currentNode = currentNode.next;
    }
    return false;
  }

  remove(key) {
    const index = this.hash(key);
    this.checkIndex(index);
    let currentNode = this.buckets[index];
    const previousNode = this.buckets(index - 1);
    const nextNode = this.buckets(index + 1);
    while (currentNode) {
      if (currentNode.key === key) {
        previousNode.next = nextNode;
      }
      currentNode = currentNode.next;
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = [];
  }

  keys() {
    const keysArray = [];
    this.buckets.forEach((entry) => {
      let bucket = entry;
      while (bucket) {
        keysArray.push(entry.key);
        bucket = bucket.next;
      }
    });
    return keysArray;
  }

  values() {
    const valuesArray = [];
    this.buckets.forEach((entry) => {
      let bucket = entry;
      while (bucket) {
        valuesArray.push(entry.value);
        bucket = bucket.next;
      }
    });
    return valuesArray;
  }

  entries() {
    const entriesArray = [];
    this.buckets.forEach((entry) => {
      let bucket = entry;
      while (bucket) {
        entriesArray.push([entry.key, entry.value]);
        bucket = bucket.next;
      }
    });
    return entriesArray;
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

const hashmp = new HashMap();

console.log(hashmp.set('0', 'loida'));
console.log(hashmp.set('b', '364'));

console.log(hashmp.get('0'));
console.log(hashmp.get('b'));

console.log(hashmp.has('0'));
console.log(hashmp.entries());
console.log(hashmp.values());
console.log(hashmp.keys());

#!/usr/bin/node
/* eslint-disable no-console */
/* eslint-disable max-classes-per-file */
class Node {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor(head = null) {
    this.head = head;
    this.length = 0;
  }

  append(value) {
    if (!this.head) {
      this.head = new Node(value);
      return this;
    }
    const tail = this.tail();
    tail.next = new Node(value);
    this.length += 1;
    return tail;
  }

  prepend(value) {
    if (!this.head) {
      this.head = new Node(value);
      this.length += 1;
      return this;
    }
    const prevHead = this.head;
    this.head = new Node(value, prevHead);
    this.length += 1;
    return this;
  }

  size() {
    return `${this.length} nodes`;
  }

  Head() {
    return this.head;
  }

  tail() {
    if (!this.head) return null;
    let tail = this.head;
    while (tail.next !== null) {
      tail = tail.next;
    }
    return tail;
  }

  at(index) {
    if (!this.head) return null;
    let pointer = this.head;
    for (let i = 0; i < index; i += 1) {
      pointer = pointer.next;
    }
    return pointer || null;
  }

  pop() {
    if (!this.head) return null;
    if (!this.head.next) {
      this.head = null;
      return;
    }
    const pointerBeforeTail = this.at(this.length - 2);
    pointerBeforeTail.next = null;
    this.length -= 1;
    return this.head;
  }

  contains(value) {
    if (!this.head) return null;
    let pointer = this.head;
    while (pointer.next !== null) {
      if (pointer.value === value) return true;
      pointer = pointer.next;
    }
    return pointer.value === value;
  }

  find(value) {
    if (!this.head) return null;
    let pointer = this.head;
    let count = 0;
    while (pointer.next !== null) {
      if (pointer.value === value) return count;
      pointer = pointer.next;
      count += 1;
    }
    if (pointer.value === value) return count;
    return null;
  }

  toString() {
    if (!this.head) return '(null)';
    let str = '';
    let pointer = this.head;
    while (pointer.next !== null) {
      str = `${str} (${pointer.value}) ->`;
      pointer = pointer.next;
    }
    return `${str} (${pointer.value}) -> (null)`;
  }

  insertAt(value, index) {
    if (!this.head) return null;
    let pointer = this.head;
    if (index === 0) {
      this.prepend(value);
    } else {
      for (let i = 1; i < index; i += 1) {
        pointer = pointer.next;
      }
      const newNode = new Node(value);
      const pointerNext = pointer.next;
      pointer.next = newNode;
      newNode.next = pointerNext;
      this.length += 1;
    }
  }

  removeAt(index) {
    if (!this.head) return null;
    if (index === 0) {
      this.head = this.head.next;
    }
    const previousNode = this.at(index - 1);
    const nextNode = this.at(index + 1);

    previousNode.next = nextNode;
  }
}

const list = new LinkedList();
console.log(list.prepend(1));
console.log(list.append(2));
console.log(list.append(3));
console.log(list.append(4));
console.log(list.size());
console.log(list.Head());
console.log(list.tail());
console.log(list.at(2));
console.log(list.pop());
console.log(list.contains(3));
console.log(list.find(2));
console.log(list.insertAt(7, 1));
console.log(list.removeAt(2));
console.log(list.toString());
#!/usr/bin/node
/* eslint-disable max-classes-per-file */
class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  append(value) {
    if (!this.head) {
      this.head = new Node(value);
      return this;
    }
    const tail = this.getTail();
    tail.next = new Node(value);
    return tail;
  }

  prepend(value) {
    if (!this.head) {
      this.head = new Node(value);
      return this;
    }
    const prevHead = this.head;
    this.head = new Node(value, prevHead);
  }
}
class node {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}

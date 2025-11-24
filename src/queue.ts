class Node<T> {
    value: T;
    next: Node<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

export class Queue<T> {
    head: Node<T> | null;
    tail: Node<T> | null;
    size: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    display(): void {
        if (this.head === null) {
            console.log("Empty list");
            return;
        }

        const values: T[] = [];
        let current: Node<T> | null = this.head;

        while (current) {
            values.push(current.value);
            current = current.next;
        }

        console.log(values.join(" -> ") + " -> null");
    }

    enqueue(value: T): void {
        const node = new Node(value);

        if (!this.head || !this.tail) {
            this.head = node;
            this.tail = this.head;
            this.size++;
            return;
        }

        this.tail.next = node;
        this.tail = node;
        this.size++;
    }

    dequeue(): T | null {
        if (!this.head) {
            return null;
        }

        const value = this.head.value;
        this.head = this.head.next;
        if (!this.head) {
            this.tail = null;
        }
        this.size--;

        return value;
    }

    peek(): T | null {
        if (!this.head) {
            return null;
        }

        return this.head.value;
    }
}

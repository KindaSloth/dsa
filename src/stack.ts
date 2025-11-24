class Node<T> {
    value: T;
    next: Node<T> | null;
    
    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

export class Stack<T> {
    head: Node<T> | null;
    size: number;

    constructor() {
        this.head = null;
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

    push(value: T): void {
        const node = new Node(value);
        node.next = this.head;
        this.head = node;
        this.size++;
    }

    pop(): T | null {
        if (!this.head) {
            return null;
        }

        const value = this.head.value;
        this.head = this.head.next;
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

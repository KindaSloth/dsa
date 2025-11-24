class Node<T> {
    value: T;
    next: Node<T> | null;
    prev: Node<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

export class DoublyLinkedList<T> {
    head: Node<T> | null;
    tail: Node<T> | null;
    size: number;
    equals: (value1: T, value2: T) => boolean;

    constructor(equals?: (value1: T, value2: T) => boolean) {
        this.head = null;
        this.tail = null;
        this.size = 0;
        if (equals) {
            this.equals = equals;
        } else {
            this.equals = (value1, value2) => value1 === value2;
        }
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

        console.log(values.join(" <-> ") + " <-> null");
    }

    append(value: T): void {
        const node = new Node(value);

        if (!this.head || !this.tail) {
            this.head = node;
            this.tail = this.head;
            this.size++;
            return;
        }

        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
        this.size++;
    }

    prepend(value: T): void {
        const node = new Node(value);

        if (!this.head || !this.tail) {
            this.head = node;
            this.tail = node;
            this.size++;
            return;
        }

        node.next = this.head;
        this.head.prev = node;
        this.head = node;
        this.size++;
    }

    search(value: T): { current: T | null; next: T | null; prev: T | null } {
        let current = this.head;

        while (current) {
            if (this.equals(current.value, value)) {
                return {
                    current: current.value,
                    next: current.next?.value ?? null,
                    prev: current.prev?.value ?? null,
                };
            }
            current = current.next;
        }

        return { current: null, next: null, prev: null };
    }

    remove(value: T): void {
        if (!this.head) {
            return;
        }

        if (this.equals(this.head.value, value)) {
            this.head = this.head.next;

            if (this.head) {
                this.head.prev = null;
            } else {
                this.tail = null;
            }

            this.size--;
            return;
        }

        let current = this.head.next;
        while (current) {
            if (this.equals(current.value, value)) {
                // Update previous node's next pointer
                if (current.prev) {
                    current.prev.next = current.next;
                }

                // Update next node's prev pointer
                if (current.next) {
                    current.next.prev = current.prev;
                } else {
                    // Update tail
                    this.tail = current.prev;
                }

                this.size--;
                return;
            }

            current = current.next;
        }
    }
}

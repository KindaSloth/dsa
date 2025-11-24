class Node<T> {
    value: T;
    next: Node<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

export class SinglyLinkedList<T> {
    head: Node<T> | null;
    size: number;
    equals: (value1: T, value2: T) => boolean;

    constructor(equals?: (value1: T, value2: T) => boolean) {
        this.head = null;
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

        console.log(values.join(" -> ") + " -> null");
    }

    append(value: T): void {
        const node = new Node(value);

        if (this.head === null) {
            this.head = node;
            this.size++;
            return;
        }

        let current = this.head;
        while (current?.next) {
            current = current.next;
        }
        current.next = node;
        this.size++;
    }

    prepend(value: T): void {
        const node = new Node(value);
        node.next = this.head;
        this.head = node;
        this.size++;
    }

    search(value: T): T | null {
        let current = this.head;
        while (current) {
            if (this.equals(current.value, value)) return current.value;
            current = current.next;
        }
        return null;
    }

    remove(value: T): void {
        if (!this.head) {
            return;
        }

        if (this.equals(this.head.value, value)) {
            this.head = this.head.next;
            this.size--;
            return;
        }

        let current = this.head.next;
        let previous = this.head;
        while (current) {
            if (this.equals(current.value, value)) {
                previous.next = current.next;
                this.size--;
                return;
            }

            previous = current;
            current = current.next;
        }
    }
}

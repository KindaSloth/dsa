type LeftistNode<T> = {
    rank: number;
    key: string;
    value: T;
    left: LeftistNode<T> | null;
    right: LeftistNode<T> | null;
};

export class LeftistHeap<T> {
    root: LeftistNode<T> | null;

    constructor() {
        this.root = null;
    }

    private getRank(heap: LeftistNode<T> | null): number {
        if (heap === null) return 0;
        return heap.rank;
    }

    private makeNode(key: string, value: T, a: LeftistNode<T> | null, b: LeftistNode<T> | null): LeftistNode<T> {
        if (this.getRank(a) >= this.getRank(b)) {
            return {
                rank: this.getRank(b) + 1,
                key,
                value,
                left: a,
                right: b
            };
        } else {
            return {
                rank: this.getRank(a) + 1,
                key,
                value,
                left: b,
                right: a
            };
        }
    }

    isEmpty(): boolean {
        return this.root === null;
    }

    private merge(h1: LeftistNode<T> | null, h2: LeftistNode<T> | null): LeftistNode<T> | null {
        if (h1 === null) return h2;
        if (h2 === null) return h1;

        if (h1.key < h2.key) {
            return this.makeNode(h1.key, h1.value, h1.left, this.merge(h1.right, h2));
        } else {
            return this.makeNode(h2.key, h2.value, h2.left, this.merge(h1, h2.right));
        }
    }

    private createNode(key: string, value: T): LeftistNode<T> {
        return {
            rank: 1,
            key,
            value,
            left: null,
            right: null
        };
    }

    insert(key: string, value: T): void {
        this.root = this.merge(this.createNode(key, value), this.root);
    }

    findMin(): { key: string; value: T } | null {
        if (this.root === null) return null;
        return { key: this.root.key, value: this.root.value };
    }

    deleteMin(): void {
        if (this.root === null) return;
        this.root = this.merge(this.root.left, this.root.right);
    }

    extractMin(): { key: string; value: T } | null {
        const value = this.findMin();
        this.deleteMin();
        return value;
    } 

    display(): void {
        if (this.root === null) {
            console.log("Empty heap");
            return;
        }
        console.log("Leftist Heap:");
        this._display(this.root, "", true);
    }

    private _display(heap: LeftistNode<T> | null, prefix: string, isLast: boolean): void {
        if (heap === null) return;

        console.log(
            prefix +
            (isLast ? "└─ " : "├─ ") +
            `${heap.key}: ${JSON.stringify(heap.value)} (r:${heap.rank})`
        );

        const newPrefix = prefix + (isLast ? "   " : "│  ");

        if (heap.left !== null && heap.right !== null) {
            this._display(heap.left, newPrefix, false);
            this._display(heap.right, newPrefix, true);
        } else if (heap.left !== null) {
            this._display(heap.left, newPrefix, true);
        } else if (heap.right !== null) {
            this._display(heap.right, newPrefix, true);
        }
    }
}

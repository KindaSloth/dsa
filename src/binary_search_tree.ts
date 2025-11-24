type Node<T> = {
    key: string;
    value: T,
    left: Node<T> | null;
    right: Node<T> | null;
}

export class BinarySearchTree<T> {
    root: Node<T> | null;

    constructor() {
        this.root = null;
    }

    /**
     * Helper to merge two tree references, handling null cases.
     * Merges based on key comparison.
     */
    private mergeNodes(
        t1: Node<T> | null,
        t2: Node<T> | null
    ): Node<T> | null {
        if (!t1) return t2;
        if (!t2) return t1;

        const x = t1.key;
        const y = t2.key;

        if (x > y) {
            return {
                key: x,
                value: t1.value,
                left: this.mergeNodes(t2, t1.left),
                right: t1.right,
            }
        }
        
        if (x < y) {
            return {
                key: y,
                value: t2.value,
                left: this.mergeNodes(t1, t2.left),
                right: t2.right
            }
        }

        return {
            key: x,
            value: t1.value,
            left: this.mergeNodes(t1.left, t2.left),
            right: this.mergeNodes(t1.right, t2.right)
        }
    }

    private _insert(node: Node<T> | null, key: string, value: T): Node<T> {
        if (!node) {
            return {
                key,
                value,
                left: null,
                right: null,
            }
        }

        if (key > node.key) {
            return {
                key: node.key,
                value: node.value,
                left: node.left,
                right: this._insert(node.right, key, value),
            }
        }

        if (key < node.key) {
            return {
                key: node.key,
                value: node.value,
                left: this._insert(node.left, key, value),
                right: node.right
            }
        }

        return {
            key,
            value,
            left: node.left,
            right: node.right,
        }
    }

    insert(key: string, value: T): void {
        const node = this._insert(this.root, key, value);
        this.root = node;
    }

    private _search(node: Node<T> | null, key: string): Node<T> | null {
        if (!node) {
            return null;
        }

        if (key > node.key) {
            return this._search(node.right, key);
        }

        if (key < node.key) {
            return this._search(node.left, key);
        }

        return node;
    }

    search(key: string): Node<T> | null {
        return this._search(this.root, key);
    }

    private _delete(node: Node<T> | null, key: string): Node<T> | null {
        if (!node) {
            return null;
        }

        if (key > node.key) {
            return {
                key: node.key,
                value: node.value,
                left: node.left,
                right: this._delete(node.right, key)
            }
        }

        if (key < node.key) {
            return {
                key: node.key,
                value: node.value,
                left: this._delete(node.left, key),
                right: node.right
            }
        }

        return this.mergeNodes(node.left, node.right);
    }

    delete(key: string): void {
        const node = this._delete(this.root, key);
        this.root = node;
    }

    display(): void {
        if (!this.root) {
            console.log("Empty tree");
            return;
        }
        console.log("Binary Search Tree:");
        this._display(this.root, "", true);
    }

    private _display(node: Node<T> | null, prefix: string, isLast: boolean): void {
        if (!node) return;

        console.log(prefix + (isLast ? "└─ " : "├─ ") + `${node.key}: ${JSON.stringify(node.value)}`);

        const newPrefix = prefix + (isLast ? "   " : "│  ");

        if (node.left && node.right) {
            this._display(node.left, newPrefix, false);
            this._display(node.right, newPrefix, true);
        } else if (node.left) {
            this._display(node.left, newPrefix, true);
        } else if (node.right) {
            this._display(node.right, newPrefix, true);
        }
    }
}

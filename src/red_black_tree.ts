enum Color {
    Red = "Red",
    Black = "Black",
    DoubleBlack = "DoubleBlack"
}

type Node<T> = {
    color: Color;
    key: string;
    value: T;
    left: Tree<T>;
    right: Tree<T>;
};

type Tree<T> = Node<T> | "Empty" | "DoubleEmpty";

export class RedBlackTree<T> {
    root: Tree<T>;

    constructor() {
        this.root = "Empty";
    }

    private node(color: Color, left: Tree<T>, key: string, value: T, right: Tree<T>): Node<T> {
        return { color, key, value, left, right };
    }

    private balance(color: Color, a: Tree<T>, key: string, value: T, b: Tree<T>): Tree<T> {
        // Case 1: Black node with Red left child that has Red left child
        if (
            color === Color.Black &&
            a !== "Empty" && a !== "DoubleEmpty" &&
            a.color === Color.Red &&
            a.left !== "Empty" && a.left !== "DoubleEmpty" &&
            a.left.color === Color.Red
        ) {
            const y = a.key;
            const yVal = a.value;
            const redLeft = a.left;
            const c = a.right;
            const z = key;
            const zVal = value;
            const d = b;
            return this.node(
                Color.Red,
                this.node(Color.Black, redLeft.left, redLeft.key, redLeft.value, redLeft.right),
                y,
                yVal,
                this.node(Color.Black, c, z, zVal, d)
            );
        }

        // Case 2: Black node with Red left child that has Red right child
        if (
            color === Color.Black &&
            a !== "Empty" && a !== "DoubleEmpty" &&
            a.color === Color.Red &&
            a.right !== "Empty" && a.right !== "DoubleEmpty" &&
            a.right.color === Color.Red
        ) {
            const xKey = a.key;
            const xVal = a.value;
            const aLeft = a.left;
            const y = a.right.key;
            const yVal = a.right.value;
            const bVal = a.right.left;
            const c = a.right.right;
            const z = key;
            const zVal = value;
            const d = b;
            return this.node(
                Color.Red,
                this.node(Color.Black, aLeft, xKey, xVal, bVal),
                y,
                yVal,
                this.node(Color.Black, c, z, zVal, d)
            );
        }

        // Case 3: Black node with Red right child that has Red left child
        if (
            color === Color.Black &&
            b !== "Empty" && b !== "DoubleEmpty" &&
            b.color === Color.Red &&
            b.left !== "Empty" && b.left !== "DoubleEmpty" &&
            b.left.color === Color.Red
        ) {
            const xKey = key;
            const xVal = value;
            const aVal = a;
            const y = b.left.key;
            const yVal = b.left.value;
            const bLeft = b.left.left;
            const c = b.left.right;
            const z = b.key;
            const zVal = b.value;
            const d = b.right;
            return this.node(
                Color.Red,
                this.node(Color.Black, aVal, xKey, xVal, bLeft),
                y,
                yVal,
                this.node(Color.Black, c, z, zVal, d)
            );
        }

        // Case 4: Black node with Red right child that has Red right child
        if (
            color === Color.Black &&
            b !== "Empty" && b !== "DoubleEmpty" &&
            b.color === Color.Red &&
            b.right !== "Empty" && b.right !== "DoubleEmpty" &&
            b.right.color === Color.Red
        ) {
            const xKey = key;
            const xVal = value;
            const aVal = a;
            const y = b.key;
            const yVal = b.value;
            const bLeft = b.left;
            const z = b.right.key;
            const zVal = b.right.value;
            const c = b.right.left;
            const d = b.right.right;
            return this.node(
                Color.Red,
                this.node(Color.Black, aVal, xKey, xVal, bLeft),
                y,
                yVal,
                this.node(Color.Black, c, z, zVal, d)
            );
        }

        // DoubleBlack cases
        if (
            color === Color.DoubleBlack &&
            b !== "Empty" && b !== "DoubleEmpty" &&
            b.color === Color.Red &&
            b.left !== "Empty" && b.left !== "DoubleEmpty" &&
            b.left.color === Color.Red
        ) {
            const xKey = key;
            const xVal = value;
            const aVal = a;
            const y = b.left.key;
            const yVal = b.left.value;
            const bVal = b.left.left;
            const c = b.left.right;
            const z = b.key;
            const zVal = b.value;
            const d = b.right;
            return this.node(
                Color.Black,
                this.node(Color.Black, aVal, xKey, xVal, bVal),
                y,
                yVal,
                this.node(Color.Black, c, z, zVal, d)
            );
        }

        if (
            color === Color.DoubleBlack &&
            a !== "Empty" && a !== "DoubleEmpty" &&
            a.color === Color.Red &&
            a.right !== "Empty" && a.right !== "DoubleEmpty" &&
            a.right.color === Color.Red
        ) {
            const xKey = a.key;
            const xVal = a.value;
            const aLeft = a.left;
            const y = a.right.key;
            const yVal = a.right.value;
            const bVal = a.right.left;
            const c = a.right.right;
            const z = key;
            const zVal = value;
            const d = b;
            return this.node(
                Color.Black,
                this.node(Color.Black, aLeft, xKey, xVal, bVal),
                y,
                yVal,
                this.node(Color.Black, c, z, zVal, d)
            );
        }

        // Default case
        return this.node(color, a, key, value, b);
    }

    private ins(tree: Tree<T>, key: string, value: T): Tree<T> {
        if (tree === "Empty") {
            return this.node(Color.Red, "Empty", key, value, "Empty");
        }

        if (tree === "DoubleEmpty") {
            return this.node(Color.Red, "Empty", key, value, "Empty");
        }

        const x = tree.key;
        const a = tree.left;
        const b = tree.right;
        const color = tree.color;

        if (key < x) {
            return this.balance(color, this.ins(a, key, value), tree.key, tree.value, b);
        } else if (key === x) {
            return this.node(color, a, key, value, b);
        } else {
            return this.balance(color, a, tree.key, tree.value, this.ins(b, key, value));
        }
    }

    private blacken(tree: Tree<T>): Tree<T> {
        if (tree === "Empty" || tree === "DoubleEmpty") {
            return tree;
        }

        // Case 1: Red root with Red left child
        if (
            tree.color === Color.Red &&
            tree.left !== "Empty" && tree.left !== "DoubleEmpty" &&
            tree.left.color === Color.Red
        ) {
            const x = tree.key;
            const xVal = tree.value;
            const redLeft = tree.left;
            const y = redLeft.key;
            const yVal = redLeft.value;
            const a = redLeft.left;
            const b = redLeft.right;
            const c = tree.right;
            return this.node(
                Color.Black,
                this.node(Color.Red, a, x, xVal, b),
                y,
                yVal,
                c
            );
        }

        // Case 2: Red root with Red right child
        if (
            tree.color === Color.Red &&
            tree.right !== "Empty" && tree.right !== "DoubleEmpty" &&
            tree.right.color === Color.Red
        ) {
            const x = tree.key;
            const xVal = tree.value;
            const a = tree.left;
            const redRight = tree.right;
            const y = redRight.key;
            const yVal = redRight.value;
            const b = redRight.left;
            const c = redRight.right;
            return this.node(
                Color.Black,
                a,
                x,
                xVal,
                this.node(Color.Red, b, y, yVal, c)
            );
        }

        // Ensure root is always Black
        return { ...tree, color: Color.Black };
    }

    insert(key: string, value: T): void {
        this.root = this.blacken(this.ins(this.root, key, value));
    }

    private rotate(color: Color, a: Tree<T>, y: string, yVal: T, b: Tree<T>): Tree<T> {
        // Red cases with DoubleBlack left
        if (
            color === Color.Red &&
            a !== "Empty" && a !== "DoubleEmpty" &&
            a.color === Color.DoubleBlack &&
            b !== "Empty" && b !== "DoubleEmpty" &&
            b.color === Color.Black
        ) {
            return this.balance(
                Color.Black,
                this.node(Color.Red, this.node(Color.Black, a.left, a.key, a.value, a.right), y, yVal, b.left),
                b.key,
                b.value,
                b.right
            );
        }

        if (
            color === Color.Red &&
            a === "DoubleEmpty" &&
            b !== "Empty" && b !== "DoubleEmpty" &&
            b.color === Color.Black
        ) {
            return this.balance(
                Color.Black,
                this.node(Color.Red, "Empty", y, yVal, b.left),
                b.key,
                b.value,
                b.right
            );
        }

        // Red cases with DoubleBlack right
        if (
            color === Color.Red &&
            a !== "Empty" && a !== "DoubleEmpty" &&
            a.color === Color.Black &&
            b !== "Empty" && b !== "DoubleEmpty" &&
            b.color === Color.DoubleBlack
        ) {
            return this.balance(
                Color.Black,
                a.left,
                a.key,
                a.value,
                this.node(Color.Red, a.right, y, yVal, this.node(Color.Black, b.left, b.key, b.value, b.right))
            );
        }

        if (
            color === Color.Red &&
            a !== "Empty" && a !== "DoubleEmpty" &&
            a.color === Color.Black &&
            b === "DoubleEmpty"
        ) {
            return this.balance(
                Color.Black,
                a.left,
                a.key,
                a.value,
                this.node(Color.Red, a.right, y, yVal, "Empty")
            );
        }

        // Black cases
        if (
            color === Color.Black &&
            a !== "Empty" && a !== "DoubleEmpty" &&
            a.color === Color.DoubleBlack &&
            b !== "Empty" && b !== "DoubleEmpty" &&
            b.color === Color.Black
        ) {
            return this.balance(
                Color.DoubleBlack,
                this.node(Color.Red, this.node(Color.Black, a.left, a.key, a.value, a.right), y, yVal, b.left),
                b.key,
                b.value,
                b.right
            );
        }

        if (
            color === Color.Black &&
            a === "DoubleEmpty" &&
            b !== "Empty" && b !== "DoubleEmpty" &&
            b.color === Color.Black
        ) {
            return this.balance(
                Color.DoubleBlack,
                this.node(Color.Red, "Empty", y, yVal, b.left),
                b.key,
                b.value,
                b.right
            );
        }

        if (
            color === Color.Black &&
            a !== "Empty" && a !== "DoubleEmpty" &&
            a.color === Color.Black &&
            b !== "Empty" && b !== "DoubleEmpty" &&
            b.color === Color.DoubleBlack
        ) {
            return this.balance(
                Color.DoubleBlack,
                a.left,
                a.key,
                a.value,
                this.node(Color.Red, a.right, y, yVal, this.node(Color.Black, b.left, b.key, b.value, b.right))
            );
        }

        if (
            color === Color.Black &&
            a !== "Empty" && a !== "DoubleEmpty" &&
            a.color === Color.Black &&
            b === "DoubleEmpty"
        ) {
            return this.balance(
                Color.DoubleBlack,
                a.left,
                a.key,
                a.value,
                this.node(Color.Red, a.right, y, yVal, "Empty")
            );
        }

        // Complex rotation cases
        if (
            color === Color.Black &&
            a !== "Empty" && a !== "DoubleEmpty" &&
            a.color === Color.DoubleBlack &&
            b !== "Empty" && b !== "DoubleEmpty" &&
            b.color === Color.Red &&
            b.left !== "Empty" && b.left !== "DoubleEmpty" &&
            b.left.color === Color.Black
        ) {
            return this.node(
                Color.Black,
                this.balance(
                    Color.Black,
                    this.node(Color.Red, this.node(Color.Black, a.left, a.key, a.value, a.right), y, yVal, b.left.left),
                    b.left.key,
                    b.left.value,
                    b.left.right
                ),
                b.key,
                b.value,
                b.right
            );
        }

        if (
            color === Color.Black &&
            a === "DoubleEmpty" &&
            b !== "Empty" && b !== "DoubleEmpty" &&
            b.color === Color.Red &&
            b.left !== "Empty" && b.left !== "DoubleEmpty" &&
            b.left.color === Color.Black
        ) {
            return this.node(
                Color.Black,
                this.balance(
                    Color.Black,
                    this.node(Color.Red, "Empty", y, yVal, b.left.left),
                    b.left.key,
                    b.left.value,
                    b.left.right
                ),
                b.key,
                b.value,
                b.right
            );
        }

        if (
            color === Color.Black &&
            a !== "Empty" && a !== "DoubleEmpty" &&
            a.color === Color.Red &&
            a.right !== "Empty" && a.right !== "DoubleEmpty" &&
            a.right.color === Color.Black &&
            b !== "Empty" && b !== "DoubleEmpty" &&
            b.color === Color.DoubleBlack
        ) {
            return this.node(
                Color.Black,
                a.left,
                a.key,
                a.value,
                this.balance(
                    Color.Black,
                    a.right.left,
                    a.right.key,
                    a.right.value,
                    this.node(Color.Red, a.right.right, y, yVal, this.node(Color.Black, b.left, b.key, b.value, b.right))
                )
            );
        }

        if (
            color === Color.Black &&
            a !== "Empty" && a !== "DoubleEmpty" &&
            a.color === Color.Red &&
            a.right !== "Empty" && a.right !== "DoubleEmpty" &&
            a.right.color === Color.Black &&
            b === "DoubleEmpty"
        ) {
            return this.node(
                Color.Black,
                a.left,
                a.key,
                a.value,
                this.balance(
                    Color.Black,
                    a.right.left,
                    a.right.key,
                    a.right.value,
                    this.node(Color.Red, a.right.right, y, yVal, "Empty")
                )
            );
        }

        // Default case
        return this.node(color, a, y, yVal, b);
    }

    private minDel(node: Tree<T>): [string, T, Tree<T>] {
        if (node === "Empty" || node === "DoubleEmpty") {
            throw new Error("minDel called on empty tree");
        }

        // Red leaf
        if (node.color === Color.Red && node.left === "Empty" && node.right === "Empty") {
            return [node.key, node.value, "Empty"];
        }

        // Black leaf
        if (node.color === Color.Black && node.left === "Empty" && node.right === "Empty") {
            return [node.key, node.value, "DoubleEmpty"];
        }

        // Black node with single Red right child
        if (
            node.color === Color.Black &&
            node.left === "Empty" &&
            node.right !== "Empty" && node.right !== "DoubleEmpty" &&
            node.right.color === Color.Red &&
            node.right.left === "Empty" &&
            node.right.right === "Empty"
        ) {
            return [node.key, node.value, this.node(Color.Black, "Empty", node.right.key, node.right.value, "Empty")];
        }

        const [key, val, a] = this.minDel(node.left);
        return [key, val, this.rotate(node.color, a, node.key, node.value, node.right)];
    }

    private redden(tree: Tree<T>): Tree<T> {
        if (tree === "Empty" || tree === "DoubleEmpty") {
            return tree;
        }

        if (
            tree.color === Color.Black &&
            tree.left !== "Empty" && tree.left !== "DoubleEmpty" &&
            tree.left.color === Color.Black &&
            tree.right !== "Empty" && tree.right !== "DoubleEmpty" &&
            tree.right.color === Color.Black
        ) {
            return this.node(
                Color.Red,
                tree.left,
                tree.key,
                tree.value,
                tree.right
            );
        }

        return tree;
    }

    private del(tree: Tree<T>, key: string): Tree<T> {
        if (tree === "Empty") {
            return "Empty";
        }

        if (tree === "DoubleEmpty") {
            return "DoubleEmpty";
        }

        const x = tree.key;

        // Red leaf
        if (tree.color === Color.Red && tree.left === "Empty" && tree.right === "Empty") {
            if (key === x) return "Empty";
            return tree;
        }

        // Black leaf
        if (tree.color === Color.Black && tree.left === "Empty" && tree.right === "Empty") {
            if (key === x) return "DoubleEmpty";
            return tree;
        }

        // Black node with Red left child leaf
        if (
            tree.color === Color.Black &&
            tree.left !== "Empty" && tree.left !== "DoubleEmpty" &&
            tree.left.color === Color.Red &&
            tree.left.left === "Empty" &&
            tree.left.right === "Empty" &&
            tree.right === "Empty"
        ) {
            if (key < tree.key) {
                return this.node(Color.Black, this.del(tree.left, key), tree.key, tree.value, "Empty");
            } else if (key === tree.key) {
                return this.node(Color.Black, "Empty", tree.left.key, tree.left.value, "Empty");
            } else {
                return tree;
            }
        }

        // Recursive cases
        if (key < x) {
            return this.rotate(tree.color, this.del(tree.left, key), x, tree.value, tree.right);
        } else if (key === x) {
            const [keyPrime, valPrime, bPrime] = this.minDel(tree.right);
            return this.rotate(tree.color, tree.left, keyPrime, valPrime, bPrime);
        } else {
            return this.rotate(tree.color, tree.left, x, tree.value, this.del(tree.right, key));
        }
    }

    delete(key: string): void {
        this.root = this.fixRoot(this.del(this.redden(this.root), key));
    }

    private fixRoot(tree: Tree<T>): Tree<T> {
        // DoubleEmpty becomes Empty
        if (tree === "DoubleEmpty") return "Empty";

        // Empty stays Empty
        if (tree === "Empty") return tree;

        // DoubleBlack → Black, Red → Black, Black → Black
        return { ...tree, color: Color.Black };
    }

    private _search(tree: Tree<T>, key: string): T | null {
        if (tree === "Empty" || tree === "DoubleEmpty") {
            return null;
        }

        const x = tree.key;

        if (key === x) {
            return tree.value;
        } else if (key < x) {
            return this._search(tree.left, key);
        } else {
            return this._search(tree.right, key);
        }
    }

    search(key: string): T | null {
        return this._search(this.root, key);
    }

    display(): void {
        if (this.root === "Empty") {
            console.log("Empty tree");
            return;
        }
        if (this.root === "DoubleEmpty") {
            console.log("Double empty tree");
            return;
        }
        console.log("Red-Black Tree:");
        this._display(this.root, "", true);
    }

    private _display(tree: Tree<T>, prefix: string, isLast: boolean): void {
        if (tree === "Empty" || tree === "DoubleEmpty") {
            return;
        }

        const colorStr = tree.color === Color.Red ? "🔴" :
                        tree.color === Color.Black ? "⚫" : "⚫⚫";

        console.log(
            prefix +
            (isLast ? "└─ " : "├─ ") +
            `${tree.key}: ${JSON.stringify(tree.value)} ${colorStr}`
        );

        const newPrefix = prefix + (isLast ? "   " : "│  ");

        if (tree.left !== "Empty" && tree.left !== "DoubleEmpty" &&
            tree.right !== "Empty" && tree.right !== "DoubleEmpty") {
            this._display(tree.left, newPrefix, false);
            this._display(tree.right, newPrefix, true);
        } else if (tree.left !== "Empty" && tree.left !== "DoubleEmpty") {
            this._display(tree.left, newPrefix, true);
        } else if (tree.right !== "Empty" && tree.right !== "DoubleEmpty") {
            this._display(tree.right, newPrefix, true);
        }
    }
}

import { SinglyLinkedList } from "./singly_linked_list";

const DJB2_HASH = 5381;
const HASH_SIZE = 100;

/**
 * Computes the djb2 hash of a given string.
 */
function djb2Hash(str: string): number {
    let hash = DJB2_HASH; // Initial hash value
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 33) ^ str.charCodeAt(i); // Hashing logic
    }
    return hash >>> 0; // Ensure a positive integer
}

type Item<T> = {
    key: string;
    value: T;
}

class HashNode<T> {
    list: SinglyLinkedList<Item<T>>;

    constructor(key: string, value: T) {
        this.list = new SinglyLinkedList((item1, item2) => item1.key === item2.key);
        this.list.append({ key, value });
    }
}

export class HashTable<T> {
    table: HashNode<T>[]

    constructor() {
        this.table = new Array(HASH_SIZE).fill(null);
    }

    display(): void {
        console.log("Hash Table:");
        let isEmpty = true;

        for (let i = 0; i < this.table.length; i++) {
            const bucket = this.table[i];
            if (bucket && bucket.list.size > 0) {
                isEmpty = false;
                const items: string[] = [];
                let current = bucket.list.head;

                while (current) {
                    items.push(`{ key: "${current.value.key}", value: ${JSON.stringify(current.value.value)} }`);
                    current = current.next;
                }

                console.log(`  [${i}]: ${items.join(" -> ")}`);
            }
        }

        if (isEmpty) {
            console.log("  (empty)");
        }
    }

    get(key: string): T | null {
        // Hash array index
        const hashKey = djb2Hash(key) % HASH_SIZE; 

        const bucket = this.table[hashKey];
        if (!bucket) {
            return null;
        } 
        const head = bucket.list.head;
        if (!head || bucket.list.size <= 0) {
            return null;
        }

        const item = bucket.list.search({
            key,
            // Dirty hack: value doesn't matter, since we're checking only the key
            // Ideal solution: implement a key-based linked list
            value: head.value.value,
        });
        return item?.value ?? null;
    }

    set(key: string, value: T): void {
        // Hash array index
        const hashKey = djb2Hash(key) % HASH_SIZE;

        const bucket = this.table[hashKey];
        if (!bucket) {
            const node = new HashNode(key, value);
            this.table[hashKey] = node;
            return;
        }

        const bucketList = bucket.list;
        const currentValue = this.get(key);
        if (currentValue !== null) {
            bucketList.remove({
                key,
                value: currentValue
            });
        }
        bucketList.append({
            key,
            value
        });
    }

    delete(key: string): void {
        const value = this.get(key); 
        if (value === null) {
            return;
        }

        // Hash array index
        const hashKey = djb2Hash(key) % HASH_SIZE;

        const bucket = this.table[hashKey];
        if (!bucket) {
            return;
        }
        const head = bucket.list.head;
        if (!head || bucket.list.size <= 0) {
            return;
        }

        bucket.list.remove({
            key,
            // Dirty hack: value doesn't matter, since we're checking only the key
            // Ideal solution: implement a key-based linked list
            value: head.value.value,
        })
    }
}

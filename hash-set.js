class HashSet {
  constructor() {
    this.LOAD_FACTOR = 0.75;
    this.buckets = new Array(16).fill(null);
    this.capacity = this.buckets.length;
    this.resizeAt = this.capacity * this.LOAD_FACTOR;
    this.count = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode;
  }

  set(key) {
    const hashKey = this.hash(key) % this.capacity;

    // case: bucket is empty, add new node
    if (!this.buckets[hashKey]) {
      this.buckets[hashKey] = { key: key, next: null };
      this.count++;
      this.resize();
      return;
    }

    // case: first key is same as new key, return
    if (this.buckets[hashKey].key === key) return;

    // case: iterate till last node and add new node
    let curr = this.buckets[hashKey];
    while (curr.next !== null) {
      curr = curr.next;
      // key is already inside bucket
      if (curr.key === key) return;
    }

    curr.next = { key: key, next: null };
    this.count++;
    this.resize();
  }

  get(key) {
    const hashKey = this.hash(key) % this.capacity;
    let curr = this.buckets[hashKey];
    while (curr !== null) {
      if (curr.key === key) {
        return key;
      }
      curr = curr.next;
    }

    return undefined;
  }

  has(key) {
    const hashKey = this.hash(key) % this.capacity;
    let curr = this.buckets[hashKey];

    while (curr !== null) {
      if (curr.key === key) {
        return true;
      }
      curr = curr.next;
    }
    return false;
  }

  remove(key) {
    const hashKey = this.hash(key) % this.capacity;
    let curr = this.buckets[hashKey];
    // case: bucket is empty
    if (!curr) return false;

    // case: check if head node needs to be removed
    if (curr.key === key) {
      this.buckets[hashKey] = curr.next;
      this.count--;
      return true;
    }

    // case: search if node in between or end needs to be removed
    let prev = null;
    let next = curr.next;
    while (curr !== null) {
      if (curr.key === key) {
        prev.next = next;
        this.count--;
        return true;
      }

      if (next === null) {
        break;
      }
      prev = curr;
      curr = next;
      next = next.next;
    }
    return false;
  }

  length() {
    return this.count;
  }

  clear() {
    this.buckets = new Array(16).fill(null);
    this.capacity = this.buckets.length;
    this.resizeAt = this.capacity * this.LOAD_FACTOR;
    this.count = 0;
  }

  keys() {
    const keys = [];
    for (let i = 0; i < this.capacity; i++) {
      let curr = this.buckets[i];
      while (curr != null) {
        keys.push(curr.key);
        curr = curr.next;
      }
    }
    return keys;
  }

  entries() {
    const entries = [];
    for (let i = 0; i < this.capacity; i++) {
      let curr = this.buckets[i];

      while (curr !== null) {
        entries.push(curr.key);
        curr = curr.next;
      }
    }
    return entries;
  }

  resize() {
    if (this.count > this.resizeAt) {
      const oldData = this.entries();
      this.capacity *= 2;
      this.resizeAt = this.capacity * this.LOAD_FACTOR;
      this.count = 0;
      this.buckets = new Array(this.capacity).fill(null);
      oldData.forEach((key) => {
        this.set(key);
      });
    }
  }

  // helper function for debugging
  printBuckets() {
    for (let i = 0; i < this.capacity; i++) {
      let output = `Bucket ${i}: `;
      let curr = this.buckets[i];
      if (curr === null) {
        output += curr;
      }
      while (curr !== null) {
        output += `(${curr.key})`;
        if (curr.next !== null) {
          output += " -> ";
        }
        curr = curr.next;
      }
      output += "\n";
      console.log(output);
    }
  }

  // helper function for debugging
  printBucket(key) {
    const hashKey = this.hash(key) % this.capacity;
    let curr = this.buckets[hashKey];
    let output = "Bucket ";
    if (!curr) {
      output += "not found.";
    } else {
      output += `${hashKey}: `;
    }

    while (curr !== null) {
      output += `(${curr.key})`;
      if (curr.next !== null) {
        output += " -> ";
      }
      curr = curr.next;
    }
    output += "\n";
    console.log(output);
  }
}

const test = new HashSet();
test.set("apple");
test.set("banana");
test.set("carrot");
test.set("dog");
test.set("elephant");
test.set("frog");
test.set("grape");
test.set("hat");
test.set("ice cream");
test.set("jacket");
test.set("kite");
test.set("lion");
test.set("moon");

console.log(test.get("jacket"));
console.log(test.get("Jacket"));
console.log(test.has("apple"));
console.log(test.has("moon"));
console.log(test.has("car"));
console.log(test.length());
console.log(test.remove("ice cream"));
console.log(test.has("ice cream"));
console.log(test.length());
console.log(test.keys());
console.log(test.entries());
test.clear();
console.log(test.length());

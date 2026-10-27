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
//console.log(test.buckets);
//console.log(test.count);

//test.printBuckets();
test.printBucket("dog");
test.printBucket("hello");

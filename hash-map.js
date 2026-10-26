const HashMap = () => {
  const LOAD_FACTOR = 0.75;
  let buckets = new Array(16).fill(null);
  let capacity = buckets.length; // length of the array
  let resizeAt = capacity * LOAD_FACTOR; // if entries surpass this number, resize
  let count = 0; // counts total number of stored keys

  const hash = (key) => {
    let hashCode = 0;

    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  };

  const set = (key, value) => {
    const hashKey = hash(key) % capacity;
    // case: "null": create new node and add, raise count
    if (!buckets[hashKey]) {
      buckets[hashKey] = { key: key, value: value, next: null };
      count++;
      return;
    }
    // case: bucket not empty, first element has same key
    if (buckets[hashKey].key === key) {
      buckets[hashKey].value = value;
      return;
    }
    // case: bucket is not empty and first key was not equal new key
    let curr = buckets[hashKey];
    // iterate over nodes in bucket
    while (curr.next !== null) {
      if (curr.key === key) {
        // key is found stop loop
        break;
      }
      curr = curr.next;
    }
    if (curr.key === key) {
      curr.value = value;
      return;
    }
    curr.next = { key: key, value: value, next: null };
    count++;
  };

  const get = (key) => {
    const hashKey = hash(key) % capacity;
    let curr = buckets[hashKey];
    while (curr !== null) {
      if (curr.key === key) {
        return curr.value;
      }
      curr = curr.next;
    }
    return undefined;
  };

  const has = (key) => {
    const hashKey = hash(key) % capacity;
    let curr = buckets[hashKey];
    while (curr !== null) {
      if (curr.key === key) {
        return true;
      }
      curr = curr.next;
    }
    return false;
  };

  const remove = (key) => {
    const hashKey = hash(key) % capacity;
    let curr = buckets[hashKey];
    // case: bucket is empty
    if (!curr) return false;

    // case: check if head node needs to be removed
    if (curr.key === key) {
      buckets[hashKey] = curr.next;
      count--;
      return true;
    }
    // case: search if node in between or end needs to be removed
    let prev = null;
    let next = curr.next;
    while (curr != null) {
      // if key is found
      if (curr.key === key) {
        prev.next = next;
        count--;
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
  };

  // returns the number of stored keys
  const length = () => {
    return count;
  };

  const clear = () => {
    buckets = new Array(16).fill(null);
    capacity = buckets.length;
    resizeAt = capacity * LOAD_FACTOR;
    count = 0;
  };

  // print all buckets
  const printAllBuckets = () => {
    for (let i = 0; i < capacity; i++) {
      console.log(`Bucket ${i}:`);
      if (buckets[i] === null) {
        console.log(buckets[i]);
        console.log();
        continue;
      }
      let curr = buckets[i];
      let output = "";
      do {
        output += `(${curr.key}: ${curr.value})`;
        curr = curr.next;
        if (curr !== null) {
          output += " -> ";
        }
      } while (curr !== null);
      console.log(output);
      console.log();
    }
  };

  // print one specific bucket
  const printBucket = (key) => {
    const hashKey = hash(key) % capacity;
    let curr = buckets[hashKey];
    if (!curr) {
      console.log("Bucket is empty.");
      return;
    }
    let output = "";
    while (curr !== null) {
      output += `( ${curr.key}: ${curr.value} )`;
      if (curr.next !== null) {
        output += " -> ";
      }
      curr = curr.next;
    }
    console.log(output);
  };

  //  returns an array that contains each key-value pair in their own arrays
  const entries = () => {
    const entries = [];
    // iterate over all buckets
    for (let i = 0; i < capacity; i++) {
      let curr = buckets[i];
      // case: skip buckets that are empty
      if (!curr) {
        continue;
      }
      // case: iterate over every node inside bucket
      while (curr !== null) {
        entries.push([curr.key, curr.value]);
        curr = curr.next;
      }
    }
    return entries;
  };

  return {
    set,
    get,
    has,
    remove,
    length,
    clear,
    entries,
    printAllBuckets,
    printBucket,
  };
};

const test = HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

test.set("a", "first");
test.set("ab", "second");
test.set("abb", "third");
test.set("q", "fourth");

//test.printAllBuckets();
//test.printBucket("ab");

console.log(test.entries());
console.log(test.length());

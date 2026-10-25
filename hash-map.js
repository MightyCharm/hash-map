const HashMap = () => {
  const LOAD_FACTOR = 0.75;
  const buckets = new Array(16).fill(null);
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

  return { set, printAllBuckets };
};

// 1. 2. 2. 3.
const test = HashMap();

// same bucket
test.set("a", "first");
test.set("ab", "second");
test.set("abb", "third");
test.set("a", "new first");
test.printAllBuckets();
//====================
//====================
//====================
/*
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
*/

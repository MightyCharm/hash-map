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
}

const test = new HashSet();
console.log(test.LOAD_FACTOR);
console.log(test.buckets);
console.log(test.capacity);
console.log(test.resizeAt);
console.log(test.hash("apple") % test.capacity);

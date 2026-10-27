class HashSet {
  constructor() {
    this.LOAD_FACTOR = 0.75;
    this.buckets = new Array(16).fill(null);
    this.capacity = this.buckets.length;
    this.resizeAt = this.capacity * this.LOAD_FACTOR;
    this.count = 0;
  }
}

const test = new HashSet();
console.log(test.LOAD_FACTOR);
console.log(test.buckets);
console.log(test.capacity);
console.log(test.resizeAt);

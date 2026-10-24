const HashMap = () => {
  const LOAD_FACTOR = 0.75;
  const buckets = new Array(16).fill(null);
  let capacity = buckets.length;
  let count = 0;

  const hash = (key) => {
    let hashCode = 0;

    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  };

  return {};
};

const test = HashMap();

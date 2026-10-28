# Project: HashMap (The Odin Project: JavaScript Course)

I wrote a **hash-map** data structure built from an array where each index represents a **bucket** and contains either null or a simple version of a **linked list**.
I also included the extra work and created a **hash-set**.

This HashMap data structure allows these actions:

- **set()** - insert or overwrite key-value pair
- **get()** - use key to return value
- **has()** - use key to return boolean, true if present, false if not
- **remove()** - remove key-value pair
- **length()** - shows number of stored keys
- **clear()** - removes all entries
- **keys()** - returns all keys
- **values()** - returns all values
- **entries()** - returns all key-value pairs

This project, the combination of an array and linked lists was very interesting. I tried my best to create something working. Each method by itself was pretty straightforward, the hash method was given from Odin Project.

Based on [The Odin Project](https://www.theodinproject.com/lessons/javascript-hashmap) assignment.

## Run

```
node hash-map.js
node hash-set.js
```

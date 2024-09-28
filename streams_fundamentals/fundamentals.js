// Streams -> readable, writable, duplex, transform

import { Readable, Transform, Writable } from "node:stream";

// Readable - keeps reading data on demand
class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buff = Buffer.from(String(i));
        this.push(buff);
      }
    }, 1000);
  }
}

// Transform - manipulate data in stream

class InverseNumberStream extends Transform {
  // chunk is a Buffer and the entry data
  // callback is a function that must be called at the end to finish the stream
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    callback(null, Buffer.from(String(transformed)));
  }
}

// Writable - return data to client
class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

// Pipes hold the streams connections
new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream());

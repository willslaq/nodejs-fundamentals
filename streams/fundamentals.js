// Streams -> readable, writable, duplex, transform

import { Readable } from "node:stream";

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

new OneToHundredStream().pipe(process.stdout);

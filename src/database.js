import fs from "node:fs/promises";

const databasePath = new URL("../database.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    return fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table, search) {
    let data = this.#database[table] ?? [];

    if (search) {
      if (search.id) {
        data = data.filter((row) => row.id === search.id);
      } else {
        data = data.filter((row) => {
          return Object.entries(search).some(([key, value]) => {
            return row[key].toLowerCase().includes(value.toLowerCase());
          });
        });
      }
    }

    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }

  update(table, id, data) {
    this.#database[table] = this.#database[table].map((row) => {
      if (row.id === id) {
        row = { id, ...data };
      }

      return row;
    });

    this.#persist();
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    }
  }
}

import { parse } from "csv-parse";
import fs from "node:fs";

const csvPath = new URL("../../csv/tasks.csv", import.meta.url);

const stream = fs.createReadStream(csvPath);

export async function importFromCSV() {
  const lines = stream.pipe(
    parse({
      skip_empty_lines: true,
      delimiter: ",",
      from_line: 2,
    })
  );

  for await (const line of lines) {
    const [title, description] = line;

    await fetch("http://localhost:3333/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
  }
}

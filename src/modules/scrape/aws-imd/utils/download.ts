import { customAlphabet } from "nanoid";
import os from "os";
import path from "path";
import child from "child_process";
import fs from "fs";

export const download = async (urls: string[]): Promise<string[]> => {
  const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz", 21);
  const filepaths: string[] = [];

  return new Promise<string[]>((resolve, reject) => {
    let command = "curl --parallel --silent";

    for (let i = 0; i < urls.length; i++) {
      const cat_code = new URL(urls[i]).searchParams.get("a");
      const filepath = path.join(os.tmpdir(), `${cat_code}--` + nanoid());

      filepaths.push(filepath);
      command += ` "${urls[i]}" -o ${filepath} `;
    }

    fs.writeFileSync("/tmp/command.sh", command, { encoding: "utf-8" });

    const sub = child.exec("bash /tmp/command.sh");
    sub.on("close", () => {
      fs.rmSync("/tmp/command.sh");
      resolve(filepaths);
    });
    sub.on("error", (err) => reject(err));
  });
};

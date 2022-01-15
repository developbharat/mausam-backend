import fs from "fs";
import path from "path";

export const init_schedules = () => {
  const filespath = path.join(__dirname, "files");
  const files = fs.readdirSync(filespath, { encoding: "utf-8" });
  files.forEach((filename) => require(path.join(filespath, filename)));
};

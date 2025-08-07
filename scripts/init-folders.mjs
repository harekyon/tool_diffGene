import fs from "fs-extra";
import path from "path";

const dirs = ["./diffTargetNew", "./diffTargetOld", "./exports"];

for (const dir of dirs) {
  fs.ensureDirSync(dir);
  // fs.ensureFileSync(path.join(dir, ".gitkeep"));
}

console.log("📁 初期フォルダ作成完了: diffTargetNew, diffTargetOld, exports");

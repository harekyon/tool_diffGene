// import fs from "fs-extra";
// import path from "path";
// import { fileURLToPath } from "url";
// import dircompare from "dir-compare";
// import archiver from "archiver";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // 差分名をコマンドライン引数から取得
// const argSuffix = process.argv[2] ? `_${process.argv[2]}` : "";

// // フォルダパス
// const newDir = path.resolve(__dirname, "../diffTarget/new");
// const oldDir = path.resolve(__dirname, "../diffTarget/old");
// const diffOutputDir = path.resolve(__dirname, "../diff-output");
// const exportDir = path.resolve(__dirname, "../exports");

// // タイムスタンプ作成
// const now = new Date();
// const yy = String(now.getFullYear()).slice(-2);
// const MM = String(now.getMonth() + 1).padStart(2, "0");
// const dd = String(now.getDate()).padStart(2, "0");
// const HH = String(now.getHours()).padStart(2, "0");
// const mm = String(now.getMinutes()).padStart(2, "0");
// const timestamp = `${MM}${dd}${HH}${mm}${argSuffix}`;
// const zipOutputDir = path.join(exportDir, timestamp); // exports/2504...

// // 出力フォルダを作成
// await fs.remove(zipOutputDir); // 既存のフォルダを削除して新しく作成
// await fs.ensureDir(zipOutputDir); // exports/2504... フォルダを作成

// // 差分処理
// const result = await dircompare.compare(oldDir, newDir, {
//   compareContent: true,
//   skipSymlinks: true,
//   ignoreLineEnding: true,
//   ignoreWhiteSpaces: true,
// });

// // 差分ファイルをコピー
// for (const entry of result.diffSet) {
//   const state = entry.state;
//   const relative = path.join(entry.relativePath, entry.name2 || entry.name1);

//   if (state === "distinct" || state === "right") {
//     const src = path.join(entry.path2, entry.name2);
//     const dest = path.join(diffOutputDir, relative);
//     await fs.ensureDir(path.dirname(dest));
//     await fs.copy(src, dest);
//     console.log(`差分検出: ${relative}`);
//   }
// }

// // DIFF zipファイルの作成
// const diffZipPath = path.join(zipOutputDir, `DIFF${timestamp}.zip`);
// const outputDiff = fs.createWriteStream(diffZipPath);
// const archiveDiff = archiver("zip", { zlib: { level: 9 } });

// outputDiff.on("close", () => {
//   console.log(`✅ DIFF ZIP出力完了: ${diffZipPath}（${archiveDiff.pointer()} bytes）`);
// });

// archiveDiff.on("error", (err) => {
//   throw err;
// });

// archiveDiff.pipe(outputDiff);
// archiveDiff.directory(diffOutputDir, false);
// await archiveDiff.finalize();

// // All zipファイルの作成
// const allZipPath = path.join(zipOutputDir, `ALL${timestamp}.zip`);
// const outputAll = fs.createWriteStream(allZipPath);
// const archiveAll = archiver("zip", { zlib: { level: 9 } });

// outputAll.on("close", () => {
//   console.log(`✅ All ZIP出力完了: ${allZipPath}（${archiveAll.pointer()} bytes）`);
// });

// archiveAll.on("error", (err) => {
//   throw err;
// });

// archiveAll.pipe(outputAll);

// // newDir の内容を All ZIP に追加
// archiveAll.directory(newDir, "newDir");
// await archiveAll.finalize();

// // 最後に diffOutputDir を削除
// await fs.remove(diffOutputDir);

import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import dircompare from "dir-compare";
import archiver from "archiver";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 差分名をコマンドライン引数から取得
const argSuffix = process.argv[2] ? `_${process.argv[2]}` : "";

// フォルダパス
const newDir = path.resolve(__dirname, "../diffTarget/new");
const oldDir = path.resolve(__dirname, "../diffTarget/old");
const diffOutputDir = path.resolve(__dirname, "../diff-output");
const exportDir = path.resolve(__dirname, "../exports");

// タイムスタンプ作成
const now = new Date();
const yy = String(now.getFullYear()).slice(-2); // "25"
const MM = String(now.getMonth() + 1).padStart(2, "0");
const dd = String(now.getDate()).padStart(2, "0");
const HH = String(now.getHours()).padStart(2, "0");
const mm = String(now.getMinutes()).padStart(2, "0");
const timestamp = `${yy}${MM}${dd}${HH}${mm}${argSuffix}`; // 例: "2504221023"
const zipOutputDir = path.join(exportDir, `EXPORT${timestamp}`); // 例: "EXPORT2504221023"

// 出力フォルダを作成
await fs.remove(zipOutputDir); // 既存のフォルダを削除して新しく作成
await fs.ensureDir(zipOutputDir); // EXPORT2504... フォルダを作成

// 差分処理
const result = await dircompare.compare(oldDir, newDir, {
  compareContent: true,
  skipSymlinks: true,
  ignoreLineEnding: true,
  ignoreWhiteSpaces: true,
});

// 差分ファイルをコピー
for (const entry of result.diffSet) {
  const state = entry.state;
  const relative = path.join(entry.relativePath, entry.name2 || entry.name1);

  if (state === "distinct" || state === "right") {
    const src = path.join(entry.path2, entry.name2);
    const dest = path.join(diffOutputDir, relative);
    await fs.ensureDir(path.dirname(dest));
    await fs.copy(src, dest);
    console.log(`差分検出: ${relative}`);
  }
}

// DIFF zipファイルの作成
const diffZipPath = path.join(zipOutputDir, `DIFF${timestamp}.zip`);
const outputDiff = fs.createWriteStream(diffZipPath);
const archiveDiff = archiver("zip", { zlib: { level: 9 } });

outputDiff.on("close", () => {
  console.log(`✅ DIFF ZIP出力完了: ${diffZipPath}（${archiveDiff.pointer()} bytes）`);
});

archiveDiff.on("error", (err) => {
  throw err;
});

archiveDiff.pipe(outputDiff);
archiveDiff.directory(diffOutputDir, false);
await archiveDiff.finalize();

// All zipファイルの作成
const allZipPath = path.join(zipOutputDir, `ALL${timestamp}.zip`);
const outputAll = fs.createWriteStream(allZipPath);
const archiveAll = archiver("zip", { zlib: { level: 9 } });

outputAll.on("close", () => {
  console.log(`✅ All ZIP出力完了: ${allZipPath}（${archiveAll.pointer()} bytes）`);
});

archiveAll.on("error", (err) => {
  throw err;
});

archiveAll.pipe(outputAll);

// newDir の内容を All ZIP に追加
archiveAll.directory(newDir, "newDir");
await archiveAll.finalize();

// 最後に diffOutputDir を削除
await fs.remove(diffOutputDir);

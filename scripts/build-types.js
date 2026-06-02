import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { spawnSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 读取共享配置
const buildConfig = JSON.parse(readFileSync(join(__dirname, "../build.config.json"), "utf-8"));

// 提取 entry 文件路径（去掉开头的 ./）
const entryFiles = buildConfig.entry.map((path) => path.replace(/^\.\//, ""));

console.log("Building types for entry files:", entryFiles);

// 构建 tsc 命令参数（不使用 --project，直接指定所有选项）
const args = [
  "--declaration",
  "--emitDeclarationOnly",
  "--outDir",
  "dist",
  "--target",
  "es2021",
  "--module",
  "es2022",
  "--moduleResolution",
  "bundler",
  "--esModuleInterop",
  "--strict",
  "--skipLibCheck",
  "--baseUrl",
  ".",
  "vite-env.d.ts",
  ...entryFiles,
];

console.log("Running: tsc", args.join(" "));

// 执行 tsc 命令
const result = spawnSync("tsc", args, {
  stdio: "inherit",
  shell: true,
  cwd: join(__dirname, ".."),
});

process.exit(result.status || 0);

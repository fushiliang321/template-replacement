import { readFileSync, writeFileSync, unlinkSync, readdirSync, statSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { spawnSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 递归删除目录中的 .d.ts 文件
function deleteDtsFiles(dir) {
  try {
    if (!existsSync(dir)) return;
    const files = readdirSync(dir);
    for (const file of files) {
      const filePath = join(dir, file);
      const stat = statSync(filePath);
      if (stat.isDirectory()) {
        deleteDtsFiles(filePath);
      } else if (file.endsWith(".d.ts")) {
        unlinkSync(filePath);
        console.log(`Deleted: ${filePath}`);
      }
    }
  } catch (e) {
    // 目录不存在，忽略
  }
}

// 读取共享配置
const buildConfig = JSON.parse(readFileSync(join(__dirname, "../build.config.json"), "utf-8"));

// 提取 entry 文件路径（去掉开头的 ./）
const entryFiles = buildConfig.map((path) => path.replace(/^\.\//, ""));
function build(entryFiles, distDir) {
  console.log("Building types for entry files:", entryFiles);

  // 删除旧的 .d.ts 文件（避免覆盖输入文件错误）
  console.log(`Cleaning .d.ts files in ${distDir}...`);
  deleteDtsFiles(distDir);

  // 创建临时 tsconfig 文件用于类型构建（放在项目根目录）
  const tsconfigPath = join(__dirname, `../tsconfig.types.json`);

  const tsconfigContent = {
    compilerOptions: {
      declaration: true,
      emitDeclarationOnly: true,
      outDir: distDir,
      target: "es2021",
      module: "es2022",
      moduleResolution: "node",
      esModuleInterop: true,
      strict: true,
      skipLibCheck: true,
      baseUrl: ".",
    },
    include: ["vite-env.d.ts", ...entryFiles],
  };

  writeFileSync(tsconfigPath, JSON.stringify(tsconfigContent, null, 2));

  const args = ["--project", tsconfigPath];

  console.log("Running: tsc", args.join(" "));

  const result = spawnSync("tsc", args, {
    stdio: "inherit",
    shell: true,
    cwd: join(__dirname, ".."),
  });

  unlinkSync(tsconfigPath);

  if (result.status) {
    process.exit(result.status);
  }
}

// 构建 dist 目录的类型
build(entryFiles, "dist");

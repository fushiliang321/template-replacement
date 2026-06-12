
import fs from "fs";
import zlib from "zlib";
import path from "path";
import { PluginOption } from "vite";

type wasmBase64PluginOptions = {
  algorithm?: "gzip" | "deflate" | "deflate-raw";
  level?: number;
  encoding?: "base64" | "binary";
};

// 将 WASM 文件转为压缩后的 Base64（需要 ?file 参数）
export function wasmBase64Plugin(options: wasmBase64PluginOptions = {}): PluginOption {
  const {
    algorithm = "gzip",
    level = 9,
    encoding = "base64",
  } = options;

  return {
    name: "vite-plugin-wasm-base64",
    enforce: "pre",
    resolveId(id: string) {
      // 处理 ?file 参数
      if (id.endsWith(".wasm?file")) {
        return id;
      }
    },
    async load(id: string) {
      // 只有带 ?file 参数的 WASM 文件才处理
      if (!id.endsWith(".wasm?file")) {
        return
      }
      // 移除 ?file 参数获取真实路径
      const wasmPath = id.replace("?file", "");

      // 使用 path.resolve 解析绝对路径
      const resolved = await this.resolve(wasmPath);
      const fullPath = resolved
        ? resolved.id
        : path.join(process.cwd(), wasmPath);

      const wasmBuffer = fs.readFileSync(fullPath);

      // 根据算法选择压缩方式
      let compressed;
      switch (algorithm) {
        case "deflate":
          compressed = zlib.deflateSync(wasmBuffer, { level });
          break;
        case "deflate-raw":
          compressed = zlib.deflateRawSync(wasmBuffer, { level });
          break;
        case "gzip":
        default:
          compressed = zlib.gzipSync(wasmBuffer, { level });
          break;
      }

      // 根据编码方式选择存储格式
      let encodedData;
      let decoderFunction;
      if (encoding === "binary") {
        // 二进制字符串：使用 JSON.stringify 转义
        const binaryString = compressed.toString("binary");
        const escapedData = JSON.stringify(binaryString);
        decoderFunction = "binaryStringToUint8Array";
        // JSON.stringify 返回的字符串已经包含引号
        encodedData = escapedData;
      } else {
        // base64：兼容性好，体积最小
        encodedData = compressed.toString("base64");
        decoderFunction = "base64ToUint8Array";
        // base64 用模板字符串包裹
        encodedData = `\`${encodedData}\``;
      }

      // 返回代码，数据只出现一次
      return {
        code: `
// 自动生成的解压函数
// 二进制字符串解码（使用 JSON.stringify 转义）
function binaryStringToUint8Array(binaryString) {
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

// base64 解码（兼容性好）
function base64ToUint8Array(base64) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

async function decompress(compressed) {
    const decompressionStream = new DecompressionStream('${algorithm}');
    const writer = decompressionStream.writable.getWriter();
    const reader = decompressionStream.readable.getReader();

    writer.write(compressed);
    writer.close();

    const chunks = [];
    let result;
    while (!(result = await reader.read()).done) {
        chunks.push(result.value);
    }

    const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
    const decompressed = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
        decompressed.set(chunk, offset);
        offset += chunk.length;
    }

    return decompressed;
}

let wasmEncoded = ${encodedData};
let wasmUint8ArrayCache = null;

async function getWasmArrayBuffer() {
    const uint8Array = await getWasmUint8Array();
    return uint8Array.buffer;
}

async function getWasmFile(fileName = 'module.wasm', mimeType = 'application/wasm') {
    const uint8Array = await getWasmUint8Array();
    return new File([uint8Array], fileName, { type: mimeType });
}

async function getWasmUint8Array() {
    if (wasmUint8ArrayCache) {
        return wasmUint8ArrayCache;
    }
    const compressed = ${decoderFunction}(wasmEncoded);
    wasmEncoded = undefined;
    wasmUint8ArrayCache = await decompress(compressed);
    return wasmUint8ArrayCache;
}

export { getWasmArrayBuffer, getWasmFile, getWasmUint8Array };
export default getWasmFile;
`,
        map: null,
      };
    },
  };
}

import http from "http";
import https from "https";
import sizeOf from "image-size";

type getSizeOfResult = {
  width: number;
  height: number;
};

export const getSizeOf = (url: string): Promise<getSizeOfResult> =>
  new Promise((resolve, reject) => {
    const protocol = url.split(":")[0];

    const httpsOrHttp = protocol === "http" ? http : https;

    const req = httpsOrHttp.get(url, (res) => {
      if (res.statusCode && (res.statusCode < 200 || res.statusCode >= 300)) {
        reject(new Error(`getSizeOf(urlImage) statusCode=${res.statusCode}`));
      }

      const chunks: never[] = [];
      let size = {};
      res
        .on("data", (chunk) => {
          chunks.push(chunk as never);
        })
        .on("end", () => {
          try {
            const buffer = Buffer.concat(chunks);
            size = sizeOf(buffer);
          } catch (e) {
            reject(e);
          }
          resolve(size as getSizeOfResult);
        });
    });

    req.on("error", (e) => {
      reject(e.message);
    });
    req.end();
  });

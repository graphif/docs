"use client";

import Tree from "@/components/tree";
import { Decoder } from "@msgpack/msgpack";
import { Uint8ArrayReader, Uint8ArrayWriter, ZipReader } from "@zip.js/zip.js";
import { Callout } from "fumadocs-ui/components/callout";
import mime from "mime";
import { useEffect, useState } from "react";

type Data = {
  stageObjects: {
    uuid: string;
    type: string;
    x: number;
    y: number;
  }[];
  attachments: {
    uuid: string;
    type: string;
  }[];
  rawStage: any[];
};

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    if (!file) return;
    (async () => {
      const data: Data = {
        stageObjects: [],
        attachments: [],
        rawStage: [],
      };
      const decoder = new Decoder();
      const reader = new ZipReader(new Uint8ArrayReader(await file.bytes()));
      const entries = await reader.getEntries();
      for (const entry of entries) {
        if (entry.directory) continue;
        if (entry.filename === "stage.msgpack") {
          const stageRawData = await entry.getData(new Uint8ArrayWriter());
          data.rawStage = decoder.decode(stageRawData) as any[];
          data.stageObjects = data.rawStage.map((it) => ({
            uuid: it.uuid,
            type: it._,
            x: it.position.x,
            y: it.position.y,
          }));
        } else if (entry.filename.startsWith("attachments/")) {
          const match = entry.filename
            .trim()
            .match(/^attachments\/([a-zA-Z0-9-]+)\.([a-zA-Z0-9]+)$/);
          if (!match) {
            console.warn("附件文件名不符合规范: %s", entry.filename);
            continue;
          }
          const uuid = match[1];
          const ext = match[2];
          const type = mime.getType(ext);
          data.attachments.push({
            uuid,
            type: type || "application/octet-stream",
          });
        }
      }
      setData(data);
    })();
  }, [file]);

  return (
    <div className="container my-16 flex flex-col items-start gap-2">
      <Callout type="warn">
        目前只支持 3.0 版本导出的 PRG
        文件，且仅解析了舞台对象和附件列表，其他数据均未解析。
      </Callout>
      <span>打开 PRG 文件</span>
      <input
        type="file"
        accept=".prg"
        className="rounded-xl border px-3 py-2"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0] || null;
          setFile(selectedFile);
        }}
      />
      {data && <DataView data={data} />}
    </div>
  );
}

function DataView({ data }: { data: Data }) {
  return (
    <div className="flex gap-4">
      <div className="prose">
        <table>
          <thead>
            <tr>
              <th>舞台对象</th>
              <th>类型</th>
              <th>X</th>
              <th>Y</th>
            </tr>
          </thead>
          <tbody>
            {data.stageObjects.map((obj, index) => (
              <tr key={index}>
                <td>{obj.uuid}</td>
                <td>{obj.type}</td>
                <td>{obj.x}</td>
                <td>{obj.y}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="prose">
        <table>
          <thead>
            <tr>
              <th>附件</th>
              <th>类型</th>
            </tr>
          </thead>
          <tbody>
            {data.attachments.map((obj, index) => (
              <tr key={index}>
                <td>{obj.uuid}</td>
                <td>{obj.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Tree obj={data.rawStage} />
    </div>
  );
}

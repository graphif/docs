"use client";

import { useState } from "react";

export default function AdvancedUserGroupEntry() {
  const [flag, setFlag] = useState("");

  function submitFlag() {
    try {
      if (!/^flag\{[0-9a-f]+\}$/.test(flag)) {
        throw new Error("Flag 格式错误");
      }
      const hexString = flag.slice(5, -1);
      const decrypted = decrypt(hexString);
      alert(`解密成功，结果为: ${decrypted.toString()}`);
    } catch (error) {
      alert(`解密失败: ${(error as Error).message}`);
    }
  }

  return (
    <div>
      <input
        value={flag}
        onChange={(e) => setFlag(e.target.value)}
        placeholder="flag{}"
        className="mr-2 rounded-xl border px-2 py-1"
      />
      <button className="rounded-xl border px-2 py-1" onClick={submitFlag}>
        提交
      </button>
    </div>
  );
}

const HEX_PATTERN = /^[0-9a-f]+$/;

const K_A = 0x9e3779b97f4a7c15n;
const K_B = 0x1f123bb5a1c67ffdn;
const K_C = 0x2545f4914f6cdd1dn;
const K_D = 0x94d049bb133111ebn;
const K_E = 0xf1357aea2e62a9c5n;

function zigZagDecode(value: bigint): bigint {
  const signBit = value & 1n;
  const magnitude = value >> 1n;
  return signBit === 0n ? magnitude : -(magnitude + 1n);
}

export function decrypt(payload: string): bigint {
  if (!HEX_PATTERN.test(payload)) {
    throw new TypeError(
      "decrypt expects a lowercase hex string (^[0-9a-f]+$).",
    );
  }

  let v = BigInt(`0x${payload}`);

  v -= K_E;
  if (v % K_D !== 0n) {
    throw new RangeError("Corrupted payload: K_D mismatch.");
  }
  v /= K_D;

  v ^= K_C;

  v -= K_B;
  if (v % K_A !== 0n) {
    throw new RangeError("Corrupted payload: K_A mismatch.");
  }
  v /= K_A;

  return zigZagDecode(v);
}

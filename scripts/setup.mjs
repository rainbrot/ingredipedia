// Creates .env from .env.example with a random admin passcode (never overwrites an existing .env).
import { randomBytes } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

if (existsSync(".env")) {
  console.log(".env already exists; leaving it unchanged.");
} else {
  const passcode = randomBytes(9).toString("base64url");
  const env = readFileSync(".env.example", "utf8").replace(/^ADMIN_PASSCODE=.*$/m, `ADMIN_PASSCODE=${passcode}`);
  writeFileSync(".env", env, { mode: 0o600 });
  console.log("Created .env with a random admin passcode (see ADMIN_PASSCODE in .env).");
}

// Creates .env from .env.example (never overwrites an existing .env). No secrets are required to run Ingredipedia.
import { copyFileSync, existsSync } from "node:fs";

if (existsSync(".env")) {
  console.log(".env already exists; leaving it unchanged.");
} else {
  copyFileSync(".env.example", ".env");
  console.log("Created .env. Every key in it is optional; see the comments for what each one adds.");
}

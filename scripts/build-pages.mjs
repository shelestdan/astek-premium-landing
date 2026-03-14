import { spawn } from "node:child_process";

const command = process.platform === "win32" ? "npm.cmd" : "npm";

const child = spawn(command, ["run", "build:pages:raw"], {
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    NEXT_PUBLIC_DEPLOY_TARGET: "github-pages",
  },
});

child.on("exit", (code) => {
  process.exit(code ?? 1);
});

child.on("error", (error) => {
  console.error(error);
  process.exit(1);
});

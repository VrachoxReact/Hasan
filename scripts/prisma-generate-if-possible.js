const { spawnSync } = require("node:child_process");

function run(cmd, args) {
  const result = spawnSync(cmd, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

// Prisma will validate required env vars in schema.
// On Vercel, POSTGRES_PRISMA_URL is available via the Postgres integration.
// Locally, you may not have DB configured during install (e.g. CI), so skip.
if (!process.env.POSTGRES_PRISMA_URL || !process.env.POSTGRES_URL_NON_POOLING) {
  console.log(
    "[postinstall] Skipping prisma generate (POSTGRES_PRISMA_URL / POSTGRES_URL_NON_POOLING not set)."
  );
  process.exit(0);
}

run("npx", ["prisma", "generate"]);

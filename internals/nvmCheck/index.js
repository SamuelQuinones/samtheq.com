const spawn = require("child_process").spawn;
const platform = require("os").platform;

const ACTUAL_OS = platform();

/** Helps Print Command Output */
const outputHelper = (color) => (data) => {
  const cols = {
    green: "\x1b[32m[SamTheQ]\x1b[0m:",
    yellow: "\x1b[33m[SamTheQ]\x1b[0m:",
  };
  const output = `${data}`.split("\n").filter((piece) => piece != "");
  output.forEach((piece) => {
    console.log(cols[color], piece);
  });
};
/** Helps Print Errors */
const errorHelper = (error) => {
  console.log(`\x1b[31m[ErrName]\x1b[0m: ${error.name}`);
  console.log(`\x1b[31m[ErrMsg]\x1b[0m: ${error.message}`);
};
/** Prints anytime the scriot ends */
const exitHelper = (code) => {
  console.log(`\x1b[33m[SamTheQ]\x1b[0m: Completed with exit code ${code}`);
  console.log();
};

//* ---- Main ---- *//
console.log();
console.log("SamTheQ NVM Helper Script");
console.log();

switch (ACTUAL_OS) {
  case "win32":
    console.log("no file yet");
    break;

  default:
    const unix = spawn("./internals/nvmCheck/unix.sh");
    unix.stdout.on("data", outputHelper("green"));
    unix.stderr.on("data", outputHelper("yellow"));
    unix.on("error", errorHelper);
    unix.on("close", exitHelper);
    break;
}

import { program as secrecy } from "commander";
import { randomBytes } from "crypto";
import { sign } from "jsonwebtoken";
import { open, close, write, createReadStream } from "fs";
import { join } from "path";
import { EOL } from "os";
import { glitch, rainbow } from "chalk-animation";
import { prompt } from "inquirer";
import * as chalk from "chalk";

secrecy
  .name("secrecy")
  .description("CLI to generate passwords and perform crypto operations")
  .version("1.0.0");

secrecy
  .option("-u, --user")
  .option("-p, --password <type>", "8")
  .option("-h, --hash <type>", `${genSalt()}`)
  .option("-jwt, --jsonwebtoken <type>", "secret");

secrecy.parse();

async function genSalt() {
  const random = await randomBytes(16).toString("hex");
  return random;
}

const options = secrecy.opts();

if (options.jsonwebtoken) {
  generateJWT(options.jsonwebtoken);
}

if (options.password) {
  generatePassword(parseInt(options.password));
}

if (options.user) {
  // Generate Username
  console.log("Generate Username");
  generateUsername();
}

if (options.hash) {
  generateHash();
}

async function generateJWT(secret: string) {
  // Read file if exists    console.log(payload);

  let data = "";
  const readStream = await createReadStream(join(__dirname, "payload.json"));
  readStream.on("error", (err) => {
    const animation = glitch("Check if a file payload.json exists");
    setTimeout(() => {
      animation.stop();
      process.exit(1);
    }, 4000);
  });
  readStream.on("data", (chunk) => {
    data += chunk;
  });
  readStream.on("close", () => {
    const payload = JSON.parse(data.toString());
    sign(payload, secret, { algorithm: "HS256" }, (err, token) => {
      if (err) throw Error("Some error occured");
      console.log("🔑 Your JWT is: " + token);
      // const animation = rainbow("🔑 Your JWT is: " + token);
      // setTimeout(() => {
      //   animation.stop();
      // }, 1000);
    });
  });
}

async function generateHash() {
  console.log("Generate JWT");
}
async function generateUsername() {
  console.log("Generate Username");
}
async function generatePassword(len: number) {
  const password = await randomBytes(len).toString("hex");
  let answer = await prompt([
    {
      type: "input",
      name: "identifier",
      message: "What word do you want to associate with this password?",
      default() {
        return "Date of Creation";
      },
    },
  ]);
  if (answer.identifier === "Date of Creation")
    answer.identifier = new Date().toDateString();
  open(join(__dirname, "../", "password.txt"), "a", 666, (e, id) => {
    write(id, `${answer.identifier}: ${password}` + EOL, null, "utf-8", () => {
      close(id, () => {
        const animation = glitch("🔑 saved to txt file");
        setTimeout(() => {
          animation.stop();
          console.log("🔑:", password);
          const newAnimation = rainbow("Advised to clear terminal", 0.5);
          setTimeout(() => {
            newAnimation.stop();
          }, 4000);
        }, 4000);
      });
    });
  });
}

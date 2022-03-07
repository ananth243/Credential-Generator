import { program as secrecy } from "commander";
import { randomBytes } from "crypto";
import { createWriteStream, existsSync } from "fs";

secrecy
  .name("secrecy")
  .description("CLI to generate passwords and perform crypto operations")
  .version("1.0.0");

secrecy
  .option("-u", "--user", "Generated a random username")
  .option("-p, --password", "Generates random password of default length 8")
  .option("-h", "-hash", "Generates a hash with random salt")
  .option(
    "-jwt",
    "--jsonwebtoken",
    "Generates a random jwt with a random secret"
  );

secrecy.parse(process.argv);

const options = secrecy.opts();

if (options.password) {
  generatePassword();
}

if (options.user) {
  // Generate Username
  generateUsername();
}

if (options.hash) {
  generateHash();
}

if (options.jwt) {
  generateJWT();
}

async function generateJWT() {
  console.log("Generate JWT");
}
async function generateHash() {
  console.log("Generate JWT");
}
async function generateUsername() {
  console.log("Generate Username");
}
async function generatePassword(len = 8) {
  const password = await randomBytes(len).toString("hex");
  if (existsSync("./password.txt")) {
    // Append password on new line
  } else {
    const writeStream = createWriteStream("password.txt");
    writeStream.write(password);
    writeStream.end();
  }
  console.log("Generated Password: ", password);
}

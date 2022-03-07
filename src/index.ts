import { program as secrecy } from "commander";

secrecy
  .name("secrecy")
  .description("CLI to generate passwords and perform crypto operations")
  .version("1.0.0");

secrecy
  .option("-u", "--user", "Generated a random username")
  .option("-p, --password", "Generates random password of default length 8")
  .option('-h','-hash','Generates a hash with random salt')
  .option('-jwt', '--jsonwebtoken', 'Generates a random jwt with a random secret');

  secrecy.parse(process.argv);

const options = secrecy.opts();

if (options.gen) {
  generatePassword();
}

if(options.user){
  // Generate Username
  generateUsername();
}

if(options.hash){
  generateHash();
}

if(options.jwt){
  generateJWT();
}

async function generateJWT(){
  console.log('Generate JWT');
}
async function generateHash(){
  console.log('Generate JWT');
  
}
async function generateUsername(){
  // Use GPT3
  console.log('Generate Username');
}
async function generatePassword(){
  console.log('Generate Password');
}
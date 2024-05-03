import { test, expect } from "@playwright/test";
import { encrypt, decrypt } from "../utils/CryptojsUtil";
import { encryptEnvFile } from "../utils/EncryptEnvFile";

test("Sample env test", async ({ page }) => {
  console.log(process.env.NODE_ENV);
  console.log(process.env.userid);
  console.log(process.env.password);
});

test("Sample encrypt test", async ({ page }) => {
  const plaintext = "Hello, Mars!";
  const encryptedText = encrypt(plaintext);
  console.log("SALT:", process.env.SALT);
  console.log("Encrypted:", encryptedText);
  const decryptedText = decrypt(encryptedText);
  console.log("Decrypted:", decryptedText);
  //encryptEnvFile();
});

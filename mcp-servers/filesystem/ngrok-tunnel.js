import ngrok from "ngrok";

const port = Number(process.env.PORT || 8787);
const authtoken = process.env.NGROK_AUTHTOKEN;

if (!authtoken) {
  throw new Error("Set NGROK_AUTHTOKEN before starting tunnel");
}

await ngrok.kill().catch(() => {});
await ngrok.authtoken(authtoken);
const url = await ngrok.connect({
  addr: port,
  proto: "http",
});

console.log(`ngrok tunnel ready: ${url}/mcp`);
console.log("Keep this process running while ChatGPT uses the app.");

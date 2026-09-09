// Local-only SMTP fixture. Never relays mail; keep on the dedicated QA network.
import net from "node:net";
import http from "node:http";

if (process.env.WERKCV_ISOLATED_QA !== "1") throw new Error("QA_ONLY");
const messages = [];
net.createServer((socket) => {
  socket.setTimeout(30000, () => socket.destroy());
  socket.write("220 localhost QA mail sink\r\n");
  let buffer = "";
  let data = false;
  let message = "";
  socket.on("error", () => {});
  socket.on("data", (chunk) => {
    buffer += chunk.toString("utf8");
    if (buffer.length + message.length > 1000000) return socket.destroy();
    let end;
    while ((end = buffer.indexOf("\r\n")) !== -1) {
      const line = buffer.slice(0, end);
      buffer = buffer.slice(end + 2);
      if (data) {
        if (line === ".") {
          messages.push(message);
          if (messages.length > 50) messages.shift();
          message = "";
          data = false;
          socket.write("250 Stored locally only\r\n");
        } else message += line + "\r\n";
      } else if (/^EHLO|^HELO/i.test(line)) {
        socket.write("250-localhost\r\n250 AUTH PLAIN\r\n");
      } else if (/^AUTH PLAIN/i.test(line)) {
        socket.write("235 QA authentication accepted\r\n");
      } else if (/^DATA$/i.test(line)) {
        data = true;
        socket.write("354 End with dot\r\n");
      } else if (/^QUIT$/i.test(line)) {
        socket.end("221 Bye\r\n");
      } else socket.write("250 OK\r\n");
    }
  });
}).listen(2525, "0.0.0.0");
http.createServer((request, response) => {
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("Content-Type", "application/json");
  if (request.method !== "GET" || request.url !== "/messages") {
    response.writeHead(404).end("{}");
    return;
  }
  response.end(JSON.stringify(messages));
}).listen(8025, "0.0.0.0");

import { exec } from "child_process";

function curlRequest(url, method = "GET") {
    return new Promise((resolve, reject) => {
        const command = `curl -s -X ${method} -w "\\n%{http_code}" "${url}"`;
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            try {
                const lines = stdout.trim().split("\n");
                const statusCode = Number(lines.pop() || 0);
                const body = lines.join("\n");

                let responseBody = null;
                if (body) {
                    try {
                        responseBody = JSON.parse(body);
                    } catch (e) {
                        responseBody = body;
                    }
                }

                resolve({
                    statusCode,
                    body: responseBody,
                    raw: body,
                    stderr
                });
            } catch (parseError) {
                reject(parseError);
            }
        });
    });
}

module.exports = {
    curlRequest
};

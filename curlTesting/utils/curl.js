const { exec } = require("child_process");

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

                const statusCode = Number(lines.pop());

                const body = lines.join("\n");

                const responseBody = body
                    ? JSON.parse(body)
                    : null;

                resolve({
                    statusCode,
                    body: responseBody
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
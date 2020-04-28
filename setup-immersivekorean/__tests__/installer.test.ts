import * as io from "@actions/io";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import * as installer from "../src/installer";

let toolDir: string;

describe("installer tests", () => {
    beforeAll(async () => {
        toolDir = path.join(
            __dirname,
            "runner",
            path.join(
                Math.random()
                    .toString(36)
                    .substring(7)
            ),
            "tools"
        );

        const tempDir = path.join(
            __dirname,
            "runner",
            path.join(
                Math.random()
                    .toString(36)
                    .substring(7)
            ),
            "temp"
        );

        await io.rmRF(toolDir);
        await io.rmRF(tempDir);

        process.env["RUNNER_TOOL_CACHE"] = toolDir;
        process.env["RUNNER_TEMP"] = tempDir;
    }, 100000);

    it("Installs specified version of kubectl", async () => {
        await installer.kubectl("1.16.2");
        const kubectlFile = path.join(toolDir, "kubectl", "1.16.2", os.arch());

        expect(fs.existsSync(`${kubectlFile}.complete`)).toBe(true);
    }, 100000);

    it("Installs specified version of gomplate", async () => {
        await installer.gomplate("3.6.0");
        const gomplateFile = path.join(toolDir, "gomplate", "3.6.0", os.arch());

        expect(fs.existsSync(`${gomplateFile}.complete`)).toBe(true);
    }, 100000);
});

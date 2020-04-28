import * as core from "@actions/core";
import * as installer from "./installer";

async function run(): Promise<void> {
    try {
        const kubectlVersion = core.getInput("kubectl");
        const gomplateVersion = core.getInput("gomplate");

        if (kubectlVersion) {
            await installer.kubectl(kubectlVersion);
        }

        if (gomplateVersion) {
            await installer.gomplate(gomplateVersion);
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();

import * as core from "@actions/core";
import * as tc from "@actions/tool-cache";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";
import * as semver from "semver";

const supportedOs = ["linux", "darwin"];
const supportedArch = ["x64"];

const osPlat: string = os.platform();
const osArch: string = os.arch();

export async function kubectl(version: string): Promise<void> {
    if (!supportedOs.includes(osPlat)) {
        throw new Error(`Unsupported OS "${osPlat}" for Kubectl.`);
    }

    if (!supportedArch.includes(osArch)) {
        throw new Error(`Unsupported architecture "${osArch}" for Kubectl.`);
    }

    let toolPath: string;
    toolPath = tc.find("kubectl", version);

    if (!toolPath) {
        const c = semver.clean(version) || "";

        if (!semver.valid(c)) {
            throw new Error(
                `Invalid Kubectl version "${version}" for platform ${osPlat} (${osArch}).`
            );
        }

        toolPath = await installKubectl(version);
    }

    fs.chmodSync(path.join(toolPath, "kubectl"), "755");

    core.addPath(toolPath);
}

async function installKubectl(version: string): Promise<string> {
    version = semver.clean(version) || "";

    const fileName = `v${version}`;
    const downloadUrl = `https://storage.googleapis.com/kubernetes-release/release/${fileName}/bin/${osPlat}/amd64/kubectl`;
    let downloadPath: string;

    try {
        downloadPath = await tc.downloadTool(downloadUrl);
    } catch (error) {
        throw error;
    }

    return await tc.cacheFile(downloadPath, "kubectl", "kubectl", version);
}

export async function gomplate(version: string): Promise<void> {
    if (!supportedOs.includes(osPlat)) {
        throw new Error(`Unsupported OS "${osPlat}" for Gomplate.`);
    }

    if (!supportedArch.includes(osArch)) {
        throw new Error(`Unsupported architecture "${osArch}" for Gomplate.`);
    }

    let toolPath: string;
    toolPath = tc.find("gomplate", version);

    if (!toolPath) {
        const c = semver.clean(version) || "";

        if (!semver.valid(c)) {
            throw new Error(
                `Invalid Gomplate version "${version}" for platform ${osPlat} (${osArch}).`
            );
        }

        toolPath = await installGomplate(version);
    }

    fs.chmodSync(path.join(toolPath, "gomplate"), "755");

    core.addPath(toolPath);
}

async function installGomplate(version: string): Promise<string> {
    version = semver.clean(version) || "";
    const fileName = `v${version}`;
    const downloadUrl = `https://github.com/hairyhenderson/gomplate/releases/download/${fileName}/gomplate_${osPlat}-amd64`;
    let downloadPath: string;

    try {
        downloadPath = await tc.downloadTool(downloadUrl);
    } catch (error) {
        throw error;
    }

    return await tc.cacheFile(downloadPath, "gomplate", "gomplate", version);
}

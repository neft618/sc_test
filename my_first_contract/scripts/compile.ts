import * as fs from "fs";
import process from "process";
import { Cell, Address } from "@ton/core";
import { compileFunc } from "@ton-community/func-js";

async function compileScript() {
    console.log(
        "================================================================"
    );
    console.log("COMPILING FUNC CODE, PLEASE WAIT...");
    const compileResult = await compileFunc({
        targets: ["./contracts/main.fc"],
        sources: (x) => fs.readFileSync(x).toString("utf8"),
    });

    if (compileResult.status === "error") {
        process.exit(1);
    }

    console.log("Compilation was successful");

    const hexArtifact = `build/main.compiled.json`;

    fs.writeFileSync(
        hexArtifact,
        JSON.stringify({
            hex: Cell.fromBoc(Buffer.from(compileResult.codeBoc, "base64"))[0]
                .toBoc()
                .toString("hex"),
        })
    );

    console.log(` - compiled code saved to ${hexArtifact}`);
    console.log(Address.parse("0:a3935861f79daf59a13d6d182e1640210c02f98e3df18fda74b8f5ab141abf18"));

  }

compileScript();
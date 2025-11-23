"use server";

import { Sandbox } from "@/lib/sandbox";
import { getTestCaseInputs } from "./generate-test-case-inputs";
import { DEFAULT_LANGUAGE } from "@/lib/consts";

export async function runGenerateInput(problemId: string) {
  const testCaseInputs = await getTestCaseInputs(problemId);
  const sandbox = await Sandbox.create(DEFAULT_LANGUAGE);

  // Run executions sequentially to avoid conflicts with single-process sandbox
  const results = [];
  for (const testCaseInput of testCaseInputs) {
    const result = await sandbox.run(
      testCaseInput.inputCode +
        "; const output = generateSolution(); console.log(output);"
    );
    console.log("RESULT", result);
    results.push(result.result);
  }

  await sandbox.kill();

  return results;
}

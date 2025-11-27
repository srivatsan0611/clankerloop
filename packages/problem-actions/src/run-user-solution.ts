import { Sandbox } from "./sandbox";
import { DEFAULT_LANGUAGE } from "./constants";
import { getProblem } from "@repo/db";
import type { TestResult, SandboxConfig } from "./types";

export async function runUserSolution(
  problemId: string,
  userCode: string,
  sandboxConfig: SandboxConfig
): Promise<TestResult[]> {
  const { testCases } = await getProblem(problemId);
  if (!testCases || testCases.length === 0) {
    throw new Error(
      "No test cases found. Please generate test case descriptions and inputs first."
    );
  }

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    if (!testCase) {
      throw new Error(`Test case at index ${i} is undefined`);
    }
    if (testCase.input === null || testCase.input === undefined) {
      throw new Error(
        `Test case ${i + 1} is missing input. Please generate test case inputs first.`
      );
    }
    if (testCase.expected === null || testCase.expected === undefined) {
      throw new Error(
        `Test case ${i + 1} is missing expected output. Please generate test case outputs first.`
      );
    }
  }

  const sandbox = await Sandbox.create(DEFAULT_LANGUAGE, sandboxConfig);
  const results: TestResult[] = [];

  try {
    for (let index = 0; index < testCases.length; index++) {
      const testCase = testCases[index];
      if (!testCase) {
        throw new Error(`Test case at index ${index} is undefined`);
      }

      try {
        const codeToRun =
          userCode +
          "; const output = runSolution(..." +
          JSON.stringify(testCase.input) +
          ");" +
          "require('fs').writeFileSync('output.json', JSON.stringify(output));";

        await sandbox.run(codeToRun);
        const actualOutput = JSON.parse(await sandbox.readFile("output.json"));

        const actualStr = JSON.stringify(actualOutput);
        const expectedStr = JSON.stringify(testCase.expected);
        const status = actualStr === expectedStr ? "pass" : "fail";

        results.push({
          testCase,
          status,
          actual: actualOutput,
        });
      } catch (error) {
        results.push({
          testCase,
          status: "error",
          actual: null,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }
  } finally {
    await sandbox.kill();
  }

  return results;
}

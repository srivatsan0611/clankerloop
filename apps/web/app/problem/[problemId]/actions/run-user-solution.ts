"use server";

import { Sandbox } from "@/lib/sandbox";
import { DEFAULT_LANGUAGE } from "@/lib/consts";
import { getProblem, TestCase } from "@repo/db";

export type TestResult = {
  testCase: TestCase;
  status: "pass" | "fail" | "error";
  actual: unknown | null;
  error?: string;
};

export async function runUserSolution(
  problemId: string,
  userCode: string
): Promise<TestResult[]> {
  // Get existing test cases
  const { testCases } = await getProblem(problemId);
  if (!testCases || testCases.length === 0) {
    throw new Error(
      "No test cases found. Please generate test case descriptions and inputs first."
    );
  }

  // Validate test cases have both input and expected
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

  const sandbox = await Sandbox.create(DEFAULT_LANGUAGE);
  const results: TestResult[] = [];

  try {
    // Run executions sequentially to avoid conflicts with single-process sandbox
    for (let index = 0; index < testCases.length; index++) {
      const testCase = testCases[index];
      if (!testCase) {
        throw new Error(`Test case at index ${index} is undefined`);
      }

      try {
        // Run user code with test case input
        const codeToRun =
          userCode +
          "; const output = runSolution(..." +
          JSON.stringify(testCase.input) +
          ");" +
          // Write the output to a file
          "require('fs').writeFileSync('output.json', JSON.stringify(output));";

        await sandbox.run(codeToRun);
        const actualOutput = JSON.parse(await sandbox.readFile("output.json"));

        // Compare actual output with expected output using deep equality
        const actualStr = JSON.stringify(actualOutput);
        const expectedStr = JSON.stringify(testCase.expected);
        const status = actualStr === expectedStr ? "pass" : "fail";

        results.push({
          testCase,
          status,
          actual: actualOutput,
        });
      } catch (error) {
        // Handle runtime errors for this test case
        results.push({
          testCase,
          status: "error",
          actual: null,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }
  } finally {
    // Clean up sandbox
    await sandbox.kill();
  }

  return results;
}

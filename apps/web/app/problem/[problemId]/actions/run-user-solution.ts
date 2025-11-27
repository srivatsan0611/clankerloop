"use server";

import {
  runUserSolution as _runUserSolution,
  type TestResult,
  type SandboxConfig,
} from "@repo/problem-actions";

export type { TestResult };

const getSandboxConfig = (): SandboxConfig => {
  const apiKey = process.env.DAYTONA_API_KEY;
  if (!apiKey) {
    throw new Error("DAYTONA_API_KEY environment variable is not set");
  }
  return { apiKey };
};

export async function runUserSolution(
  problemId: string,
  userCode: string
): Promise<TestResult[]> {
  return _runUserSolution(problemId, userCode, getSandboxConfig());
}

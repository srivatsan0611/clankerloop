"use server";

import {
  generateTestCaseInputs as _generateTestCaseInputs,
  getTestCaseInputs as _getTestCaseInputs,
  type SandboxConfig,
} from "@repo/problem-actions";

const getSandboxConfig = (): SandboxConfig => {
  const apiKey = process.env.DAYTONA_API_KEY;
  if (!apiKey) {
    throw new Error("DAYTONA_API_KEY environment variable is not set");
  }
  return { apiKey };
};

export async function generateTestCaseInputs(problemId: string) {
  return _generateTestCaseInputs(problemId, getSandboxConfig());
}

export async function getTestCaseInputs(problemId: string) {
  return _getTestCaseInputs(problemId);
}

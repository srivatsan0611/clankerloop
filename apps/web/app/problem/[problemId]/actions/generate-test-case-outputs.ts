"use server";

import {
  generateTestCaseOutputs as _generateTestCaseOutputs,
  getTestCaseOutputs as _getTestCaseOutputs,
  type SandboxConfig,
} from "@repo/problem-actions";

const getSandboxConfig = (): SandboxConfig => {
  const apiKey = process.env.DAYTONA_API_KEY;
  if (!apiKey) {
    throw new Error("DAYTONA_API_KEY environment variable is not set");
  }
  return { apiKey };
};

export async function generateTestCaseOutputs(problemId: string) {
  return _generateTestCaseOutputs(problemId, getSandboxConfig());
}

export async function getTestCaseOutputs(problemId: string) {
  return _getTestCaseOutputs(problemId);
}

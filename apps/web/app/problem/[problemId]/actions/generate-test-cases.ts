"use server";

import {
  generateTestCases as _generateTestCases,
  getTestCases as _getTestCases,
} from "@repo/problem-actions";

export async function generateTestCases(problemId: string) {
  return _generateTestCases(problemId);
}

export async function getTestCases(problemId: string) {
  return _getTestCases(problemId);
}

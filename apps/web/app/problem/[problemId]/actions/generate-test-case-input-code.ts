"use server";

import {
  generateTestCaseInputCode as _generateTestCaseInputCode,
  getTestCaseInputCode as _getTestCaseInputCode,
} from "@repo/problem-actions";

export async function generateTestCaseInputCode(problemId: string) {
  return _generateTestCaseInputCode(problemId);
}

export async function getTestCaseInputCode(problemId: string) {
  return _getTestCaseInputCode(problemId);
}

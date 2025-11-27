"use server";

import {
  generateProblemText as _generateProblemText,
  getProblemText as _getProblemText,
} from "@repo/problem-actions";

export async function generateProblemText(problemId: string) {
  return _generateProblemText(problemId);
}

export async function getProblemText(problemId: string) {
  return _getProblemText(problemId);
}

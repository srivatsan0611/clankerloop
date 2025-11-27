"use server";

import {
  generateSolution as _generateSolution,
  getSolution as _getSolution,
} from "@repo/problem-actions";

export async function generateSolution(problemId: string) {
  return _generateSolution(problemId);
}

export async function getSolution(problemId: string) {
  return _getSolution(problemId);
}

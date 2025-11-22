import { atom } from "jotai";
import {
  generateProblemText,
  getProblemText,
} from "./app/problem/[problemId]/actions/generate-problem-text";

export const problemIdAtom = atom<string | null>(null);
export const isProblemTextLoadingAtom = atom(false);
export const problemTextAtom = atom<string | null>(null);

/**
 * Generate problem text
 */
export const callGenerateProblemTextAtom = atom(null, async (get, set) => {
  const problemId = get(problemIdAtom);
  if (!problemId) {
    throw new Error("Problem ID is not set");
  }
  set(isProblemTextLoadingAtom, true);
  const newProblemText = await generateProblemText(problemId);
  set(problemTextAtom, newProblemText);
  set(isProblemTextLoadingAtom, false);
});

/**
 * Read the existing problem text for a given problem ID
 */
export const getProblemTextAtom = atom(null, async (get, set) => {
  const problemId = get(problemIdAtom);
  if (!problemId) {
    throw new Error("Problem ID is not set");
  }
  set(isProblemTextLoadingAtom, true);
  const problemText = await getProblemText(problemId);
  set(problemTextAtom, problemText);
  set(isProblemTextLoadingAtom, false);
});

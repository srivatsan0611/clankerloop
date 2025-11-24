import { atom } from "jotai";
import {
  generateProblemText,
  getProblemText,
} from "./app/problem/[problemId]/actions/generate-problem-text";
import {
  generateTestCases,
  getTestCases,
} from "./app/problem/[problemId]/actions/generate-test-cases";
import {
  generateTestCaseInputCode,
  getTestCaseInputCode,
} from "./app/problem/[problemId]/actions/generate-test-case-input-code";
import {
  generateTestCaseInputs,
  getTestCaseInputs,
} from "./app/problem/[problemId]/actions/generate-test-case-inputs";
import {
  generateSolution,
  getSolution,
} from "./app/problem/[problemId]/actions/generate-solution";
import {
  generateTestCaseOutputs,
  getTestCaseOutputs,
} from "./app/problem/[problemId]/actions/generate-test-case-outputs";

export const problemIdAtom = atom<string | null>(null);
export const isProblemTextLoadingAtom = atom(false);
export const problemTextErrorAtom = atom<Error | null>(null);
export const problemTextAtom = atom<{
  problemText: string;
  functionSignature: string;
} | null>(null);

/**
 * Generate problem text
 */
export const callGenerateProblemTextAtom = atom(null, async (get, set) => {
  const problemId = get(problemIdAtom);
  if (!problemId) {
    throw new Error("Problem ID is not set");
  }
  set(problemTextAtom, null);
  set(problemTextErrorAtom, null);
  set(isProblemTextLoadingAtom, true);
  try {
    const newProblemText = await generateProblemText(problemId);
    set(problemTextAtom, newProblemText);
  } catch (error) {
    set(
      problemTextErrorAtom,
      error instanceof Error ? error : new Error(String(error))
    );
  } finally {
    set(isProblemTextLoadingAtom, false);
  }
});

/**
 * Read the existing problem text for a given problem ID
 */
export const getProblemTextAtom = atom(null, async (get, set) => {
  const problemId = get(problemIdAtom);
  if (!problemId) {
    throw new Error("Problem ID is not set");
  }
  set(problemTextErrorAtom, null);
  set(isProblemTextLoadingAtom, true);
  try {
    const { problemText, functionSignature } = await getProblemText(problemId);
    set(problemTextAtom, { problemText, functionSignature });
  } catch (error) {
    set(
      problemTextErrorAtom,
      error instanceof Error ? error : new Error(String(error))
    );
  } finally {
    set(isProblemTextLoadingAtom, false);
  }
});

export const isTestCasesLoadingAtom = atom(false);
export const testCasesErrorAtom = atom<Error | null>(null);
export const testCasesAtom = atom<
  { description: string; isEdgeCase: boolean }[] | null
>(null);

/**
 * Generate test cases
 */
export const callGenerateTestCasesAtom = atom(null, async (get, set) => {
  const problemId = get(problemIdAtom);
  if (!problemId) {
    throw new Error("Problem ID is not set");
  }
  set(testCasesAtom, null);
  set(testCasesErrorAtom, null);
  set(isTestCasesLoadingAtom, true);
  try {
    const testCases = await generateTestCases(problemId);
    set(testCasesAtom, testCases);
  } catch (error) {
    set(
      testCasesErrorAtom,
      error instanceof Error ? error : new Error(String(error))
    );
  } finally {
    set(isTestCasesLoadingAtom, false);
  }
});

/**
 * Read the existing test cases for a given problem ID
 */
export const getTestCasesAtom = atom(null, async (get, set) => {
  const problemId = get(problemIdAtom);
  if (!problemId) {
    throw new Error("Problem ID is not set");
  }
  set(testCasesErrorAtom, null);
  set(isTestCasesLoadingAtom, true);
  try {
    const testCases = await getTestCases(problemId);
    set(testCasesAtom, testCases);
  } catch (error) {
    set(
      testCasesErrorAtom,
      error instanceof Error ? error : new Error(String(error))
    );
  } finally {
    set(isTestCasesLoadingAtom, false);
  }
});

export const isTestCaseInputsLoadingAtom = atom(false);
export const testCaseInputCodeErrorAtom = atom<Error | null>(null);
export const testCaseInputCodeAtom = atom<string[] | null>(null);

/**
 * Generate test case inputs
 */
export const callGenerateTestCaseInputCodeAtom = atom(
  null,
  async (get, set) => {
    const problemId = get(problemIdAtom);
    if (!problemId) {
      throw new Error("Problem ID is not set");
    }
    set(testCaseInputCodeAtom, null);
    set(testCaseInputCodeErrorAtom, null);
    set(isTestCaseInputsLoadingAtom, true);
    try {
      const testCaseInputs = await generateTestCaseInputCode(problemId);
      set(testCaseInputCodeAtom, testCaseInputs);
    } catch (error) {
      set(
        testCaseInputCodeErrorAtom,
        error instanceof Error ? error : new Error(String(error))
      );
    } finally {
      set(isTestCaseInputsLoadingAtom, false);
    }
  }
);

/**
 * Read the existing test case input code for a given problem ID
 */
export const getCodeToGenerateTestCaseInputsAtom = atom(
  null,
  async (get, set) => {
    const problemId = get(problemIdAtom);
    if (!problemId) {
      throw new Error("Problem ID is not set");
    }
    set(testCaseInputCodeErrorAtom, null);
    set(isTestCaseInputsLoadingAtom, true);
    try {
      const testCaseInputs = await getTestCaseInputCode(problemId);
      set(testCaseInputCodeAtom, testCaseInputs);
    } catch (error) {
      set(
        testCaseInputCodeErrorAtom,
        error instanceof Error ? error : new Error(String(error))
      );
    } finally {
      set(isTestCaseInputsLoadingAtom, false);
    }
  }
);

/**
 * Generate test case inputs from test case input code
 */
export const isGenerateTestCaseInputsLoadingAtom = atom(false);
export const testCaseInputsErrorAtom = atom<Error | null>(null);
export const testCaseInputsAtom = atom<unknown[] | null>(null);

export const callGenerateTestCaseInputsAtom = atom(null, async (get, set) => {
  const problemId = get(problemIdAtom);
  if (!problemId) {
    throw new Error("Problem ID is not set");
  }
  set(testCaseInputsErrorAtom, null);
  set(isGenerateTestCaseInputsLoadingAtom, true);
  try {
    const testCaseInputs = await generateTestCaseInputs(problemId);
    set(testCaseInputsAtom, testCaseInputs);
  } catch (error) {
    set(
      testCaseInputsErrorAtom,
      error instanceof Error ? error : new Error(String(error))
    );
  } finally {
    set(isGenerateTestCaseInputsLoadingAtom, false);
  }
});

/**
 * Read the existing test case inputs for a given problem ID
 */
export const getTestCaseInputsAtom = atom(null, async (get, set) => {
  const problemId = get(problemIdAtom);
  if (!problemId) {
    throw new Error("Problem ID is not set");
  }
  set(testCaseInputsErrorAtom, null);
  set(isGenerateTestCaseInputsLoadingAtom, true);
  try {
    const testCaseInputs = await getTestCaseInputs(problemId);
    set(testCaseInputsAtom, testCaseInputs);
  } catch (error) {
    set(
      testCaseInputsErrorAtom,
      error instanceof Error ? error : new Error(String(error))
    );
  } finally {
    set(isGenerateTestCaseInputsLoadingAtom, false);
  }
});

/**
 * Generate solution
 */
export const isGenerateSolutionLoadingAtom = atom(false);
export const solutionErrorAtom = atom<Error | null>(null);
export const solutionAtom = atom<string | null>(null);
export const callGenerateSolutionAtom = atom(null, async (get, set) => {
  const problemId = get(problemIdAtom);
  if (!problemId) {
    throw new Error("Problem ID is not set");
  }
  set(solutionErrorAtom, null);
  set(isGenerateSolutionLoadingAtom, true);
  try {
    const solution = await generateSolution(problemId);
    set(solutionAtom, solution);
  } catch (error) {
    set(
      solutionErrorAtom,
      error instanceof Error ? error : new Error(String(error))
    );
  } finally {
    set(isGenerateSolutionLoadingAtom, false);
  }
});

/**
 * Read the existing solution for a given problem ID
 */
export const getSolutionAtom = atom(null, async (get, set) => {
  const problemId = get(problemIdAtom);
  if (!problemId) {
    throw new Error("Problem ID is not set");
  }
  set(solutionErrorAtom, null);
  set(isGenerateSolutionLoadingAtom, true);
  try {
    const solution = await getSolution(problemId);
    set(solutionAtom, solution);
  } catch (error) {
    set(
      solutionErrorAtom,
      error instanceof Error ? error : new Error(String(error))
    );
  } finally {
    set(isGenerateSolutionLoadingAtom, false);
  }
});

/**
 * Generate test case outputs
 */
export const isGenerateTestCaseOutputsLoadingAtom = atom(false);
export const testCaseOutputsErrorAtom = atom<Error | null>(null);
export const testCaseOutputsAtom = atom<unknown[] | null>(null);
export const callGenerateTestCaseOutputsAtom = atom(null, async (get, set) => {
  const problemId = get(problemIdAtom);
  if (!problemId) {
    throw new Error("Problem ID is not set");
  }
  set(testCaseOutputsErrorAtom, null);
  set(isGenerateTestCaseOutputsLoadingAtom, true);
  try {
    const testCaseOutputs = await generateTestCaseOutputs(problemId);
    set(testCaseOutputsAtom, testCaseOutputs);
  } catch (error) {
    set(
      testCaseOutputsErrorAtom,
      error instanceof Error ? error : new Error(String(error))
    );
  } finally {
    set(isGenerateTestCaseOutputsLoadingAtom, false);
  }
});

/**
 * Read the existing test case outputs for a given problem ID
 */
export const getTestCaseOutputsAtom = atom(null, async (get, set) => {
  const problemId = get(problemIdAtom);
  if (!problemId) {
    throw new Error("Problem ID is not set");
  }
  set(testCaseOutputsErrorAtom, null);
  set(isGenerateTestCaseOutputsLoadingAtom, true);
  try {
    const testCaseOutputs = await getTestCaseOutputs(problemId);
    set(testCaseOutputsAtom, testCaseOutputs);
  } catch (error) {
    set(
      testCaseOutputsErrorAtom,
      error instanceof Error ? error : new Error(String(error))
    );
  } finally {
    set(isGenerateTestCaseOutputsLoadingAtom, false);
  }
});

"use client";

import { Button } from "@/components/ui/button";
import {
  generateProblemText,
  getProblemText,
} from "../actions/generate-problem-text";
import { useCallback, useEffect, useState } from "react";
import { MessageResponse } from "@/components/ai-elements/message";
import Loader from "@/components/client/loader";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  callGenerateProblemTextAtom,
  getProblemTextAtom,
  isProblemTextLoadingAtom,
  problemIdAtom,
  problemTextAtom,
} from "@/atoms";

export default function ProblemRender({ problemId }: { problemId: string }) {
  const setProblemId = useSetAtom(problemIdAtom);
  const isProblemTextLoading = useAtomValue(isProblemTextLoadingAtom);
  const problemText = useAtomValue(problemTextAtom);
  const callGenerateProblemText = useSetAtom(callGenerateProblemTextAtom);
  const getProblemText = useSetAtom(getProblemTextAtom);
  useEffect(() => {
    setProblemId(problemId);
  }, [problemId, setProblemId]);

  useEffect(() => {
    getProblemText();
  }, [getProblemText, problemId]);

  return (
    <div>
      <div>Problem: {problemId}</div>
      <div>
        <Button variant={"outline"} onClick={() => callGenerateProblemText()}>
          Generate Problem Text
        </Button>
        {isProblemTextLoading ? (
          <Loader />
        ) : (
          problemText && <MessageResponse>{problemText}</MessageResponse>
        )}
      </div>
    </div>
  );
}

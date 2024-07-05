import { atom } from "jotai";

export type AnswerFormData = Record<string, string | string[]>;
type caseState = {
  personName?: string;
  caseNumber?: string;
};

export const answerFormAtom = atom<AnswerFormData>({});
export const caseAtom = atom<caseState>({});

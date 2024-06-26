import { atom } from "jotai";
import { AnswerFormData } from "../pages/Diagnose";

type diagnoseState = Record<string, AnswerFormData>;
type caseState = {
  personName?: string;
  caseNumber?: string;
};

const diagnoseAtom = atom<diagnoseState>({});
const caseAtom = atom<caseState>({});

export { diagnoseAtom, caseAtom };

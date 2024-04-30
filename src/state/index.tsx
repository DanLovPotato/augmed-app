import { atom } from "jotai";
import { DiagnoseFormData } from "../pages/Diagnose";

type diagnoseState = Record<string, DiagnoseFormData>;
type caseState = {
  personName?: string;
  caseNumber?: string;
};

const diagnoseAtom = atom<diagnoseState>({});
const caseAtom = atom<caseState>({});

export { diagnoseAtom, caseAtom };

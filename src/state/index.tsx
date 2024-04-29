import { atom } from "jotai";
import { DiagnoseFormData } from "../pages/Diagnose";

type diagnoseState = Record<string, DiagnoseFormData>;

const diagnoseAtom = atom<diagnoseState>({});

export { diagnoseAtom };

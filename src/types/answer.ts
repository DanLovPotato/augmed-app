export interface AnswerPageConfigResponse {
  config: AnswerConfigList;
  created_timestamp: string;
  id: string;
}
type ShortText = {
  type: "Text";
  title: string;
  required?: boolean;
};

type Paragraph = {
  type: "Paragraph";
  title: string;
};

type MultipleChoice = {
  type: "MultipleChoice";
  title: string;
  options: string[];
};

type SingleChoice = {
  type: "SingleChoice";
  title: string;
  options: string[];
};

export type AnswerConfigList = (ShortText | Paragraph | MultipleChoice | SingleChoice)[];

export enum Category {
  Structuring = 'Structuring',
  Reasoning = 'Reasoning',
  Creative = 'Creative',
  Validation = 'Validation',
}

export interface Technique {
  id: string;
  code: string;
  title: string;
  simpleExplanation: string;
  fullExplanation: string;
  example: string;
  category: Category;
  tags: string[];
}
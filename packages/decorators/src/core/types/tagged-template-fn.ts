export type TaggedTemplateFn<Expressions extends readonly unknown[], Result> = (
  strings: TemplateStringsArray,
  ...expressions: Expressions
) => Result;

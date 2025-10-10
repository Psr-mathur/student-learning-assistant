import type { TCodingQuestion, TDocument, TQuizQuestion, TSummary, TTheoryQuestion } from '@/types/lessons.types';
import { GoogleGenAI, type Schema, Type } from "@google/genai";
import { blobToBase64 } from './blobToBase64';
import { extractTextFromPptxBlob } from './pptTextExtractor';

const model = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

type OptionType = "summary" | "theory" | "coding" | "quiz";
export type TAIResponse = {
  summary: TSummary;
  quiz?: TQuizQuestion[];
  theory?: TTheoryQuestion[];
  coding?: TCodingQuestion[];
};

export function getMimeType(type: TDocument["type"]): string {
  switch (type) {
    case "pdf":
      return "application/pdf";
    default:
      return "text/plain";
  }
}

export async function getInlineData(doc: TDocument) {
  if (doc.type === "ppt") {
    const extractedText = await extractTextFromPptxBlob(doc.blob)
    const base64Data = btoa(unescape(encodeURIComponent(extractedText)));
    return {
      mimeType: getMimeType(doc.type),
      data: base64Data,
    };
  }
  else {
    const base64Data = await blobToBase64(doc.blob);
    return {
      mimeType: getMimeType(doc.type),
      data: base64Data,
    };
  }
}

export function documentToFile(doc: TDocument): File {
  return new File([doc.blob], doc.name, {
    type: doc.blob.type,
    lastModified: doc.uploadedAt.getTime(),
  });
}



async function generateSchema(options: OptionType[]) {
  let summaryProp: Schema | undefined = undefined;
  let quizProp: Schema | undefined = undefined;
  let theoryProp: Schema | undefined = undefined;
  let codingProp: Schema | undefined = undefined;

  if (options.includes("summary")) {
    summaryProp = { type: Type.STRING };
  }

  if (options.includes("quiz")) {
    quizProp = {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          question: { type: Type.STRING },
          options: { type: Type.ARRAY, items: { type: Type.STRING } },
          correctAnswer: { type: Type.NUMBER },
        },
        required: ["id", "question", "options", "correctAnswer"],
      },
    };
  }

  if (options.includes("theory")) {
    theoryProp = {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          question: { type: Type.STRING },
          answer: { type: Type.STRING },
          difficulty: { type: Type.STRING, enum: ["easy", "medium", "hard"] },
        },
        required: ["id", "question", "answer", "difficulty"],
      },
    };
  }

  if (options.includes("coding")) {
    codingProp = {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          question: { type: Type.STRING },
          testCases: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                input: { type: Type.STRING },
                expectedOutput: { type: Type.STRING },
              },
              required: ["input", "expectedOutput"],
            },
          },
          difficulty: { type: Type.STRING, enum: ["easy", "medium", "hard"] },
        },
        required: ["id", "question", "testCases", "difficulty"],
      },
    };
  }

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      ...(summaryProp && { summary: summaryProp }),
      ...(quizProp && { quiz: quizProp }),
      ...(theoryProp && { theory: theoryProp }),
      ...(codingProp && { coding: codingProp }),
    },
    required: ["summary"],
  };

  return schema;
}



export async function generateFromAI({ document, options }: { document: TDocument, options: OptionType[] }): Promise<TAIResponse> {

  const schema = await generateSchema(options);
  const inlineData = await getInlineData(document);

  // Send request to AI
  // const file = await model.files.upload({
  //   file: document.blob,
  //   config: {
  //     displayName: document.name,
  //     mimeType: getMimeType(document.type),
  //   }
  // });
  const response = await model.models.generateContent({
    contents: [
      {
        inlineData: inlineData,
        // fileData: {
        //   fileUri: file.uri,
        // }
      },
    ],
    // model: "gemini-2.5-pro",
    model: "gemini-2.5-flash",
    config: {
      responseSchema: schema,
      responseMimeType: "application/json",
      systemInstruction: `You are a teacher, you will give a ${options.join(", ")} questions for a given document.`,
    },
  });

  // AI will return parsed JSON in structured format
  return JSON.parse(response.text?.trim() || "{}");
}

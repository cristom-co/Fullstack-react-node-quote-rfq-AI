import documents from "./training/documents";
import {entities} from "./training/entities";

const { NlpManager } = require("node-nlp");
const manager = new NlpManager({ languages: ["en"], forceNER: true });

documents.map((document) => {
  manager.addDocument(document[0], document[1], document[2]);
});

entities.map((entity) => {
  manager.addNamedEntityText(entity[0], entity[1], entity[2], entity[3]);
});

manager.addAnswer("en", "quote.request", "Sure, I can help with that.");
manager.addAnswer('en', 'delivery.restriction', 'I will note the delivery restrictions.');

(async function trainAndSave() {
  await manager.train();
  manager.save();
})();

export async function processEmail(emailText: any) {
  const response = await manager.process("en", emailText);
  const { classifications, entities } = response;
  let status = false;

  let validate = classifications.find((item: any) => item.intent === "quote.request")
  if (validate) {
    status = true;
  }

  return { status, entities };
}

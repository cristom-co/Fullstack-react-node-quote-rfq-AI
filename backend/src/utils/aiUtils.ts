const { NlpManager } = require('node-nlp');
const manager = new NlpManager({ languages: ['en'], forceNER: true });

manager.addDocument('en', 'I need a quote for %quantity% %item%', 'quote.request');
manager.addDocument('en', 'Can you provide a price for %quantity% %item%', 'quote.request');
manager.addDocument('en', 'Please give me a quote for %quantity% %item%', 'quote.request');
manager.addDocument('en', 'I would like to get a quote for %quantity% %item%', 'quote.request');
manager.addDocument('en', 'I need pricing information for %quantity% %item%', 'quote.request');
manager.addDocument('en', 'Can you quote me %quantity% %item%', 'quote.request');
manager.addDocument('en', 'How much would %quantity% %item% cost?', 'quote.request');
manager.addDocument('en', 'What is the price for %quantity% %item%?', 'quote.request');

manager.addNamedEntityText('item', 'steel beams', ['en'], ['steel beams', 'beams made of steel']);
manager.addNamedEntityText('item', 'aluminum sheets', ['en'], ['aluminum sheets', 'sheets of aluminum']);
manager.addNamedEntityText('item', 'copper rods', ['en'], ['copper rods', 'rods made of copper']);
manager.addNamedEntityText('item', 'iron plates', ['en'], ['iron plates', 'plates made of iron']);

manager.addNamedEntityText('quantity', '50', ['en'], ['50', 'fifty']);
manager.addNamedEntityText('quantity', '100', ['en'], ['100', 'one hundred']);
manager.addNamedEntityText('quantity', '200', ['en'], ['200', 'two hundred']);
manager.addNamedEntityText('quantity', '500', ['en'], ['500', 'five hundred']);

manager.addAnswer('en', 'quote.request', 'Sure, I can help with that.');

(async function trainAndSave() {
  await manager.train();
  manager.save();
})()

export async function processEmail(emailText:any) {
  const response = await manager.process('en', emailText);
  const { classifications, entities } = response;

  console.log(classifications, entities)

  if (classifications[0].intent === 'quote.request') {
    console.log("good")
  } else {
    console.log('No quote request found in the email.');
  }
}

// // Ejemplo de uso
// const emailText = 'Can you provide a price for 50 aluminum sheets?';
// processEmail(emailText);
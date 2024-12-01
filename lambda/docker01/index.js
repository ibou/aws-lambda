//first function nodejs count the number of words in a string
exports.handler = async (event) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify("Hi, hello world, I am a web developer"),
  };

  return response;
}

// Wrapper l'appel dans une fonction async auto-exécutée
(async () => {
  const response = await exports.handler({text: "Hello World, I am a web developer"});
  console.log(response);
})();

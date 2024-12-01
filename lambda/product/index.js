
export const handler = async (event) => {
  //check if the event is not empty and if the price and discount are not empty
  if (!event || !event.price || !event.discount) {
    return {
      statusCode: 400,
      body: JSON.stringify("Bad Request"),
    };
  }
  
  const { price, discount } = event;
  const result = price * (1 - (discount / 100));
  const response = {
    statusCode: 200,
    body: JSON.stringify(result),
  };

  return response;
}

// Wrapper l'appel dans une fonction async auto-exécutée
(async () => {
  const response = await handler({ price: 100, discount: 20 });
  console.log(response);
})();
import { SES } from '@aws-sdk/client-ses';
const ses = new SES({ region: 'eu-west-3' });

export const handler = async (event) => {

  sendMail("Sample Subject", "Sample Body");
  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello email send '),
  };
  return response;
};


async function sendMail(subject, data) {
  const emailParams = {
    Destination: {
      ToAddresses: ["iboudiallo84@gmail.com"],
    },
    Message: {
      Body: {
        Text: { Data: data },
      },
      Subject: { Data: subject },
    },
    Source: "iboudiallo84@icloud.com",
  };

  try {
    const result = await ses.sendEmail(emailParams);
    console.log("MAIL SENT SUCCESSFULLY!!", result.MessageId);
    return result;
  } catch (error) {
    console.error("FAILURE IN SENDING MAIL!!", error.message);
    throw error;
  }
  return;
}

// Wrapper l'appel dans une fonction async auto-exécutée
(async () => {
  const response = await handler({ price: 100, discount: 20 });
  console.log(response);
})();
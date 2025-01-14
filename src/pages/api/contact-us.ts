import type { NextApiHandler } from 'next';
import sendMail, { createFormattedMessage, OUR_EMAIL } from '../../lib/mail';
import HttpCodes from 'http-status-codes';
import { errorBody } from '../../lib/helpers/api';

export type Service = 'Website' | 'Project' | 'Funding' | 'Advice';

export interface ContactUsSubmission {
  name: string;
  email: string;
  service: Service;
  message: string;
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res
      .status(HttpCodes.NOT_IMPLEMENTED)
      .json(errorBody(HttpCodes.NOT_IMPLEMENTED));
  }

  const { name, email, service, message }: ContactUsSubmission = req.body;

  try {
    await sendMail({
      to: OUR_EMAIL,
      from: email,
      subject: `Contact about ${service} from ${name}`,
      html: createFormattedMessage({
        name,
        email,
        service,
        message,
      }),
    });
  } catch (e: unknown) {
    debugger;
    return res.status((e as Response).status).json({});
  }

  res.status(HttpCodes.OK).json({});
};

export default handler;

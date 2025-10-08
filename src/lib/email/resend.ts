import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 'fake-key-for-build');

export default resend;

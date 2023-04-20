import multiparty from 'multiparty';
import { fireConfig } from '@/lib/fireConfig';
import fs from 'fs';
import mime from 'mime-types';
import admin from 'firebase-admin';
import mongooseConfig from '@/lib/mongoose';
import { isAdminRequest } from './auth/[...nextauth]';


if (!admin.apps.length) {
admin.initializeApp({
  credential: admin.credential.cert(fireConfig),
  storageBucket: process.env.FIREBASE_BUCKET,
});
};

const bucket = admin.storage().bucket();

export default async function handle(req,res) {

  await mongooseConfig();
  await isAdminRequest(req,res);

  const form = new multiparty.Form();
  const {fields,files} = await new Promise((resolve,reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({fields,files});
    });
  });
  const links = [];
  for (const file of files.file) {
    const ext = file.originalFilename.split('.').pop();
    const newFilename = Date.now() + '.' + ext;
    const fileRef = bucket.file(newFilename);
    await fileRef.save(fs.readFileSync(file.path), {
    metadata: {
      contentType: mime.lookup(file.path)
    }
  });
  const [url] = await fileRef.getSignedUrl({
    action: 'read',
    expires: '01-01-2100'
  });
  links.push(url);
}
  return res.json({links});
}

export const config = {
  api: {bodyParser: false},
};
  


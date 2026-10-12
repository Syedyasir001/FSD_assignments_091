import jwt from "jsonwebtoken";
import User from "./models/User.js";

const secret = 'secret123';

export function getUserFromToken(token) {
  return new Promise((resolve, reject) => {
    if (!token) {
      reject('No token provided');
      return;
    }
    jwt.verify(token, secret, (err, userInfo) => {
      if (err) {
        reject(err);
      } else {
        User.findById(userInfo.id).then(resolve).catch(reject);
      }
    });
  });
}
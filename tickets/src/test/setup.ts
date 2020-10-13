import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[];
    }
  }
}

let mongo: any;

// hook functions
// runs before all tests
beforeAll(async () => {
  process.env.JWT_KEY = '';
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// reset all data between each test we run
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
  // build a jwt payload {id, email}
  const payload = {
    id: mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  // create a jwt
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // build session object {jwt: "jwt"}
  const session = { jwt: token };

  // turn into JSON
  const sessionJson = JSON.stringify(session);

  // encode the JSON object as base64
  const base64 = Buffer.from(sessionJson).toString('base64');

  // return array (for supertest) with a string
  return [`express:sess=${base64}`];
};


import dotenv from 'dotenv';
import { connectDB } from '../src/config/db.js';
import { User } from '../src/models/User.js';

dotenv.config();

const run = async () => {
  await connectDB();
  await User.deleteMany({});
  await User.create([
    { name: 'Alice Donor', email: 'alice@example.com', phone: '10001', password: 'password', role: 'donor', bloodGroup: 'O+', age: 25, location: { type:'Point', coordinates:[77.5946, 12.9716] } },
    { name: 'City Hospital Admin', email: 'hosp@example.com', phone: '20001', password: 'password', role: 'hospital', verified: true, location: { type:'Point', coordinates:[77.6, 12.97] } },
    { name: 'Super Admin', email: 'admin@example.com', phone: '90001', password: 'password', role: 'admin' }
  ]);
  console.log('Seeded users');
  process.exit(0);
};

run().catch(e => { console.error(e); process.exit(1); });

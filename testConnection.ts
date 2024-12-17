import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a new user
  const user = await prisma.user.create({
    data: {
      username: 'johndoe',
      email: 'johndoe@example.com',
    },
  });

  // Create a wallet for the user
  const wallet = await prisma.wallet.create({
    data: {
      userId: user.id,
      balance: 100.0,
    },
  });

  // Create a transaction for the wallet
  const transaction = await prisma.transaction.create({
    data: {
      walletId: wallet.id,
      type: 'income',
      amount: 50.0,
      category: 'salary',
    },
  });

  // Output the created entities
  console.log('User:', user);
  console.log('Wallet:', wallet);
  console.log('Transaction:', transaction);
}

main()
  .catch((e) => {
    console.error(e);
    //process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

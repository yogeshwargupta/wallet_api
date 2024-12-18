import cron from "node-cron";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

cron.schedule("0 0 * * *", async () => {
  const recurringTransactions = await prisma.recurringTransaction.findMany();

  recurringTransactions.forEach(async (tx) => {
    const { walletId, amount, type, category } = tx;

    await prisma.transaction.create({
      data: { walletId, amount, type, category },
    });

    const wallet = await prisma.wallet.findUnique({ where: { id: walletId } });
    await prisma.wallet.update({
      where: { id: walletId },
      data: { balance: wallet.balance + (type === "income" ? amount : -amount) },
    });
  });
});

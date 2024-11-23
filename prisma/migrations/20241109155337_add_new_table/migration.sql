-- CreateTable
CREATE TABLE "DirectMessages" (
    "directMessageId" UUID NOT NULL,
    "senderId" UUID NOT NULL,
    "receiverId" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "sendDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "DirectMessages_pkey" PRIMARY KEY ("directMessageId")
);

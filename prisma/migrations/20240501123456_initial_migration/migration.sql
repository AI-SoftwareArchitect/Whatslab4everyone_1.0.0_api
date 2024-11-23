-- CreateTable
CREATE TABLE "Contacts" (
    "id" SERIAL NOT NULL,
    "userid" UUID,
    "frienduserid" UUID NOT NULL,
    "updatedat" DATE NOT NULL,

    CONSTRAINT "Contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "groupid" UUID NOT NULL,
    "updatedat" DATE NOT NULL,
    "groupname" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("groupid")
);

-- CreateTable
CREATE TABLE "GroupParticipants" (
    "groupparticipantsid" SERIAL NOT NULL,
    "groupid" UUID,
    "leftat" DATE,
    "insertedat" DATE NOT NULL,
    "userid" UUID,
    "participantrole" TEXT NOT NULL,
    "maxmember" INTEGER,

    CONSTRAINT "GroupParticipants_pkey" PRIMARY KEY ("groupparticipantsid")
);

-- CreateTable
CREATE TABLE "Messages" (
    "messageid" SERIAL NOT NULL,
    "groupchatid" UUID,
    "deliveredat" DATE NOT NULL,
    "isread" BOOLEAN NOT NULL,
    "messagecontent" TEXT NOT NULL,
    "senderid" UUID,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("messageid")
);

-- CreateTable
CREATE TABLE "Profile" (
    "profileid" SERIAL NOT NULL,
    "userid" UUID,
    "profilepicturename" TEXT,
    "aboutme" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("profileid")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "updatedat" DATE NOT NULL,
    "hashedpassword" TEXT NOT NULL,
    "lastseen" DATE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contacts_userid_frienduserid_key" ON "Contacts"("userid", "frienduserid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Contacts" ADD CONSTRAINT "Contacts_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GroupParticipants" ADD CONSTRAINT "GroupParticipants_groupid_fkey" FOREIGN KEY ("groupid") REFERENCES "Group"("groupid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GroupParticipants" ADD CONSTRAINT "GroupParticipants_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_groupchatid_fkey" FOREIGN KEY ("groupchatid") REFERENCES "Group"("groupid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_senderid_fkey" FOREIGN KEY ("senderid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;


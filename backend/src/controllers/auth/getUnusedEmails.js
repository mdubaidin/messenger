import User from '../../schema/User.js';

export default async function (req, res, next) {
    try {
        const { firstName, lastName } = req.body;

        const emails = await generateEmail(firstName + lastName, User, 2);

        res.success({ emails });
    } catch (e) {
        next(e);
    }
}

const constructEmail = name => name.toLowerCase() + '@clikkmail.com';

async function generateEmail(name, db, count) {
    const emails = new Set();
    while (emails.size !== count) {
        const randomNumber = Math.floor(Math.random() * 1000);
        const username = name.toLowerCase().trim() + randomNumber;
        const email = constructEmail(username);
        const dbEmail = await db.count({ email });

        if (dbEmail) continue;
        emails.add(username);
    }

    return Array.from(emails);
}

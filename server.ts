import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

import initializeTracing from "./tracing";
const tracer = initializeTracing("express-server")

const app = express();
const port = 4001;

const prisma = new PrismaClient({});

app.get("/users/random", async (_req: Request, res: Response) => {
    await tracer.startActiveSpan("GET /users/random", async (requestSpan) => {
        try {
            let users = await prisma.user.findMany({
                include: {
                    posts: true
                }
            });

            // select 10 users randomly 
            const shuffledUsers = users.sort(() => 0.5 - Math.random());
            const selectedUsers = shuffledUsers.slice(0, 10);

            requestSpan.setAttribute("http.status", 200);

            res.status(200).json(selectedUsers);
        } catch (e) {
            requestSpan.setAttribute("http.status", 500);
            res.status(500).json({ error: 500, details: e });
        } finally {
            requestSpan.end();
        }
    })
})


app.listen(port, () => {
    console.log(`Example app listening on port: ${port}`);
});

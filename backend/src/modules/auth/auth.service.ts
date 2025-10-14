import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {Prisma} from "@prisma/client"
import {prisma} from "../../utils/prisma";
import {SignupInput, LoginInput, AuthTokenPayload} from "./auth.types";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export class AuthService {
  static async signup(data: SignupInput) {
    const {name, email, password} = data;

    // Check if user already exists
    const existing = await prisma.user.findUnique({where: {email}});
    if (existing) throw new Error("User already exists");

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {name, email, password: hashed},
    });
    
    return user;
  }

  static async login(data: LoginInput) {
    const {email, password} = data;

    const user = await prisma.user.findUnique({where: {email}});
    if (!user) throw new Error("Invalid credentials");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Invalid credentials");

    const payload: AuthTokenPayload = {userId: user.id};
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "7d"});

    return {user, token};
  }
}
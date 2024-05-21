import {User} from "./user.entity";
import * as bcrypt from "bcrypt";

describe("User", () => {
    it("should create a user entity with valid data", () => {
        const userData = {
            id: "user_id",
            createdAt: new Date(),
            updatedAt: new Date(),
            fullName: "John Doe",
            document: "123456789",
            email: "john.doe@example.com",
            password: "password123",
            isSeller: false,
            balance: 1000
        };

        const user = new User(userData);

        expect(user.fullName).toBe("John Doe");
        expect(user.document).toBe("123456789");
        expect(user.email).toBe("john.doe@example.com");
        expect(user.password).toBe("password123");
        expect(user.isSeller).toBe(false);
        expect(user.balance).toBe(1000);
    });

    it("should hash the password correctly", () => {
        const userData = {
            id: "user_id",
            createdAt: new Date(),
            updatedAt: new Date(),
            fullName: "John Doe",
            document: "123456789",
            email: "john.doe@example.com",
            password: "password123",
            isSeller: false,
            balance: 1000
        };

        const user = new User(userData);

        user.hashPassword();

        expect(bcrypt.compareSync("password123", user.password)).toBe(true);
    });
});

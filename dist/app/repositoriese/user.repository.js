"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("@/models/user"));
class UserRepository {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_1.default.findAll();
                return users;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    createUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ username, password, }) {
            try {
                const user = yield user_1.default.create({ username, password });
                return user;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    updateUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ username, password, id, }) {
            try {
                const user = yield user_1.default.update({ username, password }, {
                    where: {
                        id,
                    },
                });
                const updatedUser = yield user_1.default.findByPk(id);
                return updatedUser;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.default = UserRepository;

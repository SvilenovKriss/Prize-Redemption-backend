"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const fs = require("fs");
const dotenv = require("dotenv");
const common_1 = require("@nestjs/common");
let ConfigService = class ConfigService {
    constructor(filePath = null) {
        let config;
        if (filePath) {
            config = dotenv.parse(fs.readFileSync(filePath));
        }
        else {
            config = dotenv.config().parsed;
        }
        this.envConfig = this.validateInput(config);
    }
    validateInput(envConfig) {
        const envVarsSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid(['development', 'production', 'test', 'provision'])
                .default('development'),
            PORT: Joi.number().default(3000),
            JWT_SECRET: Joi.string().default('VerySecr3t!'),
            JWT_EXPIRE: Joi.number().default(3600 * 24 * 7),
            DB_TYPE: Joi.string().default('mysql'),
            DB_HOST: Joi.string().default('localhost'),
            DB_PORT: Joi.number().default(3000),
            DB_USERNAME: Joi.string().default('root'),
            DB_PASSWORD: Joi.string().default('root'),
            DB_DATABASE_NAME: Joi.string().default('rootdb'),
            EMAIL: Joi.string().default('cocacolabgcustomerservice@gmail.com'),
            PASS: Joi.string().default('1q2W3e4R'),
        });
        const { error, value: validatedEnvConfig } = Joi.validate(envConfig, envVarsSchema);
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }
    get port() {
        return +this.envConfig.PORT;
    }
    get jwtSecret() {
        return this.envConfig.JWT_SECRET;
    }
    get jwtExpireTime() {
        return +this.envConfig.JWT_EXPIRE;
    }
    get dbHost() {
        return this.envConfig.DB_HOST;
    }
    get dbPort() {
        return +this.envConfig.DB_PORT;
    }
    get dbUsername() {
        return this.envConfig.DB_USERNAME;
    }
    get dbPassword() {
        return this.envConfig.DB_PASSWORD;
    }
    get dbName() {
        return this.envConfig.DB_DATABASE_NAME;
    }
    get dbType() {
        return this.envConfig.DB_TYPE;
    }
};
ConfigService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [String])
], ConfigService);
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map
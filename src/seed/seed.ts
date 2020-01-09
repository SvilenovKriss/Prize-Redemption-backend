import { Repository, createConnection } from 'typeorm';
import { RedemptionCode } from '../entity/RedemptionCode';
import { Outlet } from '../entity/Outlet';
import { Customer } from '../entity/Customer';
import { User } from '../entity/User';
import { UserRole } from '../common/UserRole';
import * as bcrypt from 'bcrypt';

const seedCodes = async connection => {
    const redemptionCodesRepo: Repository<RedemptionCode> = connection.manager.getRepository(RedemptionCode);
    const randomstring = require('randomstring');

    for (let i = 0; i < 10; i++) {
        const code = redemptionCodesRepo.create();
        code.redemptionCode = randomstring.generate({
            length: 12,
            charset: 'alphanumeric',
        });
        await redemptionCodesRepo.save(code);
    }

    const code1 = redemptionCodesRepo.create();
    code1.redemptionCode = 'uu4tUoY8PvMD';
    await redemptionCodesRepo.save(code1);
    const code2 = redemptionCodesRepo.create();
    code2.redemptionCode = 'siGLSXpk798n';
    await redemptionCodesRepo.save(code2);
    const code3 = redemptionCodesRepo.create();
    code3.redemptionCode = 'GGyWdePnqAuD';
    await redemptionCodesRepo.save(code3);
    const code4 = redemptionCodesRepo.create();
    code4.redemptionCode = 'ao6UdjbAJg5M';
    await redemptionCodesRepo.save(code4);
    const code5 = redemptionCodesRepo.create();
    code5.redemptionCode = 'OkHYmak82bkC';
    await redemptionCodesRepo.save(code5);
    const code6 = redemptionCodesRepo.create();
    code6.redemptionCode = 'P7TDKFmrnuiZ';
    await redemptionCodesRepo.save(code6);
};

const seedOutletsAndCustomers = async connection => {
    const outletRepo: Repository<Outlet> = connection.manager.getRepository(Outlet);
    const customerRepo: Repository<Customer> = connection.manager.getRepository(Customer);

    // tslint:disable-next-line: max-line-length
    const customers = ['Wallmart', 'Target', 'Best buy', 'HipoNet', 'Fantastico', 'Tehnopolis'];
    // tslint:disable-next-line: max-line-length
    const outlets = ['bul makedoniq 12', 'bul aprilsko 15', 'ulica marica 66', 'aleksandur malinov 23', 'carigradsko shose 43', 'ulica dve mogili 45'];

    for (let i = 0; i < outlets.length; i++) {

        const createCustomer = customerRepo.create();
        createCustomer.name = customers[i];
        await customerRepo.save(createCustomer);

        const outlet = outletRepo.create();
        outlet.name = outlets[i];
        outlet.customer = Promise.resolve(createCustomer);

        await outletRepo.save(outlet);
    }
};

const seedUsers = async connection => {
    const userRepo: Repository<User> = connection.manager.getRepository(User);
    const outletRepo: Repository<Outlet> = connection.manager.getRepository(Outlet);

    const findOutlet = outletRepo.find();
    const outlets = await findOutlet;

    const createUser = userRepo.create();
    createUser.email = 'admin@gmail.com';
    createUser.username = 'Kriss';
    createUser.password = '123456789';
    createUser.imageID = '0edab8eb45cc824f5d66f1f9850dd211';
    const hash = await bcrypt.hash(createUser.password, 10);
    createUser.password = hash;
    createUser.role = UserRole.Admin;
    createUser.outlet = Promise.resolve(outlets[0]);

    const createUser2 = userRepo.create();
    createUser2.email = 'rado@gmail.com';
    createUser2.username = 'Rado';
    createUser2.password = '123456789';
    createUser2.imageID = '0edab8eb45cc824f5d66f1f9850dd211';
    const hash2 = await bcrypt.hash(createUser2.password, 10);
    createUser2.password = hash2;
    createUser2.role = UserRole.Admin;
    createUser2.outlet = Promise.resolve(outlets[0]);

    await userRepo.save(createUser);
    await userRepo.save(createUser2);
};

const seed = async () => {
    // tslint:disable-next-line: no-console
    console.log('Seed started!');

    const connection = await createConnection();

    await seedCodes(connection);
    await seedOutletsAndCustomers(connection);
    await seedUsers(connection);
    await connection.close();

    // tslint:disable-next-line: no-console
    console.log('Seed finished!');
};

// tslint:disable-next-line: no-console
seed().catch(console.log);

require('tls').DEFAULT_MIN_VERSION = 'TLSv1';

import { Keystone } from '@keystonejs/keystone';
import { GraphQLApp } from '@keystonejs/app-graphql';
import { MongooseAdapter } from '@keystonejs/adapter-mongoose';
import { resolve } from 'path';

import { initModels } from "./packages/keystone/models";
import { AdminApp, EmailApp, StaticApp } from './packages/keystone/api';
import { NextApp } from "@keystonejs/app-next";
import { mongoUri } from "./config";

const PROJECT_NAME = "meowing.cc";

const stone = new Keystone({
    name: PROJECT_NAME,
    adapter: new MongooseAdapter({ mongoUri }),
    secureCookies: false,
    cookieSecret: 'zf.ink'
});

initModels(stone);

// @ts-ignore
stone.executeQuery = async (query: string, config: { variables: any; context: any }) => {
    const result = await stone.executeQuery(query, config);
    if ((result as any).errors) {
        throw (result as any).errors[0];
    }
    return result;
};

export const keystone = stone;
export const apps = [
    new GraphQLApp({ apiPath: '/api' }),
    new AdminApp(stone),
    new EmailApp(),
    new StaticApp({
        path: '/public',
        src: resolve(__dirname, 'packages/public'),
    }),
    new NextApp({ dir: 'packages/next' }),
];

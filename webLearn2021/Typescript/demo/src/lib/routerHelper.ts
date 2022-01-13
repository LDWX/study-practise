import { Dictionary } from 'vue-router/types/router';
import Router, { RoutePath } from '../router';

export type BaseRouteType = Dictionary<string>;

export interface IndexParam extends BaseRouteType {
    name: string;
}

export interface AboutPageParam extends BaseRouteType {
    testName: string;
}

export interface UserPageParam extends BaseRouteType {
    userId: string;
}

export interface ParamsMap {
    [RoutePath.Index]: IndexParam;
    [RoutePath.About]: AboutPageParam;
    [RoutePath.User]: UserPageParam;
}


export class RouterHelper {
    public static replace<T extends RoutePath>(routePath: T, params: ParamsMap[T]) {
        Router.replace({
            path: routePath,
            query: params,
        });
    }

    public static push<T extends RoutePath>(routePath: T, params: ParamsMap[T]) {
        Router.push({
            path: routePath,
            query: params,
        });
    }
}

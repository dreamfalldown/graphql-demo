import { Context } from "koa";

export const auth = async (ctx: Context, next: any) => {
    let token = ctx.request.headers.auth
    let url = ctx.request.url
    if (token !== 'daslbdas' && url.includes('/graphql') && url) {
        ctx.status = 403
        ctx.body = '403: 无权访问这个接口'
        return
    }
    await next()
}


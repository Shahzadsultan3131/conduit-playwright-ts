import { APIRequestContext, request } from '@playwright/test';

export async function createArticle(apiContext: APIRequestContext, token: string, article: {title:string, body:string, description?:string, tagList?:string[]}) {
  const res = await apiContext.post('/api/articles', {
    headers: {
      Authorization: `Token ${token}`
    },
    data: { article }
  });
  return res;
}

export async function createUserAndGetToken(apiContext: APIRequestContext, user: {username:string, email:string, password:string}) {
  const res = await apiContext.post('/api/users', { data: { user }});
  const body = await res.json();
  return body.user?.token;
}

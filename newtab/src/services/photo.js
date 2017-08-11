import request from '../utils/request';

export async function query({ clientid }) {
  return request('https://song.lovedm.space/chromeql', {
    method: 'post',
    body: `{ photo(user:"${clientid}") { url } }`,
    headers: {
      'Content-Type': 'application/graphql',
    },
  });
}

import request from '../utils/request';

export async function query() {
  return request('https://song.lovedm.space/chromeql', {
    method: 'post',
    body: '{ photo { url } }',
    headers: {
      'Content-Type': 'application/graphql',
    },
  });
}

import { sleep, group, check } from 'k6'
import http from 'k6/http'

const VUs = 10

export const options = {
  // vus: VUs,
  // duration: '10s',
  // stages: [
  //   { duration: '5s', target: 1 },
  //   { duration: '15s', target: VUs },
  // ],
  scenarios: {
    contacts: {
      executor: 'per-vu-iterations',
      vus: VUs,
      iterations: 10,
      maxDuration: '30s',
    },
  },
};

// @ts-ignore
Array.prototype.getRandomly = function () {
  const randomIndex = Math.floor(Math.random() * this.length);
  return this[randomIndex];
};


export function setup() {
  const tokens: string[] = []
  const loginUrl = `${__ENV.HOST}/api/auth/login`;
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  for (let i = 1; i <= VUs; i++) {
    const payload = JSON.stringify({
      email: `user${i}@test.com`,
      password: __ENV.TEST_PASSWORD,
    });

    const res = http.post(loginUrl, payload, params);

    tokens.push(res.headers.Authorization);
  }

  return tokens
}

export default function (tokens) {
  group('API Test: /cases', function () {
    const url = `${__ENV.HOST}/api/cases`;

    const params = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tokens.getRandomly(),  // 使用获取的 token
      },
    };

    const res = http.get(url, params);

    check(res, {
      'Success': (r) => r.status === 200,
    });

  });

  sleep(1)
}

export function teardown() {
  // @ts-ignore
  delete Array.prototype.getRandomly;
}

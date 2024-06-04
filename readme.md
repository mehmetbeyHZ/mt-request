## Axios Request Helper

Sending simpler and clearer HTTP requests.

```
import { MtRequest } from "../src/mt-request";
const request = new MtRequest("https://jsonplaceholder.typicode.com/todos/1");
const send = request
  .addHeader("x-bearer-token", "tokenValue")
  .setUseragent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
  )
  .addPost("name", "test name")
  .setIsJsonPost(true) // {"name":"test name"} false => name=test name
  .execute()
  .then(function (response) {
    console.log(response.data);
  });

```

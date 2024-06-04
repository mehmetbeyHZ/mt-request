import axios from "axios";

export class MtRequest {
  /**
   * Request URL
   */
  private _url: string;
  /**
   * Http Posts
   */
  private _posts: Map<string, any> = new Map();
  /**
   * URL Query
   */
  private _params: Map<string, string> = new Map();
  /**
   * Request Headers
   */
  private _headers: Map<string, any> = new Map();

  /**
   *
   */
  private _isPost: boolean | null = null;

  /**
   * Is Json Post
   */
  private _isJsonPost = false;

  /**
   *
   * @param requestUrl
   */
  constructor(requestUrl: string) {
    this._url = requestUrl;
  }

  /**
   *
   * @param useragent
   * @returns
   */
  setUseragent(useragent: string) {
    this.addHeader("User-Agent", useragent);
    return this;
  }

  /**
   *
   * @param key
   * @param value
   * @returns
   */
  addHeader(key: string, value: any) {
    this._headers.set(key, value);
    return this;
  }

  /**
   *
   * @param key
   * @param value
   * @returns
   */
  addPost(key: string, value: any) {
    this._posts.set(key, value);
    return this;
  }

  /**
   *
   * @param key
   * @param value
   * @returns
   */
  addParam(key: string, value: any) {
    this._params.set(key, value);
    return this;
  }

  /**
   *
   * @param isPost
   * @returns
   */
  setIsPost(isPost: boolean) {
    this._isPost = isPost;
    return this;
  }

  /**
   *
   * @param isJsonPost
   * @returns
   */
  setIsJsonPost(isJsonPost: boolean) {
    this._isJsonPost = isJsonPost;
    return this;
  }

  /**
   *
   * @returns string: "GET" | "POST"
   */
  private getRequestMethod() {
    let requestMethod = this._posts.size > 0 ? "POST" : "GET";
    if (this._isPost == true) {
      requestMethod = "POST";
    }
    return requestMethod;
  }

  /**
   *
   * @returns URL string
   */
  getRequestUrl() {
    let queryParams = new URLSearchParams();

    this._params.forEach((value, key) => {
      queryParams.append(key, value);
    });

    const urlQuery = this._params.size > 0 ? "?" + queryParams.toString() : "";

    return this._url + urlQuery;
  }

  getRequestData() {
    if (this._posts.size == 0) {
      return null;
    }
    if (this._isJsonPost) {
      return Object.fromEntries(this._posts);
    }
    let bodyParams = new URLSearchParams();
    this._posts.forEach((value, key) => {
      bodyParams.append(key, value);
    });
    return bodyParams.toString();
  }

  async execute() {
    return await axios({
      url: this.getRequestUrl(),
      method: this.getRequestMethod(),
      data: this.getRequestData(),
      headers: Object.fromEntries(this._headers),
    });
  }
}

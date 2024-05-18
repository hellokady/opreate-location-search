import { Handler } from "~/types";

export class EventEmitter {
  private eventMap: Record<string, Handler[]>;
  constructor() {
    this.eventMap = {};
  }

  private exist(type: string) {
    const tasks = this.eventMap[type];
    return Array.isArray(tasks) && tasks.length > 0;
  }

  /** 订阅、注册 */
  on(type: string, handler: Handler) {
    if (!(handler instanceof Function)) {
      throw new Error("handler must be a function");
    }

    if (!this.eventMap[type]) {
      this.eventMap[type] = [];
    }

    this.eventMap[type].push(handler);
  }

  /** 发布、触发 */
  emit(type: string, ...args: any[]) {
    const tasks = this.eventMap[type];
    if (this.exist(type)) {
      tasks.forEach((handler) => handler(...args));
    }
  }

  /** 卸载、取消订阅 */
  off(type: string, handler: Handler) {
    const tasks = this.eventMap[type];
    if (this.exist(type)) {
      tasks.splice(
        tasks.indexOf((cb) => cb === handler),
        1
      );
    }
  }
}

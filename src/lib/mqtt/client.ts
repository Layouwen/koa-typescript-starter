import type { Buffer } from 'node:buffer';
import { EventEmitter } from 'node:events';
import mqtt from 'mqtt';

export class MqttClient extends EventEmitter {
  private static instance: MqttClient;

  private readonly brokerUrl!: string;
  private readonly opts!: mqtt.IClientOptions;

  private client!: mqtt.MqttClient;
  private topicSubscribeCallbackListMap = new Map<string, any[]>();

  static getInstance() {
    return MqttClient.instance;
  }

  constructor({ brokerUrl = '', opts }: { brokerUrl: string; opts: mqtt.IClientOptions }) {
    super();

    if (MqttClient.instance) {
      return MqttClient.instance;
    }

    this.brokerUrl = brokerUrl;
    this.opts = opts;

    MqttClient.instance = this;
  }

  public getClient() {
    return this.client;
  }

  public connect(): Promise<MqttClient> {
    return new Promise((resolve, reject) => {
      const opts = { ...this.opts };

      if (!opts.username) {
        delete opts.username;
      }

      if (!opts.password) {
        delete opts.password;
      }

      this.client = mqtt.connect(this.brokerUrl, opts);

      this.client.on('connect', () => {
        this.client.on('message', this.onMessageCallback.bind(this));
        this.emit('connect');

        resolve(this);
      });

      this.client.on('error', (err) => {
        this.emit('error', err);

        reject(err);
      });
    });
  }

  private onMessageCallback(topic: string, message: Buffer) {
    this.emit('messageReceived', topic, message.toString());

    const callbackList = this.topicSubscribeCallbackListMap.get(topic);

    if (!callbackList)
      return;

    try {
      if (callbackList.length === 0) {
        return;
      }

      const data = JSON.parse(message.toString());

      callbackList.forEach(callback => callback(topic, data));
    }
    catch (e) {
      this.emit('messageJsonParseError', e);
    }
  }

  public onSubscribe(mqttTopicInfo: MqttTopicInfo) {
    const { topic, opts, handle } = mqttTopicInfo;

    const handleList = this.topicSubscribeCallbackListMap.get(topic) || [];

    if (!handleList.includes(handle)) {
      this.client.subscribe(topic, opts);
    }

    handleList.push(handle);

    this.topicSubscribeCallbackListMap.set(topic, handleList);
  }

  public onSubscribes(mqttTopicInfoList: MqttTopicInfo[]) {
    mqttTopicInfoList.forEach(mqttTopicInfo => this.onSubscribe(mqttTopicInfo));
  }
}

export interface MqttTopicInfo {
  key: string;
  topic: string;
  opts: {
    qos: 2;
    retain: boolean;
  };
  handle: (topic: string, data: any) => void;
}

import config from '../config';
import { MqttClient, type MqttTopicInfo } from '../lib';
import { logger } from './logger';

export const mqttTopicInfoList = [
  {
    key: 'timeline',
    topic: `/project/emergency/pub/timeline/update`,
    opts: {
      qos: 2,
      retain: false,
    },
    handle: (topic: string, data: any) => {
      logger.daily.info('handle data', topic, data);
    },
  },
] as MqttTopicInfo[];

export async function mqttInit() {
  const mqttClient = new MqttClient({
    brokerUrl: config.mqtt.url,
    opts: config.mqtt.opts,
  });

  mqttClient.on('connect', () => {
    logger.daily.info(
      'mqtt connect success',
      config.mqtt.url,
      config.mqtt.opts,
    );
    mqttClient.onSubscribes(mqttTopicInfoList);
  });

  mqttClient.on('error', (err) => {
    logger.error.error('mqtt connect error', err);
  });

  mqttClient.on('messageReceived', (topic, message) => {
    logger.daily.info('mqtt message', topic, message.toString());
  });

  mqttClient.on('messageJsonParseError', (err) => {
    logger.error.error('mqtt message json parse error', err);
  });

  await mqttClient.connect();
}

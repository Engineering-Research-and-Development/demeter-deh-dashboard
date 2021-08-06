import { MetricsVolume } from "./metricsVolume";
import { Consumer } from "./consumer";

export interface metricsContainer {

    _id: string,
    consumerId: string,
    consumer: Consumer,
    uptime: number,
    hostname: string,
    ip: string,
    image: string,
    BSE_ID: string,
    RRM_ID: string,
    lastupdated: string,
    cpu_percent: MetricsVolume[],
    mem_percent: MetricsVolume[]
}
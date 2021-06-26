import { MetricsVolume } from "./metricsVolume";

export interface metricsContainer {

    _id: string,
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
import { metricsContainer } from './metricsContainer'

export interface metricsData {
    rrmId: string,
    name: string,
    numberOfInstances: number,
    containers: metricsContainer[]
}

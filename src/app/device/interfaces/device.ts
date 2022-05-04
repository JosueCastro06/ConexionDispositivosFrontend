/* eslint-disable linebreak-style */
import {Connection} from 'src/app/connection/interfaces/connection';

export interface Device {
    id: number;
    mac: string;
    type: string;
    connected: boolean;
    ip: string;
    trademark: string;
    connection: Connection;
}

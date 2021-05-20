'use strict'
require('dotenv').config();
const { InfluxDB, Point } = require('@influxdata/influxdb-client')

// You can generate a Token from the "Tokens Tab" in the UI
const token = process.env.INFLUXDB_ATP_THINGS_TOKEN_READWRITE //'dUnNTEzEWuyacrCs-McFdkKiwpXPhjn5D2Yb_sc529zzGUIm_JJRr7psSnWboA85es2mQJIccf6s59BjzzaRIA=='
const org = process.env.INFLUXDB_ATP_THINGS_ORG //'andrazpolak@gmail.com'
const bucket = process.env.INFLUXDB_ATP_THINGS_BUCKET //'atp_things'

const client = new InfluxDB({ url: 'https://eu-central-1-1.aws.cloud2.influxdata.com', token: token })
const writeApi = client.getWriteApi(org, bucket)


writeApi.useDefaultTags({ host: 'host2s' })

const point = new Point('d9f3ad90-d1a0-4716-8da8-3590642ac7b2');

async function writeData() {

    point.floatField('value', Math.random() * 30).tag('value_unit', 'degreesC')
    point.floatField('value_x', Math.random() * 30).timestamp(new Date());
    writeApi.writePoint(point)
    console.log(`${point}`);
}

async function sendData() {
    try {
        await writeApi.flush();
    } catch(err) { 

        console.log(err)
    }
}

setInterval(sendData, 30000);

setInterval(writeData, 10000);
// writeApi
//     .close()
//     .then(() => {
//         console.log('FINISHED')
//     })
//     .catch(e => {
//         console.error(e)
//         console.log('Finished ERROR')
//     })

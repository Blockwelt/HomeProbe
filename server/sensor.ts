import sensor from 'node-dht-sensor';

export const readProbe = () => {

    const probeData = {temp: 0, hum: 0};

    setTimeout(()=>{
        sensor.read(11, 17, (err:NodeJS.ErrnoException | null,temperature: number, humidity: number) => {
            if(!err) {
                probeData.temp = temperature;
                probeData.hum = humidity;
            } else {
                console.log(err);
            }
        })
    },5000)

    return probeData
}




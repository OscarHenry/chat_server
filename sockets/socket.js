const {io} = require('../index');
// const Bands = require('../models/bands')
// const Band = require('../models/band')

// Creating bands
// const bands = new Bands();
// bands.add(new Band('Jackson 5'));
// bands.add(new Band('Slik Sonic'));
// bands.add(new Band('Tiesto'));
// bands.add(new Band('Bon Jovi'));

// Mensajes de sockets
io.on('connection', client => {
    // emit all bands to client
    // client.emit('active-bands', bands.get());

    // client.on('vote-band',(payload)=>{
    //     console.log('new vote ',payload);
    //     bands.vote(payload.id);
    //     io.emit('active-bands', bands.get());
    // });

    // client.on('add-band',(payload)=>{
    //     console.log('new band received ',payload);
    //     bands.add(new Band(payload.name));
    //     io.emit('active-bands', bands.get());
    // });

    // client.on('delete-band',(payload)=>{
    //     console.log('delete band ',payload);
    //     bands.delete(payload.id);
    //     io.emit('active-bands', bands.get());
    // });
  });
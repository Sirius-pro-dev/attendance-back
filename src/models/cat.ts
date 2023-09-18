import mongoose from 'mongoose';

const Cat = mongoose.model('Cat', new mongoose.Schema({ name: String }));
    
const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));

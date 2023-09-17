import mongoose from 'mongoose';

export const connect = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/test');

    // const Cat = mongoose.model('Cat', new mongoose.Schema({ name: String }));
    
    // const kitty = new Cat({ name: 'Zildjian' });
    // kitty.save().then(() => console.log('meow'));

    return async function() {
        await mongoose.disconnect();
    }
}
